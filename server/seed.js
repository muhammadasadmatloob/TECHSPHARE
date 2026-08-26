import dotenv from 'dotenv';
import databaseService from './config/DatabaseService.js';
import { Product } from './models/Product.js';

dotenv.config();

const INITIAL_PRODUCTS = [
  {
    id: 'ts-neural-01',
    name: 'TechSphere Neural Pods Pro',
    category: 'audio',
    tag: 'Acoustic Core',
    price: 349.00,
    description: 'Spatial audio platform featuring active neural noise-cancellation and sub-ms latency.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '<0.4ms', architecture: 'TS-Acoustic N1', materials: 'Titanium & Memory Foam' }
  },
  {
    id: 'ts-vision-02',
    name: 'TechSphere Vision One',
    category: 'wearables',
    tag: 'Spatial Optics',
    price: 1899.00,
    description: 'Dual 4K Micro-OLED spatial display system with eye-tracking gesture engine.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '<0.2ms', architecture: 'TS-Silicon M4', materials: 'Aerospace Grade 5 Titanium' }
  },
  {
    id: 'ts-compute-03',
    name: 'TechSphere Core Station',
    category: 'computing',
    tag: 'Neural Compute',
    price: 2499.00,
    description: 'On-premise AI acceleration node equipped with 128GB unified high-bandwidth memory.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '0.01ms', architecture: 'TS-Quantum Engine', materials: 'CNC Anodized Titanium' }
  },
  {
    id: 'ts-audio-04',
    name: 'TechSphere Studio Master',
    category: 'audio',
    tag: 'Reference Monitor',
    price: 599.00,
    description: 'Planar magnetic drivers delivering ultra-pure reference frequency response.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '<0.1ms', architecture: 'Planar Acoustic Node', materials: 'Titanium Alloy' }
  },
  {
    id: 'ts-compute-05',
    name: 'TechSphere Edge Node',
    category: 'computing',
    tag: 'Portable Core',
    price: 1299.00,
    description: 'Mobile supercomputing platform engineered for real-time local rendering operations.',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '<0.5ms', architecture: 'TS-Mobile Compute Unit', materials: 'Full Metal Chassis' }
  },
  {
    id: 'ts-wear-06',
    name: 'TechSphere Haptic Glove',
    category: 'wearables',
    tag: 'Tactile Interface',
    price: 499.00,
    description: 'Micro-pneumatic feedback system providing realistic tactile resistance in digital space.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    specs: { latency: '0.3ms', architecture: 'Haptic Tactile Array', materials: 'Micro-weave Mesh' }
  }
];

async function seed() {
  await databaseService.connect();
  if (!databaseService.getStatus().isConnected) {
    console.log('MongoDB server offline, seed script finished with mock memory store configuration.');
    process.exit(0);
  }

  try {
    await Product.deleteMany({});
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log('✅ Successfully seeded TechSphere flagship products into MongoDB database!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
