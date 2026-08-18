import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FH_DATA, fmt } from '../data/data';
import { useCart } from '../context/CartContext';

export default function RestaurantPage() {
  const [searchParams] = useSearchParams();
  const rid = searchParams.get('id') || 'r1';
  const r = FH_DATA.getRestaurant(rid) || FH_DATA.restaurants[0];

  const menu = FH_DATA.getMenu(r.id);
  const [activeTab, setActiveTab] = useState(menu.tabs[0] || '');

  const { addToCart, cartCount, cartSubtotal } = useCart();

  const items = menu.items.filter((i) => i.tab === activeTab);

  return (
    <>
      <Navbar />

      <div className="r-hero">
        <img id="heroImg" src={r.image} alt={r.name} />
      </div>

      <main className="container" style={{ paddingBottom: '60px' }}>
        <div className="r-info-card">
          <img className="r-logo" id="logoImg" src={r.logo} alt={r.name} />
          <div className="r-info-meta">
            <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
              <h2 id="rName">{r.name}</h2>
            </div>
            <p id="rCuisine" className="text-muted mt-1">
              {r.cuisine}
            </p>
            <div className="r-card-meta mt-1">
              <span>
                <i className="fa-regular fa-clock"></i> <span id="rTime">{r.deliveryTime}</span>
              </span>
              <span>
                <i className="fa-solid fa-motorcycle"></i>{' '}
                <span id="rFee">{r.deliveryFee === 0 ? 'مجاني' : fmt(r.deliveryFee)}</span> توصيل
              </span>
            </div>
          </div>
        </div>

        <div className="tabs mt-4" id="menuTabs">
          {menu.tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn ${t === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div id="menuList" className="mt-2">
          {items.map((item) => (
            <div key={item.id} className="menu-item-row">
              <img className="menu-item-img" src={item.img} alt={item.name} />
              <div className="menu-item-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <div className="menu-item-foot">
                  <span className="price">{fmt(item.price)}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        img: item.img,
                        restaurant: r.name,
                      })
                    }
                  >
                    <i className="fa-solid fa-plus"></i> إضافة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* شريط السلة الثابت */}
      {cartCount > 0 && (
        <div
          id="cartBar"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            background: 'var(--c-dark)',
            color: 'white',
            padding: '16px 24px',
            zIndex: 90,
            boxShadow: '0 -8px 24px rgba(0,0,0,0.18)',
          }}
        >
          <div className="container flex justify-between items-center">
            <span>
              <strong id="cartBarCount">{cartCount}</strong> عنصر ·{' '}
              <span className="price" id="cartBarTotal">
                {fmt(cartSubtotal)}
              </span>
            </span>
            <Link to="/cart" className="btn btn-primary">
              عرض السلة <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
