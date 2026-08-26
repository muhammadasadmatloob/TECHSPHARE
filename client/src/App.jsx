import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { BackgroundStage } from './components/BackgroundStage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { Catalog } from './components/Catalog';
import { ProductModal } from './components/ProductModal';
import { Architecture } from './components/Architecture';
import { Ecosystem } from './components/Ecosystem';
import { TechSpecs } from './components/TechSpecs';
import { Materials } from './components/Materials';
import { SoftwareOS } from './components/SoftwareOS';
import { Sustainability } from './components/Sustainability';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Newsletter } from './components/Newsletter';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050505] text-[#fafafa] relative font-sans selection:bg-accent-cyan selection:text-black">
        {/* Static Background Stage Video */}
        <BackgroundStage />

        {/* Header Navigation */}
        <Navbar />

        {/* Scrollable Content Layer */}
        <main className="relative z-10">
          <Hero />
          <Vision />
          <Catalog onSelectProduct={(product) => setSelectedProduct(product)} />
          <Architecture />
          <Ecosystem />
          <TechSpecs />
          <Materials />
          <SoftwareOS />
          <Sustainability />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        <CartDrawer />
        <Toast />
      </div>
    </CartProvider>
  );
}
