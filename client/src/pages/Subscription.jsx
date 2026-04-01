import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import api from '../services/api.js';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: [
      'Access to 10 free games',
      'Basic progress tracking',
      'Single player mode',
      'Limited curriculum topics',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'classroom',
    name: 'Classroom',
    price: '₹99',
    priceValue: 99,
    period: '/month',
    features: [
      'Unlimited game access',
      'Full curriculum coverage',
      'AI-powered game generation',
      'Progress analytics',
      'Multiplayer mode',
      'Teacher dashboard',
      'Manage up to 40 students',
    ],
    cta: 'Subscribe Now',
    popular: true,
  },
  {
    id: 'parent',
    name: 'Parent',
    price: '₹299',
    priceValue: 299,
    period: '/month',
    features: [
      'Unlimited game access',
      'Full curriculum coverage',
      'AI-powered game generation',
      'Advanced progress analytics',
      'Multiplayer mode',
      'Multiple child profiles',
      'Priority support',
    ],
    cta: 'Subscribe Now',
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '₹2400',
    priceValue: 2400,
    period: '/year',
    features: [
      'Everything in Parent plan',
      '2 months free (save ₹1,188)',
      'Priority AI generation',
      'Advanced analytics',
      'Dedicated support',
      'Early access to new features',
    ],
    cta: 'Go Pro',
    popular: false,
  },
];

const UPI_ID = '7001406831-2@axl';

export default function Subscription() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePlanSelect = (plan) => {
    if (!user) {
      navigate('/login', { state: { from: '/subscription' } });
      return;
    }
    setSelectedPlan(plan);
  };

  const handleRazorpayPayment = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/subscription' } });
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Create order on backend
      const { data: order } = await api.post('/payments/create-order', { tier: selectedPlan.id });
      
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_KhEL7001406831', // Replace with actual Razorpay key
          amount: order.amount,
          currency: order.currency,
          name: 'Khel Educational Games',
          description: `${selectedPlan.name} Subscription`,
          order_id: order.orderId,
          handler: async (response) => {
            try {
              // Verify payment on backend
              await api.post('/payments/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              setSelectedPlan(null);
              alert('Payment successful! Your subscription is now active.');
              navigate('/dashboard');
            } catch (err) {
              setError(err.response?.data?.error || 'Payment verification failed');
            } finally {
              setProcessing(false);
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: {
            color: '#6366f1',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        setError('Failed to load payment gateway');
        setProcessing(false);
      };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create payment order');
      setProcessing(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const upiPaymentLink = selectedPlan ? `upi://pay?pa=${UPI_ID}&pn=Khel%20Educational%20Games&am=${selectedPlan.priceValue}&cu=INR&tn=Subscription%20${selectedPlan.name}` : '';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
        <h1 style={styles.title}>Choose Your Plan</h1>
        <p style={styles.subtitle}>Unlock unlimited learning with AI-powered educational games</p>
      </div>

      <div style={styles.grid}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{...styles.card, ...(plan.popular ? styles.popularCard : {})}}>
            {plan.popular && <div style={styles.popularBadge}>Most Popular</div>}
            <h2 style={styles.planName}>{plan.name}</h2>
            <div style={styles.price}>
              <span style={styles.amount}>{plan.price}</span>
              <span style={styles.period}>{plan.period}</span>
            </div>
            <ul style={styles.features}>
              {plan.features.map((feature, i) => (
                <li key={i} style={styles.feature}>
                  <span style={styles.check}>✓</span> {feature}
                </li>
              ))}
            </ul>
            {plan.price === '₹0' ? (
              <Link to="/register" style={styles.button}>Get Started</Link>
            ) : (
              <button 
                onClick={() => handlePlanSelect(plan)} 
                style={{...styles.button, ...(plan.popular ? styles.popularButton : {})}}
              >
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button onClick={() => setSelectedPlan(null)} style={styles.closeButton}>×</button>
            <h2 style={styles.modalTitle}>Subscribe to {selectedPlan.name}</h2>
            <p style={styles.modalPrice}>Amount: {selectedPlan.price}{selectedPlan.period}</p>

            {error && (
              <div style={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}

            <div style={styles.paymentOptions}>
              <button 
                onClick={handleRazorpayPayment} 
                disabled={processing}
                style={styles.razorpayButton}
              >
                {processing ? 'Processing...' : 'Pay with Razorpay (Recommended)'}
              </button>

              <div style={styles.divider}>
                <span>OR</span>
              </div>

              <div style={styles.upiSection}>
                <p style={styles.upiLabel}>Pay manually via UPI:</p>
                <div style={styles.upiIdBox}>
                  <span style={styles.upiId}>{UPI_ID}</span>
                  <button onClick={copyUpiId} style={styles.copyButton}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div style={styles.paymentSteps}>
                <h3>How to pay manually:</h3>
                <ol style={styles.stepsList}>
                  <li>Copy the UPI ID above</li>
                  <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Send {selectedPlan.price} to the UPI ID</li>
                  <li>Share transaction ID at roychinu45@gmail.com</li>
                </ol>
              </div>

              <a href={upiPaymentLink} style={styles.upiLinkButton}>
                Open UPI App
              </a>

              <p style={styles.contactNote}>
                Need help? Email roychinu45@gmail.com or call +91 7001406831
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={styles.faq}>
        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqItem}>
          <h3>What is Khel?</h3>
          <p>Khel is an AI-powered educational gaming platform that helps children learn through interactive games covering math, science, language, and EVS from pre-nursery to Class VII.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>How do I subscribe?</h3>
          <p>Choose a plan above, make the UPI payment to 7001406831-2@axl, and contact us to activate your subscription.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>What payment methods are supported?</h3>
          <p>We accept all UPI apps including Google Pay, PhonePe, Paytm, BHIM, and more.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>How do I activate my subscription?</h3>
          <p>After making the UPI payment, share the transaction screenshot at roychinu45@gmail.com or call +91 7001406831. We'll activate within 24 hours.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>What age group is Khel for?</h3>
          <p>Khel is designed for children aged 3-13 years (Pre-Nursery to Class VII) covering multiple curriculum boards.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>Can I cancel my subscription?</h3>
          <p>Yes, you can cancel anytime. Contact us for prorated refund.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>Do you offer free trials?</h3>
          <p>Yes! Our Free plan gives you access to 10 games. No payment or credit card required!</p>
        </div>
        <div style={styles.faqItem}>
          <h3>Can teachers use Khel?</h3>
          <p>Yes! Teachers can create classrooms, assign games to students, and track class progress through our teacher dashboard.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>How can I contact support?</h3>
          <p>Email us at roychinu45@gmail.com, call +91 7001406831, or use the Contact page.</p>
        </div>
        <div style={styles.faqItem}>
          <h3>Is my child's data safe?</h3>
          <p>Absolutely. We follow strict data protection practices and never share your child's information with third parties.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  backLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'inline-block',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 16px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '40px 30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    position: 'relative',
    transition: 'transform 0.2s',
  },
  popularCard: {
    border: '2px solid #6366f1',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 40px rgba(99,102,241,0.2)',
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#6366f1',
    color: '#fff',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  planName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px',
  },
  price: {
    marginBottom: '24px',
  },
  amount: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#1f2937',
  },
  period: {
    fontSize: '16px',
    color: '#6b7280',
  },
  features: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 32px',
  },
  feature: {
    fontSize: '15px',
    color: '#4b5563',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  check: {
    color: '#10b981',
    marginRight: '10px',
    fontWeight: 'bold',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#f3f4f6',
    color: '#1f2937',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  popularButton: {
    background: '#6366f1',
    color: '#fff',
  },
  errorBox: {
    background: 'rgba(244, 63, 94, 0.1)',
    border: '1px solid rgba(244, 63, 94, 0.2)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#f43f5e',
    fontSize: '14px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  paymentOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  razorpayButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: '#528bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '14px',
    margin: '8px 0',
  },
  dividerBefore: {
    flex: 1,
    borderBottom: '1px solid #e5e7eb',
  },
  dividerAfter: {
    flex: 1,
    borderBottom: '1px solid #e5e7eb',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#fff',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#6b7280',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 16px',
    color: '#1f2937',
  },
  modalPrice: {
    fontSize: '20px',
    color: '#6366f1',
    fontWeight: '600',
    margin: '0 0 24px',
  },
  upiSection: {
    marginBottom: '24px',
  },
  upiLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px',
  },
  upiIdBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f3f4f6',
    padding: '12px 16px',
    borderRadius: '12px',
  },
  upiId: {
    fontFamily: 'monospace',
    fontSize: '16px',
    color: '#1f2937',
  },
  copyButton: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  paymentSteps: {
    marginBottom: '24px',
  },
  stepsList: {
    paddingLeft: '20px',
    color: '#4b5563',
    lineHeight: 1.8,
  },
  upiLinkButton: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: '#10b981',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  contactNote: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    margin: 0,
  },
  faq: {
    marginTop: '60px',
  },
  faqTitle: {
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1f2937',
  },
  faqItem: {
    marginBottom: '24px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '12px',
  },
};