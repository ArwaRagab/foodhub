import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <i className="fa-solid fa-utensils"></i>
          </span>
          وجبة
        </Link>
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            الرئيسية
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            المطاعم
          </NavLink>
          <a href="/#about">من نحن</a>
          <a href="/#footer">تواصل معنا</a>
        </nav>
        <div className="nav-actions">
          <Link to="/cart" className="nav-cart" aria-label="السلة">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="badge-dot" style={{ display: cartCount > 0 ? 'flex' : 'none' }}>
              {cartCount}
            </span>
          </Link>
          <Link to="/login" className="btn btn-outline btn-sm">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            إنشاء حساب
          </Link>
          <button className="nav-toggle" aria-label="القائمة" onClick={toggleMenu}>
            {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
          </button>
        </div>
      </div>
    </header>
  );
}
