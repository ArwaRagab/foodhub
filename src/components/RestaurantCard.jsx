import React from 'react';
import { Link } from 'react-router-dom';
import { fmt } from '../data/data';

export default function RestaurantCard({ restaurant }) {
  const r = restaurant;
  return (
    <div className="r-card" data-rid={r.id}>
      <Link to={`/restaurant?id=${r.id}`} className="r-card-img" aria-label={`عرض ${r.name}`}>
        <img src={r.image} alt={r.name} loading="lazy" />
        {!r.isOpen && <div className="closed-overlay">مغلق الآن</div>}
      </Link>
      <Link to={`/restaurant?id=${r.id}`} className="r-card-body" style={{ display: 'block' }}>
        <div className="r-card-top">
          <div>
            <div className="r-card-name">{r.name}</div>
            <div className="r-card-cuisine">{r.cuisine}</div>
          </div>
          <span className="rating-pill">
            <i className="fa-solid fa-star"></i> {r.rating.toFixed(1)}
          </span>
        </div>
        <div className="r-card-meta">
          <span>
            <i className="fa-regular fa-clock"></i> {r.deliveryTime}
          </span>
          <span>
            <i className="fa-solid fa-motorcycle"></i>{' '}
            {r.deliveryFee === 0 ? 'توصيل مجاني' : fmt(r.deliveryFee)}
          </span>
          <span>
            <i className="fa-solid fa-tag"></i> الحد الأدنى {fmt(r.minOrder)}
          </span>
        </div>
      </Link>
    </div>
  );
}
