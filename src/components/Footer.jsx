import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">
                <i className="fa-solid fa-utensils"></i>
              </span>
              وجبة
            </div>
            <p style={{ color: 'var(--c-gray-300)', maxWidth: '300px' }}>
              منصتك الأولى لاكتشاف أفضل المطاعم المحلية واختيار وجباتك المفضلة وسرعة التوصيل حتى باب بيتك.
            </p>
            <div className="social-row">
              <a href="#" aria-label="فيسبوك"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="تويتر"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="انستجرام"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4>روابط سريعة</h4>
            <ul>
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/dashboard">تصفح المطاعم</Link></li>
              <li><Link to="/login">تسجيل الدخول</Link></li>
              <li><Link to="/register">إنشاء حساب جديد</Link></li>
            </ul>
          </div>
          <div>
            <h4>عن وجبة</h4>
            <ul>
              <li><a href="#about">من نحن</a></li>
              <li><a href="#">الشروط والأحكام</a></li>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">انضم كشريك مطعم</a></li>
            </ul>
          </div>
          <div>
            <h4>تواصل معنا</h4>
            <ul>
              <li><i className="fa-solid fa-envelope" style={{ marginInlineEnd: '8px' }}></i> support@foodhub.app</li>
              <li><i className="fa-solid fa-phone" style={{ marginInlineEnd: '8px' }}></i> +20 100 123 4567</li>
              <li><i className="fa-solid fa-location-dot" style={{ marginInlineEnd: '8px' }}></i> القاهرة، مصر</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 وجبة. جميع الحقوق محفوظة.</span>
          <span>تصميم وتطوير بواسطة فريق وجبة</span>
        </div>
      </div>
    </footer>
  );
}
