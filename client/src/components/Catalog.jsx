import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { Search, Eye, Plus, Cpu } from 'lucide-react';

const FALLBACK_PRODUCTS = [
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

export const Catalog = ({ onSelectProduct }) => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [remoteProducts, setRemoteProducts] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    fetchProducts(category, search)
      .then((res) => {
        if (isMounted && res && res.success && Array.isArray(res.data) && res.data.length >= 6) {
          setRemoteProducts(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [category, search]);

  const sourceList = remoteProducts && remoteProducts.length >= 6 ? remoteProducts : FALLBACK_PRODUCTS;

  const displayedProducts = sourceList.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.tag.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'audio', label: 'Neural Audio' },
    { id: 'wearables', label: 'Spatial Optics' },
    { id: 'computing', label: 'Compute Core' },
  ];

  return (
    <section id="products" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Flagship Hardware</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">Engineered Lineup</h2>
          </div>

          {/* Search Input & Category Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hardware..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-ink-muted focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 w-full sm:w-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    category === cat.id
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-ink-secondary hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border border-white/10">
            <Cpu className="w-12 h-12 text-ink-muted mx-auto mb-3" />
            <p className="text-ink-secondary text-sm">No hardware matches your specified criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <article
                key={product.id}
                className="group glass-panel rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 rounded-2xl overflow-hidden bg-black/40 mb-6 flex items-center justify-center">
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300 tracking-wider uppercase">
                      {product.tag}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Inspector Button */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 opacity-0 group-hover:opacity-100 shadow-xl"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Specs</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-ink-secondary text-xs mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-ink-muted block font-mono">ESTIMATED COST</span>
                    <span className="text-xl font-mono font-bold text-white">
                      ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
