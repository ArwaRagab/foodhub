import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    toast('تم تسجيل الدخول بنجاح', 'success', 'fa-circle-check');
    setTimeout(() => navigate('/dashboard'), 700);
  };

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link to="/" className="brand" style={{ color: 'white' }}>
          <span className="brand-mark">
            <i className="fa-solid fa-utensils"></i>
          </span>
          وجبة
        </Link>
        <div>
          <h2 style={{ color: 'white', marginBottom: '14px' }}>
            أكل لذيذ،<br />
            على بعد ضغطة واحدة.
          </h2>
          <p style={{ color: 'var(--c-gray-300)', maxWidth: '340px' }}>
            سجّل دخولك لإعادة طلب وجباتك المفضلة، وتابع توصيلك لحظة بلحظة، وتحكم في عناوينك المحفوظة.
          </p>
          <div className="flex gap-2 mt-4">
            <img
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80"
              alt="طبق سوشي"
              style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80"
              alt="برجر"
              style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover', marginTop: '18px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80"
              alt="حلويات"
              style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <p style={{ color: 'var(--c-gray-500)', fontSize: '13px' }}>© 2026 وجبة. جميع الحقوق محفوظة.</p>
      </aside>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2 className="mb-1">أهلاً بيك تاني</h2>
          <p className="mb-3">سجّل دخولك لمتابعة طلب وجباتك المفضلة.</p>

          <form id="loginForm" onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="input-icon-wrap">
                <i className="fa-regular fa-envelope"></i>
                <input
                  className="input"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password">كلمة المرور</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-lock"></i>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              تسجيل الدخول
            </button>
          </form>

          <p className="text-center mt-3 text-sm">
            معاك حساب لسه؟{' '}
            <Link to="/register" className="link">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
