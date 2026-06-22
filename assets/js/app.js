/* =========================================================
   FoodHub — Shared App Logic
   ========================================================= */

const FH = (() => {

  const CART_KEY = 'fh_cart';
  const FAV_KEY  = 'fh_favorites';

  /* ---------- helpers ---------- */
  const qs  = (sel, ctx=document) => ctx.querySelector(sel);
  const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  const load = (key, fallback) => { try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch(e){ return fallback; } };
  const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  /* ---------- toast ---------- */
  function toast(message, type='default', icon='fa-circle-check'){
    let wrap = qs('.toast-wrap');
    if(!wrap){ wrap = document.createElement('div'); wrap.className='toast-wrap'; document.body.appendChild(wrap); }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    wrap.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(20px)'; el.style.transition='all .25s'; setTimeout(()=>el.remove(),250); }, 2600);
  }

  /* ---------- navbar ---------- */
  function initNavbar(){
    const toggle = qs('.nav-toggle');
    const links = qs('.nav-links');
    if(toggle && links){
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.innerHTML = links.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });
    }
    updateCartBadge();
  }

  /* ---------- sidebar (dashboards) ---------- */
  function initSidebar(){
    const toggle = qs('.sidebar-toggle');
    const sidebar = qs('.dash-sidebar');
    if(toggle && sidebar){
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
  }

  /* ---------- modal ---------- */
  function initModals(){
    qsa('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = qs(btn.dataset.openModal);
        if(target) target.classList.add('open');
      });
    });
    qsa('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.modal-overlay').classList.remove('open'));
    });
    qsa('.modal-overlay').forEach(ov => {
      ov.addEventListener('click', (e) => { if(e.target === ov) ov.classList.remove('open'); });
    });
  }

  /* ---------- cart ---------- */
  function getCart(){ return load(CART_KEY, []); }
  function setCart(items){ save(CART_KEY, items); updateCartBadge(); }

  function addToCart(item){
    const cart = getCart();
    const existing = cart.find(c => c.id === item.id);
    if(existing){ existing.qty += (item.qty || 1); }
    else { cart.push({ ...item, qty: item.qty || 1 }); }
    setCart(cart);
    toast(`${item.name} added to cart`, 'success', 'fa-cart-plus');
  }

  function updateCartQty(id, qty){
    let cart = getCart();
    if(qty <= 0){ cart = cart.filter(c => c.id !== id); }
    else { const it = cart.find(c => c.id === id); if(it) it.qty = qty; }
    setCart(cart);
  }

  function removeFromCart(id){
    setCart(getCart().filter(c => c.id !== id));
    toast('Item removed from cart', 'default', 'fa-trash');
  }

  function clearCart(){ setCart([]); }

  function cartCount(){ return getCart().reduce((sum, c) => sum + c.qty, 0); }
  function cartSubtotal(){ return getCart().reduce((sum, c) => sum + c.qty * c.price, 0); }

  function updateCartBadge(){
    qsa('.nav-cart .badge-dot').forEach(b => {
      const count = cartCount();
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  /* ---------- favorites ---------- */
  function getFavorites(){ return load(FAV_KEY, []); }
  function toggleFavorite(id){
    let favs = getFavorites();
    const has = favs.includes(id);
    favs = has ? favs.filter(f => f !== id) : [...favs, id];
    save(FAV_KEY, favs);
    toast(has ? 'Removed from favorites' : 'Added to favorites', has ? 'default' : 'success', has ? 'fa-heart-crack' : 'fa-heart');
    return !has;
  }
  function isFavorite(id){ return getFavorites().includes(id); }

  /* ---------- render helpers ---------- */
  function renderStars(rating){
    return `<i class="fa-solid fa-star"></i> ${rating.toFixed(1)}`;
  }

  function restaurantCardHTML(r){
    const fav = isFavorite(r.id);
    return `
    <div class="r-card" data-rid="${r.id}">
      <a href="restaurant.html?id=${r.id}" class="r-card-img" aria-label="View ${r.name}">
        <img src="${r.image}" alt="${r.name}" loading="lazy">
        ${r.promo ? `<span class="r-card-badge promo"><i class="fa-solid fa-bolt"></i> ${r.promo}</span>` : ''}
        ${!r.isOpen ? `<div class="closed-overlay">Closed</div>` : ''}
      </a>
      <button class="r-fav-btn ${fav ? 'active':''}" aria-label="Toggle favorite" onclick="FH.handleFavClick(event,'${r.id}')">
        <i class="fa-${fav ? 'solid':'regular'} fa-heart"></i>
      </button>
      <a href="restaurant.html?id=${r.id}" class="r-card-body" style="display:block;">
        <div class="r-card-top">
          <div>
            <div class="r-card-name">${r.name}</div>
            <div class="r-card-cuisine">${r.cuisine}</div>
          </div>
          <span class="rating-pill">${renderStars(r.rating)}</span>
        </div>
        <div class="r-card-meta">
          <span><i class="fa-regular fa-clock"></i> ${r.deliveryTime}</span>
          <span><i class="fa-solid fa-motorcycle"></i> ${r.deliveryFee === 0 ? 'Free' : fmt(r.deliveryFee)}</span>
          <span><i class="fa-solid fa-tag"></i> Min ${fmt(r.minOrder)}</span>
        </div>
      </a>
    </div>`;
  }

  function handleFavClick(e, id){
    e.preventDefault(); e.stopPropagation();
    const active = toggleFavorite(id);
    const btn = e.currentTarget;
    btn.classList.toggle('active', active);
    btn.querySelector('i').className = `fa-${active ? 'solid':'regular'} fa-heart`;
  }

  return {
    qs, qsa, fmt, toast, initNavbar, initSidebar, initModals,
    getCart, setCart, addToCart, updateCartQty, removeFromCart, clearCart,
    cartCount, cartSubtotal, updateCartBadge,
    getFavorites, toggleFavorite, isFavorite,
    renderStars, restaurantCardHTML, handleFavClick
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  FH.initNavbar();
  FH.initSidebar();
  FH.initModals();
});