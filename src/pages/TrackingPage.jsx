import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TrackingPage() {
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
          <div className="step-pill done">
            <span className="num">
              <i className="fa-solid fa-check"></i>
            </span>{' '}
            إتمام الطلب
          </div>
        </div>

        <div className="card card-pad mb-3 flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2>
              طلب <span className="price">#WJ-10523</span>
            </h2>
            <p className="text-muted mt-1">
              بيلا نابولي للبيتزا · 3 عناصر · <span className="price">122.50 ج.م</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
