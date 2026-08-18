import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { FH_DATA } from '../data/data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <a className="skip-link" href="#main">تخطي إلى المحتوى</a>
      <Navbar />

      <main id="main">
        {/* ============ القسم الرئيسي ============ */}
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">
                <i className="fa-solid fa-bolt"></i> توصيل في 25 دقيقة أو أقل
              </span>
              <h1>
                جعت؟ يلا اطلب<br />
                <span className="hl">أكلتك المفضلة</span> دلوقتي
              </h1>
              <p className="lead">
                اطلب من أكتر من 1,200 مطعم قريب منك — وتابع عامل التوصيل لحظة بلحظة لحد ما يوصلك الأكل سخن في معاده.
              </p>
              <form className="hero-search" onSubmit={handleSearch}>
                <i
                  className="fa-solid fa-location-dot"
                  style={{ alignSelf: 'center', marginInlineStart: '10px', color: 'var(--c-gray-500)' }}
                ></i>
                <input
                  type="text"
                  name="q"
                  placeholder="دور على مطاعم، أكلات، أو أصناف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-magnifying-glass"></i> دور على أكل
                </button>
              </form>
              <div className="hero-stats">
                <div><b>1,200+</b><span>مطعم</span></div>
                <div><b>4.8</b><span>متوسط التقييم</span></div>
                <div><b>30 د</b><span>متوسط وقت التوصيل</span></div>
              </div>
            </div>
            <div className="hero-art">
              <img
                className="plate"
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80"
                alt="بيتزا طازجة جاهزة للتوصيل"
              />
              <div className="float-card fc-1">
                <span className="dot-ic" style={{ background: 'var(--c-success)' }}>
                  <i className="fa-solid fa-check"></i>
                </span>{' '}
                تم تأكيد الطلب
              </div>
              <div className="float-card fc-2">
                <span className="dot-ic" style={{ background: 'var(--c-primary)' }}>
                  <i className="fa-solid fa-motorcycle"></i>
                </span>{' '}
                المندوب على بعد 6 دقايق
              </div>
            </div>
          </div>
        </section>

        {/* ============ الأقسام ============ */}
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>اطلب على حسب نفسيتك</h2>
                <p>روح على المطبخ اللي نفسك فيه دلوقتي بضغطة واحدة.</p>
              </div>
            </div>
            <div className="chip-row" id="categoryRow">
              {FH_DATA.categories.map((c) => (
                <Link key={c.id} to={`/dashboard?cat=${c.id}`} className="cat-chip">
                  <div className="cat-chip-ic">
                    <i className={`fa-solid ${c.icon}`}></i>
                  </div>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ مطاعم مميزة ============ */}
        <section className="section-tight" id="featured">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>مطاعم مميزة</h2>
                <p>أكثر الاختيارات طلبًا من الناس القريبة منك دلوقتي.</p>
              </div>
              <Link to="/dashboard" className="btn btn-outline">
                عرض الكل <i className="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
            <div className="grid grid-4" id="featuredRow">
              {FH_DATA.restaurants.slice(0, 4).map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ آراء العملاء ============ */}
        <section className="section-tight" id="about">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>آراء العملاء</h2>
                <p>شوف تجارب الناس اللي جربوا اطلبوا من وجبة.</p>
              </div>
            </div>
            <div className="grid grid-3" id="reviewsRow">
              {FH_DATA.reviews.map((rv, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-stars">
                    {Array.from({ length: rv.rating }).map((_, i) => (
                      <i key={`fill-${i}`} className="fa-solid fa-star"></i>
                    ))}
                    {Array.from({ length: 5 - rv.rating }).map((_, i) => (
                      <i key={`empty-${i}`} className="fa-regular fa-star"></i>
                    ))}
                  </div>
                  <p>"{rv.text}"</p>
                  <div className="review-person">
                    <div className="avatar">
                      {rv.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px' }}>{rv.name}</strong>
                      <span className="text-sm text-muted">{rv.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
