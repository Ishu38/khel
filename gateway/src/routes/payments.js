import { Router } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import env from '../config/env.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { SUBSCRIPTION_TIERS } from '@khel/shared';

const router = Router();

const razorpay = env.razorpay?.keyId
  ? new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret })
  : null;

const TIER_PRICES = {
  parent: SUBSCRIPTION_TIERS.PARENT.priceINR,
  classroom: SUBSCRIPTION_TIERS.CLASSROOM.priceINR,
  district: SUBSCRIPTION_TIERS.DISTRICT?.priceINR || 4999,
};

// POST /api/payments/create-order — create a Razorpay order
router.post('/create-order', authenticate, async (req, res, next) => {
  try {
    if (!razorpay) return res.status(503).json({ error: 'Payment service not configured' });
    const { tier } = req.body;

    if (!TIER_PRICES[tier]) {
      return res.status(400).json({ error: 'Invalid subscription tier' });
    }

    const amountPaise = TIER_PRICES[tier] * 100;

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `khel_${req.user._id}_${Date.now()}`,
      notes: {
        userId: String(req.user._id),
        tier,
      },
    });

    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      tier,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/payments/verify — verify Razorpay payment signature
router.post('/verify', authenticate, async (req, res, next) => {
  try {
    if (!razorpay) return res.status(503).json({ error: 'Payment service not configured' });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac('sha256', env.razorpay.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Fetch the order to get tier from notes
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const tier = order.notes?.tier || 'parent';

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'subscription.tier': tier,
          'subscription.expiresAt': expiresAt,
        },
      },
      { new: true },
    ).select('-passwordHash');

    res.json({ message: 'Payment verified', user });
  } catch (err) {
    next(err);
  }
});

// POST /api/payments/webhook — Razorpay webhook handler (no auth)
router.post('/webhook', async (req, res, next) => {
  try {
    if (!razorpay) return res.status(503).json({ error: 'Payment service not configured' });
    const webhookSecret = env.razorpay.keySecret;
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured') {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;
      const order = await razorpay.orders.fetch(orderId);
      const userId = order.notes?.userId;
      const tier = order.notes?.tier;

      if (userId && tier) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await User.findByIdAndUpdate(userId, {
          $set: {
            'subscription.tier': tier,
            'subscription.expiresAt': expiresAt,
          },
        });
      }
    } else if (event === 'subscription.charged') {
      const subscription = payload.subscription.entity;
      const userId = subscription.notes?.userId;
      const tier = subscription.notes?.tier;

      if (userId && tier) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await User.findByIdAndUpdate(userId, {
          $set: {
            'subscription.tier': tier,
            'subscription.razorpaySubscriptionId': subscription.id,
            'subscription.expiresAt': expiresAt,
          },
        });
      }
    }

    // Acknowledge the webhook
    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
});

export default router;
