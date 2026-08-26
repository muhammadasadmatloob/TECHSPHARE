import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['audio', 'wearables', 'computing'] },
  tag: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  specs: {
    latency: { type: String, default: '<0.4ms' },
    architecture: { type: String, default: 'TS-Silicon M4' },
    materials: { type: String, default: 'Grade 5 Titanium' }
  }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
