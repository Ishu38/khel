/**
 * Seed script — run with: node src/seeds/seed.js
 * Populates curriculum data for NCERT, Montessori, and IB.
 */

import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Curriculum from '../models/Curriculum.js';
import ncertData from './curriculum.js';
import montessoriData from './montessori.js';
import ibData from './ib.js';

async function seed() {
  await connectDB();

  console.log('[seed] Clearing existing curriculum data...');
  await Curriculum.deleteMany({});

  const allData = [...ncertData, ...montessoriData, ...ibData];
  console.log(`[seed] Inserting ${allData.length} curriculum documents...`);
  await Curriculum.insertMany(allData);

  console.log('[seed] Done! Seeded:');
  console.log(`  NCERT: ${ncertData.length} grade documents`);
  console.log(`  Montessori: ${montessoriData.length} plane documents`);
  console.log(`  IB PYP: ${ibData.length} grade documents`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('[seed] Error:', err);
  process.exit(1);
});
