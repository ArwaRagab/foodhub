import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { FH_DATA, fmt } from '../data/data';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedAddrId, setSelectedAddrId] = useState('a1');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [notes, setNotes] = useState('');
  const [payMethod, setPayMethod] = useState('cash');

  const subtotal = cartSubtotal;
  const delivery = subtotal > 0 ? 12.5 : 0;
  const storedTotalVal = parseFloat(localStorage.getItem('fh_order_total'));
  const storedTotal = !isNaN(storedTotalVal) ? storedTotalVal : subtotal + delivery;

  const placeOrder = () => {
    if (cart.length === 0) {
      toast('السلة فاضية', 'danger', 'fa-triangle-exclamation');
      return;
    }
    if (!street.trim()) {
      toast('من فضلك اكتب عنوان التوصيل', 'danger', 'fa-triangle-exclamation');
      return;
    }
    toast('تم تأكيد الطلب بنجاح!', 'success', 'fa-circle-check');
    clearCart();
    setTimeout(() => navigate('/tracking'), 800);
  };

  return (
    <>
      <Navbar />

      <main className="container section-tight">
        <div className="steps-row">
          <div className="step-pill done">
            <span className="num">
              <i className="fa-solid fa-check"></i>
            </span>{' '}
            السلة
          </div>
          <div className="step-line"></div>
          <div className="step-pill active">
            <span className="num">2</span> إتمام الطلب
          </div>
        </div>

        <div className="cart-layout">
          <div className="flex-col gap-3">
            <div className="card card-pad">
              <h3 className="mb-2">
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--c-primary)' }}></i> عنوان التوصيل
              </h3>
              <div className="flex-col gap-2 mb-2" id="savedAddresses">
                {FH_DATA.addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`address-card ${selectedAddrId === a.id ? 'default' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedAddrId(a.id)}
                  >
                    <div>
                      <strong>{a.label}</strong>{' '}
                      {a.isDefault && <span className="badge badge-success">الافتراضي</span>}
                      <div className="text-sm text-muted mt-1">{a.detail}</div>
                    </div>
                    <input
                      type="radio"
                      name="savedAddr"
                      checked={selectedAddrId === a.id}
                      onChange={() => setSelectedAddrId(a.id)}
                    />
                  </label>
                ))}
              </div>

              <form id="addressForm" className="grid grid-2" style={{ gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
                <div className="field" style={{ gridColumn: '1/-1' }}>
                  <label>عنوان الشارع</label>
                  <input
                    className="input"
                    id="street"
                    placeholder="12 شارع التحرير، شقة 4ب"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label>المدينة</label>
                  <input
                    className="input"
                    id="city"
                    placeholder="الجيزة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label>الرمز البريدي</label>
                  <input
                    className="input"
                    id="postal"
                    placeholder="12511"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </div>
                <div className="field" style={{ gridColumn: '1/-1' }}>
                  <label>ملاحظات التوصيل (اختياري)</label>
                  <textarea
                    className="input"
                    rows="2"
                    placeholder="مثال: اترك الطلب عند الباب، اتصل عند الوصول"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="card card-pad">
              <h3 className="mb-2">
                <i className="fa-solid fa-wallet" style={{ color: 'var(--c-primary)' }}></i> طريقة الدفع
              </h3>
              <div className="flex-col gap-2">
                <label
                  className={`pay-option ${payMethod === 'cash' ? 'active' : ''}`}
                  data-method="cash"
                  onClick={() => setPayMethod('cash')}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payMethod === 'cash'}
                    onChange={() => setPayMethod('cash')}
                  />{' '}
                  <i className="fa-solid fa-money-bill-wave"></i>
                  <div>
                    <strong>الدفع عند الاستلام</strong>
                    <div className="text-sm text-muted">ادفع كاش لحظة وصول الطلب</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <h3 className="mb-2">ملخص الطلب</h3>
            <div id="checkoutLines" className="mb-2">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mt-1">
                    <span>
                      {item.qty}× {item.name}
                    </span>
                    <span className="price">{fmt(item.price * item.qty)}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted text-sm">لا توجد عناصر — رجّع للسلة وضيف حاجة.</p>
              )}
            </div>
            <div className="summary-row">
              <span>الإجمالي الفرعي</span>
              <span className="price" id="cSubtotal">
                {fmt(subtotal)}
              </span>
            </div>
            <div className="summary-row">
              <span>رسوم التوصيل</span>
              <span className="price" id="cDelivery">
                {fmt(delivery)}
              </span>
            </div>
            <div className="summary-row total">
              <span>الإجمالي</span>
              <span className="price" id="cTotal">
                {fmt(storedTotal)}
              </span>
            </div>
            <button className="btn btn-primary btn-block btn-lg mt-3" onClick={placeOrder}>
              <i className="fa-solid fa-bag-shopping"></i> تأكيد الطلب
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
