/**
 * TechSphere Core JavaScript Engine
 * Dynamic State Management & Interactive UI Pipeline
 */

// 1. Data Store (Mock API Database Payload)
const PRODUCTS_DATA = [
  {
    id: 'ts-neural-01',
    name: 'TechSphere Neural Pods Pro',
    category: 'audio',
    tag: 'Acoustic Core',
    price: 349.00,
    description: 'Spatial audio platform featuring active neural noise-cancellation and sub-ms latency.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ts-vision-02',
    name: 'TechSphere Vision One',
    category: 'wearables',
    tag: 'Spatial Optics',
    price: 1899.00,
    description: 'Dual 4K Micro-OLED spatial display system with eye-tracking gesture engine.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ts-compute-03',
    name: 'TechSphere Core Station',
    category: 'computing',
    tag: 'Neural Compute',
    price: 2499.00,
    description: 'On-premise AI acceleration node equipped with 128GB unified high-bandwidth memory.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ts-audio-04',
    name: 'TechSphere Studio Master',
    category: 'audio',
    tag: 'Reference Monitor',
    price: 599.00,
    description: 'Planar magnetic drivers delivering ultra-pure reference frequency response.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ts-compute-05',
    name: 'TechSphere Edge Node',
    category: 'computing',
    tag: 'Portable Core',
    price: 1299.00,
    description: 'Mobile supercomputing platform engineered for real-time local rendering operations.',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ts-wear-06',
    name: 'TechSphere Haptic Glove',
    category: 'wearables',
    tag: 'Tactile Interface',
    price: 499.00,
    description: 'Micro-pneumatic feedback system providing realistic tactile resistance in digital space.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  }
];

// 2. State Store (React-like State Object)
const State = {
  products: PRODUCTS_DATA,
  filteredCategory: 'all',
  cart: [],
  isCartOpen: false,
  isMobileNavOpen: false
};

// 3. Application Initialization & Event Binding
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initFilterTabs();
  initCartDrawer();
  initMobileMenu();
  initMobileNavLinks();
  initFAQ();
  renderProducts();
  renderCart();
});

// 4. Scroll Header Effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 5. Product Filtering Logic
function initFilterTabs() {
  const tabContainer = document.getElementById('filter-tabs');
  if(!tabContainer) return;
  
  tabContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      
      State.filteredCategory = e.target.dataset.category;
      renderProducts();
    }
  });
}

// 6. Product Grid Renderer
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if(!grid) return;
  
  const filtered = State.filteredCategory === 'all' 
    ? State.products 
    : State.products.filter(item => item.category === State.filteredCategory);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          <button class="add-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');
}

// 7. Cart State Controller & Actions
function addToCart(productId) {
  const existingIndex = State.cart.findIndex(item => item.id === productId);
  
  if (existingIndex > -1) {
    State.cart[existingIndex].qty += 1;
  } else {
    const product = State.products.find(p => p.id === productId);
    State.cart.push({ ...product, qty: 1 });
  }

  updateCartState();
  openCart();
}

// Make accessible to global scope for inline onclick usage
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;

function updateQuantity(productId, delta) {
  const itemIndex = State.cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    State.cart[itemIndex].qty += delta;
    if (State.cart[itemIndex].qty <= 0) {
      State.cart.splice(itemIndex, 1);
    }
  }
  updateCartState();
}

function updateCartState() {
  renderCart();
  
  // Total Count Badge
  const totalItems = State.cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-badge').innerText = totalItems;
  document.getElementById('cart-count-title').innerText = totalItems;
  
  // Subtotal Calculation
  const subtotal = State.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  document.getElementById('cart-subtotal').innerText = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

// 8. Cart UI Renderer
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  if(!cartContainer) return;
  
  if (State.cart.length === 0) {
    cartContainer.innerHTML = `<p style="color: var(--ink-muted); text-align: center; margin-top: 40px;">Your shopping bag is empty.</p>`;
    return;
  }

  cartContainer.innerHTML = State.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 9. Drawer & Overlay Handlers
function initCartDrawer() {
  const cartTrigger = document.getElementById('cart-trigger');
  const cartClose = document.getElementById('cart-close');
  const overlay = document.getElementById('cart-overlay');

  if(cartTrigger) cartTrigger.addEventListener('click', openCart);
  if(cartClose) cartClose.addEventListener('click', closeCart);
  if(overlay) overlay.addEventListener('click', closeCart);
}

function openCart() {
  State.isCartOpen = true;
  document.getElementById('cart-drawer').classList.add('active');
  document.getElementById('cart-overlay').classList.add('active');
}

function closeCart() {
  State.isCartOpen = false;
  document.getElementById('cart-drawer').classList.remove('active');
  document.getElementById('cart-overlay').classList.remove('active');
}

// 10. Mobile Navigation Handler
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  
  if(!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    State.isMobileNavOpen = !State.isMobileNavOpen;
    drawer.classList.toggle('active', State.isMobileNavOpen);
    toggle.setAttribute('aria-expanded', State.isMobileNavOpen);
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = State.isMobileNavOpen ? 'hidden' : '';
  });
}

// 11. Auto-close mobile menu on link click
function initMobileNavLinks() {
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (State.isMobileNavOpen) {
        State.isMobileNavOpen = false;
        drawer.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

// 12. Interactive FAQ Accordion Logic
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other open items (Optional: remove if you want multiple to stay open)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current item
      const isActive = item.classList.contains('active');
      const answer = item.querySelector('.faq-answer');
      
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}