/* ============================================
   SHOPEASE - Main JavaScript
   ============================================ */

// ── Products Data ──────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 89.99,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring 40-hour battery life, active noise cancellation, and ultra-comfortable ear cushions. Perfect for work, travel, and everyday listening."
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "Accessories",
    price: 129.00,
    badge: "New",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    description: "A timeless piece that blends modern minimalism with classic craftsmanship. Genuine leather strap, sapphire-coated glass, and a slim 8mm case that sits elegantly on any wrist."
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 54.99,
    badge: null,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    description: "Compact yet powerful 360° surround sound. IPX7 waterproof, 20-hour battery, and a built-in microphone for hands-free calls. Your perfect companion for outdoor adventures."
  },
  {
    id: 4,
    name: "Organic Cotton Hoodie",
    category: "Clothing",
    price: 49.99,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    description: "Soft, sustainable, and stylish. Made from 100% GOTS-certified organic cotton. Features a kangaroo pocket, ribbed cuffs, and a relaxed fit that pairs with everything in your wardrobe."
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    category: "Electronics",
    price: 74.99,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    description: "Track steps, heart rate, sleep, and stress levels 24/7. With a 7-day battery, 5ATM water resistance, and smartphone notifications, it seamlessly fits into your active lifestyle."
  },
  {
    id: 6,
    name: "Ceramic Pour-Over Coffee Set",
    category: "Home & Kitchen",
    price: 36.00,
    badge: null,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    description: "Elevate your morning ritual with our handcrafted ceramic pour-over set. Includes a dripper, server, and two cups. Each piece is kiln-fired for durability and aesthetic warmth."
  },
  {
    id: 7,
    name: "Vegan Leather Backpack",
    category: "Accessories",
    price: 94.00,
    badge: "New",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    description: "Spacious 25L capacity with a padded 15\" laptop sleeve, multiple pockets, and adjustable padded straps. Crafted from cruelty-free, water-resistant vegan leather. Perfect for work or weekend trips."
  },
  {
    id: 8,
    name: "Scented Soy Candle Set",
    category: "Home & Kitchen",
    price: 28.50,
    badge: null,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
    description: "Set of 3 hand-poured soy wax candles in seasonal scents: Amber & Sandalwood, Fresh Linen, and Citrus Grove. Burns cleanly for 40+ hours per candle. Comes in gift-ready packaging."
  }
];

// ── Utility Functions ──────────────────────────
function getUsers()        { return JSON.parse(localStorage.getItem('se_users') || '[]'); }
function saveUsers(u)      { localStorage.setItem('se_users', JSON.stringify(u)); }
function getSession()      { return JSON.parse(localStorage.getItem('se_session') || 'null'); }
function saveSession(s)    { localStorage.setItem('se_session', JSON.stringify(s)); }
function clearSession()    { localStorage.removeItem('se_session'); }
function getCart()         { return JSON.parse(localStorage.getItem('se_cart') || '[]'); }
function saveCart(c)       { localStorage.setItem('se_cart', JSON.stringify(c)); }

function isLoggedIn() { return getSession() !== null; }

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function formatPrice(n) { return '$' + Number(n).toFixed(2); }

// ── Toast Notification ─────────────────────────
function showToast(message, icon = '✓') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${icon}</span> ${message}`;
  document.body.appendChild(t);

  setTimeout(() => {
    t.classList.add('hide');
    setTimeout(() => t.remove(), 350);
  }, 2800);
}

// ── Cart Count Badge ───────────────────────────
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ── Navbar Render ──────────────────────────────
function renderNavbar(activePage) {
  const session = getSession();
  const cartCount = getCart().reduce((s, i) => s + i.qty, 0);

  const navHTML = `
    <nav class="navbar">
      <div class="container nav-inner">
        <a href="index.html" class="nav-logo">Shop<span>Ease</span></a>
        <div class="nav-links">
          <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="cart.html" class="cart-icon-link ${activePage === 'cart' ? 'active' : ''}">
            🛒 Cart
            <span class="cart-badge" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
          </a>
          <a href="checkout.html" class="${activePage === 'checkout' ? 'active' : ''}">Checkout</a>
          ${session ? `<button class="btn-logout" onclick="logout()">Logout (${session.name.split(' ')[0]})</button>` : ''}
        </div>
      </div>
    </nav>
  `;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) placeholder.outerHTML = navHTML;
}

// ── Logout ─────────────────────────────────────
function logout() {
  clearSession();
  saveCart([]);
  showToast('Logged out successfully', '👋');
  setTimeout(() => window.location.href = 'login.html', 800);
}

// ── Cart Helpers ───────────────────────────────
function addToCart(productId) {
  if (!requireAuth()) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  showToast(`"${product.name}" added to cart`, '🛒');
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  updateCartBadge();
  renderCartItems(); // refresh cart view
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

// ── Home Page ──────────────────────────────────
function initHomePage() {
  if (!requireAuth()) return;
  renderNavbar('home');
  updateCartBadge();

  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('product-count');

  if (countEl) countEl.textContent = `${PRODUCTS.length} products`;

  if (grid) {
    grid.innerHTML = PRODUCTS.map(p => `
      <div class="product-card" onclick="goToDetail(${p.id})">
        <div class="card-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
        </div>
        <div class="card-body">
          <div class="card-category">${p.category}</div>
          <div class="card-title">${p.name}</div>
          <div class="card-footer">
            <span class="card-price">${formatPrice(p.price)}</span>
            <button class="btn-add-card" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function goToDetail(id) {
  localStorage.setItem('se_product_id', id);
  window.location.href = 'product.html';
}

// ── Product Detail Page ────────────────────────
function initProductPage() {
  if (!requireAuth()) return;
  renderNavbar('home');
  updateCartBadge();

  const id = parseInt(localStorage.getItem('se_product_id'));
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) { window.location.href = 'index.html'; return; }

  document.title = `${product.name} - ShopEase`;

  const wrap = document.getElementById('product-detail');
  if (wrap) {
    wrap.innerHTML = `
      <div class="detail-grid">
        <div class="detail-img-wrap">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
          <div class="detail-category">${product.category}</div>
          <h1 class="detail-title">${product.name}</h1>
          <div class="detail-price">${formatPrice(product.price)}</div>
          <p class="detail-desc">${product.description}</p>
          <div class="detail-meta">
            <div class="meta-item"><strong>Availability</strong>In Stock ✓</div>
            <div class="meta-item"><strong>Shipping</strong>Free &gt; $50</div>
          </div>
          <button class="btn btn-accent btn-full" onclick="addToCart(${product.id})" style="max-width:300px">
            🛒 Add to Cart
          </button>
          <button class="detail-back" onclick="window.location.href='index.html'" style="margin-top:16px">
            ← Back to Products
          </button>
        </div>
      </div>
    `;
  }
}

// ── Cart Page ──────────────────────────────────
function initCartPage() {
  if (!requireAuth()) return;
  renderNavbar('cart');
  updateCartBadge();
  renderCartItems();
}

function renderCartItems() {
  const cart = getCart();
  const wrap = document.getElementById('cart-content');
  if (!wrap) return;

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="index.html" class="btn btn-primary">Shop Now</a>
      </div>
    `;
    document.getElementById('cart-summary-wrap').innerHTML = '';
    return;
  }

  const itemsHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${product.image}" alt="${product.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price)} each</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${product.id}, +1)">+</button>
          </div>
          <button class="btn btn-danger" onclick="removeItem(${product.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  wrap.innerHTML = `<div class="cart-items-wrap">${itemsHTML}</div>`;

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  document.getElementById('cart-summary-wrap').innerHTML = `
    <div class="cart-summary">
      <div class="summary-title">Order Summary</div>
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
      <a href="checkout.html" class="btn btn-accent btn-full" style="margin-top:16px">Proceed to Checkout</a>
      <a href="index.html" class="btn btn-outline btn-full" style="margin-top:10px">Continue Shopping</a>
    </div>
  `;
}

function removeItem(id) {
  removeFromCart(id);
  showToast('Item removed from cart', '🗑️');
  renderCartItems();
}

// ── Checkout Page ──────────────────────────────
function initCheckoutPage() {
  if (!requireAuth()) return;
  renderNavbar('checkout');
  updateCartBadge();

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderOrderSummary();

  const session = getSession();
  if (session) {
    const nameInput = document.getElementById('full-name');
    if (nameInput) nameInput.value = session.name;
  }
}

function renderOrderSummary() {
  const cart = getCart();
  const wrap = document.getElementById('order-summary');
  if (!wrap) return;

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const itemsHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="order-item-mini">
        <span>${product.name} × ${item.qty}</span>
        <span>${formatPrice(product.price * item.qty)}</span>
      </div>
    `;
  }).join('');

  wrap.innerHTML = `
    ${itemsHTML}
    <div class="summary-row" style="margin-top:12px"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
  `;
}

function placeOrder(e) {
  e.preventDefault();

  const name    = document.getElementById('full-name').value.trim();
  const address = document.getElementById('address').value.trim();
  const city    = document.getElementById('city').value.trim();
  const phone   = document.getElementById('phone').value.trim();

  if (!name || !address || !city || !phone) {
    showToast('Please fill in all fields', '⚠️');
    return;
  }

  if (!/^\+?[\d\s\-]{7,15}$/.test(phone)) {
    showToast('Please enter a valid phone number', '⚠️');
    return;
  }

  // Show confirmation overlay
  const overlay = document.getElementById('confirm-overlay');
  if (overlay) overlay.classList.remove('hidden');

  // Clear cart after order
  saveCart([]);
  updateCartBadge();
}

function goHomeAfterOrder() {
  window.location.href = 'index.html';
}

// ── Signup Page ────────────────────────────────
function initSignupPage() {
  if (isLoggedIn()) { window.location.href = 'index.html'; return; }

  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const name     = document.getElementById('name').value.trim();
    const email    = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirm  = document.getElementById('confirm').value;

    let valid = true;

    if (name.length < 2) {
      showError('name-err', 'Name must be at least 2 characters');
      valid = false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showError('email-err', 'Enter a valid email address');
      valid = false;
    }
    if (password.length < 6) {
      showError('pass-err', 'Password must be at least 6 characters');
      valid = false;
    }
    if (password !== confirm) {
      showError('confirm-err', 'Passwords do not match');
      valid = false;
    }
    if (!valid) return;

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      showError('email-err', 'Email is already registered');
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    saveSession({ name, email });

    showToast('Account created! Redirecting…', '🎉');
    setTimeout(() => window.location.href = 'index.html', 1000);
  });
}

// ── Login Page ─────────────────────────────────
function initLoginPage() {
  if (isLoggedIn()) { window.location.href = 'index.html'; return; }

  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const email    = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showError('login-err', 'Please enter your email and password');
      return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showError('login-err', 'Invalid email or password');
      return;
    }

    saveSession({ name: user.name, email: user.email });
    showToast(`Welcome back, ${user.name.split(' ')[0]}!`, '👋');
    setTimeout(() => window.location.href = 'index.html', 800);
  });
}

// ── Form Error Helpers ─────────────────────────
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}
