import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { fmt } from '../data/data';

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, cartSubtotal } = useCart();

  const deliveryFee = cartSubtotal > 0 ? 12.5 : 0;
  const total = Math.max(cartSubtotal + deliveryFee, 0);

  useEffect(() => {
    try {
      localStorage.setItem('fh_order_total', total.toFixed(2));
    } catch (e) {}
  }, [total]);

  const isEmpty = cart.length === 0;

  return (
    <>
      <Navbar />

      <main className="container section-tight">
        <h2 className="mb-1">
          <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--c-primary)' }}></i> سلة المشتريات
        </h2>
        <p className="mb-3 text-muted">راجع طلبك قبل ما تكمل الدفع.</p>

        <div className="cart-layout">
          <div className="card card-pad" id="cartItemsCard">
            {!isEmpty ? (
              <div id="cartLines">
                {cart.map((item) => (
                  <div key={item.id} className="cart-line">
                    <img src={item.img} alt={item.name} />
                    <div className="cart-line-info">
                      <h4>{item.name}</h4>
                      <div className="sub">{item.restaurant || ''}</div>
                    </div>
                    <span className="price">{fmt(item.price * item.qty)}</span>
                    <div className="qty-stepper">
                      <button onClick={() => updateCartQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <button
                      className="icon-btn danger"
                      aria-label="حذف"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" id="cartEmpty">
                <i className="fa-solid fa-cart-shopping"></i>
                <h3>السلة فاضية</h3>
                <p className="text-muted mb-3">تصفح المطاعم وضيف حاجة لذيذة.</p>
                <Link to="/dashboard" className="btn btn-primary">
                  تصفح المطاعم
                </Link>
              </div>
            )}
          </div>

          {!isEmpty && (
            <div className="card card-pad" id="summaryCard">
              <h3 className="mb-2">ملخص الطلب</h3>
              <div className="summary-row">
                <span>الإجمالي الفرعي</span>
                <span className="price" id="sumSubtotal">
                  {fmt(cartSubtotal)}
                </span>
              </div>
              <div className="summary-row">
                <span>رسوم التوصيل</span>
                <span className="price" id="sumDelivery">
                  {fmt(deliveryFee)}
                </span>
              </div>
              <div className="summary-row total">
                <span>الإجمالي</span>
                <span className="price" id="sumTotal">
                  {fmt(total)}
                </span>
              </div>

              <Link to="/checkout" className="btn btn-primary btn-block btn-lg mt-3" id="checkoutBtn">
                إتمام الطلب <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <Link to="/dashboard" className="btn btn-ghost btn-block mt-1">
                ضيف عناصر تانية
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
