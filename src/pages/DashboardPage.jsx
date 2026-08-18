import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { FH_DATA } from '../data/data';

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('cat') || '';

  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setActiveQuery(q);
    }
  }, [searchParams]);

  let filteredList = [...FH_DATA.restaurants];

  if (categoryParam) {
    filteredList = filteredList.filter((r) => r.categoryIds && r.categoryIds.includes(categoryParam));
  }

  if (activeQuery.trim()) {
    const q = activeQuery.toLowerCase().trim();
    filteredList = filteredList.filter(
      (r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'rating') {
    filteredList.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'time') {
    filteredList.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
  } else if (sortBy === 'fee') {
    filteredList.sort((a, b) => a.deliveryFee - b.deliveryFee);
  }

  const recommendedList = FH_DATA.restaurants.slice(-4);

  return (
    <>
      <Navbar />

      <main className="container section-tight">
        <div className="card card-pad mb-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <div className="input-icon-wrap" style={{ flex: 2, minWidth: '220px' }}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              className="input"
              id="searchInput"
              type="text"
              placeholder="دور على أصناف أكل..."
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
            />
          </div>
          <select
            className="input"
            id="sortSelect"
            style={{ flex: '0 0 200px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">الترتيب: المقترح</option>
            <option value="rating">الترتيب: الأعلى تقييمًا</option>
            <option value="time">الترتيب: الأسرع توصيلًا</option>
            <option value="fee">الترتيب: الأقل رسوم توصيل</option>
          </select>
        </div>

        <div className="section-head">
          <div>
            <h2 id="resultsTitle">
              {categoryParam
                ? `مطاعم ${FH_DATA.categories.find((c) => c.id === categoryParam)?.name || ''}`
                : 'كل المطاعم'}
            </h2>
            <p id="resultsCount" className="text-muted">
              {filteredList.length} مطعم متاح
            </p>
          </div>
        </div>

        {filteredList.length > 0 ? (
          <div className="grid grid-4" id="restaurantGrid">
            {filteredList.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          <div className="empty-state" id="emptyState">
            <i className="fa-regular fa-face-frown"></i>
            <h3>مفيش مطاعم مطابقة لبحثك</h3>
            <p className="text-muted">جرّب كلمة بحث مختلفة أو شيل الفلاتر.</p>
          </div>
        )}

        <section className="section-tight">
          <div className="section-head">
            <div>
              <h2>مقترح لك</h2>
              <p className="text-muted">على حسب طلباتك الأخيرة وتفضيلاتك في الأكل.</p>
            </div>
          </div>
          <div className="grid grid-4" id="recommendedGrid">
            {recommendedList.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
