import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSendLink = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleResend = (e) => {
    e.preventDefault();
    toast('تم إعادة إرسال الرابط', 'success', 'fa-paper-plane');
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
            نسيت كلمة<br />
            المرور؟
          </h2>
          <p style={{ color: 'var(--c-gray-300)', maxWidth: '340px' }}>
            ولا يهمك — بيحصل مع كل الناس. اكتب بريدك الإلكتروني وهنبعتلك رابط إعادة تعيين آمن.
          </p>
        </div>
        <p style={{ color: 'var(--c-gray-500)', fontSize: '13px' }}>© 2026 وجبة. جميع الحقوق محفوظة.</p>
      </aside>

      <div className="auth-form-side">
        <div className="auth-card">
          {step === 1 ? (
            <div id="step1">
              <h2 className="mb-1">إعادة تعيين كلمة المرور</h2>
              <p className="mb-3">اكتب البريد الإلكتروني المرتبط بحسابك.</p>
              <form onSubmit={handleSendLink}>
                <div className="field">
                  <label htmlFor="resetEmail">البريد الإلكتروني</label>
                  <div className="input-icon-wrap">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      className="input"
                      type="email"
                      id="resetEmail"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  إرسال رابط إعادة التعيين
                </button>
              </form>
              <p className="text-center mt-3 text-sm">
                <Link to="/login" className="link">
                  <i className="fa-solid fa-arrow-right"></i> رجوع لتسجيل الدخول
                </Link>
              </p>
            </div>
          ) : (
            <div id="step2" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--c-success-tint)',
                  color: 'var(--c-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  margin: '0 auto 18px',
                }}
              >
                <i className="fa-solid fa-envelope-circle-check"></i>
              </div>
              <h2 className="mb-1">شوف بريدك الإلكتروني</h2>
              <p className="mb-3">
                بعتنا رابط إعادة تعيين كلمة المرور لـ <strong id="emailDisplay">{email}</strong>. الرابط صالح لمدة 30 دقيقة بس.
              </p>
              <button
                className="btn btn-outline btn-block"
                onClick={() => setStep(1)}
              >
                استخدم بريد إلكتروني آخر
              </button>
              <p className="text-center mt-3 text-sm">
                لم يصلك إيميل؟{' '}
                <a href="#" className="link" onClick={handleResend}>
                  إعادة إرسال الرابط
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
