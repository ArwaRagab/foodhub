import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'owner' ? 'owner' : 'customer';

  const [currentRole, setCurrentRole] = useState(initialRole);
  const [fullName, setFullName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('role') === 'owner') {
      setCurrentRole('owner');
    }
  }, [searchParams]);

  const handleRegister = (e) => {
    e.preventDefault();
    toast('تم إنشاء الحساب بنجاح', 'success', 'fa-circle-check');
    setTimeout(() => {
      navigate(currentRole === 'owner' ? '/owner-dashboard' : '/dashboard');
    }, 700);
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
            انضم لآلاف<br />
            بيطلبوا بذكاء.
          </h2>
          <p style={{ color: 'var(--c-gray-300)', maxWidth: '340px' }}>
            أنشئ حساب مجاني كعميل، أو سجّل مطعمك وابدأ تستقبل طلبات من النهاردة.
          </p>
        </div>
        <p style={{ color: 'var(--c-gray-500)', fontSize: '13px' }}>© 2026 وجبة. جميع الحقوق محفوظة.</p>
      </aside>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2 className="mb-1">إنشاء حساب جديد</h2>
          <p className="mb-3">اختار الطريقة اللي تناسبك لاستخدام وجبة.</p>

          <div className="role-select" id="roleSelect">
            <button
              type="button"
              className={`role-opt ${currentRole === 'customer' ? 'active' : ''}`}
              data-role="customer"
              onClick={() => setCurrentRole('customer')}
            >
              <i className="fa-solid fa-user"></i>
              <span>عميل</span>
              <small>عشان تطلب من المطاعم</small>
            </button>
            <button
              type="button"
              className={`role-opt ${currentRole === 'owner' ? 'active' : ''}`}
              data-role="owner"
              onClick={() => setCurrentRole('owner')}
            >
              <i className="fa-solid fa-store"></i>
              <span>صاحب مطعم</span>
              <small>عشان تدير المنيو والطلبات</small>
            </button>
          </div>

          <form id="registerForm" onSubmit={handleRegister}>
            <div className="field">
              <label htmlFor="fullName">الاسم الكامل</label>
              <input
                className="input"
                type="text"
                id="fullName"
                placeholder="أروى مصطفى"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            {currentRole === 'owner' && (
              <div className="field" id="restaurantNameField">
                <label htmlFor="restName">اسم المطعم</label>
                <input
                  className="input"
                  type="text"
                  id="restName"
                  placeholder="مثال: مطبخ كلين تانك"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </div>
            )}
            <div className="field">
              <label htmlFor="regEmail">البريد الإلكتروني</label>
              <input
                className="input"
                type="email"
                id="regEmail"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="regPhone">رقم الهاتف</label>
              <input
                className="input"
                type="tel"
                id="regPhone"
                placeholder="+20 100 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="regPassword">كلمة المرور</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-lock"></i>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  id="regPassword"
                  placeholder="8 أحرف على الأقل"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
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
            <button type="submit" className="btn btn-primary btn-block btn-lg" id="submitBtn">
              {currentRole === 'owner' ? 'إنشاء حساب مطعم' : 'إنشاء حساب عميل'}
            </button>
          </form>

          <p className="text-center mt-3 text-sm">
            معاك حساب؟{' '}
            <Link to="/login" className="link">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
