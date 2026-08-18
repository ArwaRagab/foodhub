import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';
import { FH_DATA, fmt } from '../data/data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('أروى مصطفى');
  const [phone, setPhone] = useState('+20 100 123 4567');

  // Modal form fields
  const [addrLabel, setAddrLabel] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast('تم تسجيل الخروج بنجاح', 'default', 'fa-right-from-bracket');
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  const handleSaveProfile = () => {
    toast('تم تحديث الملف الشخصي', 'success', 'fa-circle-check');
  };

  const handleSaveAddress = () => {
    toast('تم حفظ العنوان', 'success', 'fa-circle-check');
    setIsModalOpen(false);
    setAddrLabel('');
    setAddrStreet('');
    setAddrCity('');
  };

  const statusBadge = (s) =>
    s === 'تم التوصيل' ? (
      <span className="badge badge-success">تم التوصيل</span>
    ) : s === 'ملغي' ? (
      <span className="badge badge-danger">ملغي</span>
    ) : (
      <span className="badge badge-warning">{s}</span>
    );

  return (
    <>
      <Navbar />

      <main className="container section-tight">
        <div className="profile-shell">
          <div className="flex-col gap-3">
            <div className="card profile-card">
              <div className="avatar">أم</div>
              <h3>{fullName}</h3>
              <p className="text-sm text-muted">arwa.mostafa@email.com</p>
            </div>
            <div className="card" style={{ padding: '10px' }}>
              <button
                type="button"
                className={`profile-menu-link w-full text-start ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <i className="fa-solid fa-user"></i> البيانات الشخصية
              </button>
              <button
                type="button"
                className={`profile-menu-link w-full text-start ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <i className="fa-solid fa-location-dot"></i> العناوين المحفوظة
              </button>
              <button
                type="button"
                className={`profile-menu-link w-full text-start ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <i className="fa-solid fa-receipt"></i> سجل الطلبات
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="profile-menu-link w-full text-start"
                style={{ color: 'var(--c-danger)' }}
              >
                <i className="fa-solid fa-right-from-bracket"></i> تسجيل الخروج
              </button>
            </div>
          </div>

          <div>
            {/* البيانات الشخصية */}
            <div
              className="card card-pad tab-panel"
              id="tab-account"
              style={{ display: activeTab === 'account' ? 'block' : 'none' }}
            >
              <h3 className="mb-3">البيانات الشخصية</h3>
              <div className="grid grid-2" style={{ gap: '16px' }}>
                <div className="field">
                  <label>الاسم الكامل</label>
                  <input
                    className="input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>رقم الهاتف</label>
                  <input
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-primary mt-1" onClick={handleSaveProfile}>
                حفظ التغييرات
              </button>
            </div>

            {/* العناوين */}
            <div
              className="card card-pad tab-panel"
              id="tab-addresses"
              style={{ display: activeTab === 'addresses' ? 'block' : 'none' }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3>العناوين المحفوظة</h3>
                <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
                  <i className="fa-solid fa-plus"></i> إضافة عنوان
                </button>
              </div>
              <div className="flex-col gap-2" id="addressList">
                {FH_DATA.addresses.map((a) => (
                  <div key={a.id} className={`address-card ${a.isDefault ? 'default' : ''}`}>
                    <div>
                      <strong>{a.label}</strong>{' '}
                      {a.isDefault && <span className="badge badge-success">الافتراضي</span>}
                      <div className="text-sm text-muted mt-1">{a.detail}</div>
                    </div>
                    <div className="table-actions">
                      <button className="icon-btn" aria-label="تعديل">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="icon-btn danger" aria-label="حذف">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الطلبات */}
            <div
              className="card card-pad tab-panel"
              id="tab-orders"
              style={{ display: activeTab === 'orders' ? 'block' : 'none' }}
            >
              <h3 className="mb-3">سجل الطلبات</h3>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>رقم الطلب</th>
                      <th>المطعم</th>
                      <th>التاريخ</th>
                      <th>العناصر</th>
                      <th>الإجمالي</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody id="orderRows">
                    {FH_DATA.orders.map((o) => (
                      <tr key={o.id}>
                        <td className="price">{o.id}</td>
                        <td>{o.restaurant}</td>
                        <td>{o.date}</td>
                        <td>{o.items} عناصر</td>
                        <td className="price">{fmt(o.total)}</td>
                        <td>{statusBadge(o.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* نافذة إضافة عنوان */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} id="addAddressModal">
        <div className="modal-box">
          <div className="modal-head">
            <h3>إضافة عنوان جديد</h3>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="field">
            <label>التسمية</label>
            <input
              className="input"
              placeholder="المنزل، العمل، إلخ"
              value={addrLabel}
              onChange={(e) => setAddrLabel(e.target.value)}
            />
          </div>
          <div className="field">
            <label>عنوان الشارع</label>
            <input
              className="input"
              placeholder="الشارع، المبنى، الشقة"
              value={addrStreet}
              onChange={(e) => setAddrStreet(e.target.value)}
            />
          </div>
          <div className="field">
            <label>المدينة</label>
            <input
              className="input"
              placeholder="المدينة"
              value={addrCity}
              onChange={(e) => setAddrCity(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={handleSaveAddress}>
            حفظ العنوان
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
