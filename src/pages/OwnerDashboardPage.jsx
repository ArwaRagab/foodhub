import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { FH_DATA, fmt } from '../data/data';

export default function OwnerDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderTab, setOrderTab] = useState('الكل');

  // Modal fields
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemCategory, setItemCategory] = useState('بيتزا');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImg, setItemImg] = useState('');

  // Settings form
  const [restName, setRestName] = useState('بيلا نابولي للبيتزا');
  const [cuisine, setCuisine] = useState('إيطالي · بيتزا');
  const [openTime, setOpenTime] = useState('10:00');
  const [closeTime, setCloseTime] = useState('23:00');
  const [deliveryFee, setDeliveryFee] = useState('12.50');
  const [minOrder, setMinOrder] = useState('40.00');
  const [isOpenForOrders, setIsOpenForOrders] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast('تم تسجيل الخروج بنجاح', 'default', 'fa-right-from-bracket');
    setTimeout(() => navigate('/login'), 400);
  };

  const handleSaveItem = () => {
    toast('تم حفظ العنصر', 'success', 'fa-circle-check');
    setIsModalOpen(false);
    setItemName('');
    setItemDesc('');
    setItemPrice('');
    setItemImg('');
  };

  const handleSaveSettings = () => {
    toast('تم حفظ الإعدادات', 'success', 'fa-circle-check');
  };

  const mockOwnerOrders = [
    { id: '#WJ-9931', customer: 'منى حسن', items: 3, total: 122.5, status: 'جديد' },
    { id: '#WJ-9930', customer: 'طارق سعيد', items: 2, total: 80, status: 'قيد التحضير' },
    { id: '#WJ-9928', customer: 'لينا فتحي', items: 5, total: 191, status: 'في الطريق' },
    { id: '#WJ-9921', customer: 'عمر سعيد', items: 1, total: 47.5, status: 'مكتمل' },
    { id: '#WJ-9918', customer: 'نور عادل', items: 4, total: 148.75, status: 'مكتمل' },
  ];

  const ownerStatusBadge = (s) =>
    ({
      'جديد': <span className="badge badge-info">جديد</span>,
      'قيد التحضير': <span className="badge badge-warning">قيد التحضير</span>,
      'في الطريق': <span className="badge badge-info">في الطريق</span>,
      'مكتمل': <span className="badge badge-success">مكتمل</span>,
    }[s]);

  const ownerMenu = FH_DATA.getMenu('r1').items;

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <i className="fa-solid fa-utensils"></i>
          </span>
          وجبة
        </Link>
        <div className="dash-nav-label">نظرة عامة</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('overview');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-gauge"></i> الرئيسية
        </button>
        <div className="dash-nav-label">الإدارة</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'orders' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('orders');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-receipt"></i> الطلبات
        </button>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'menu' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('menu');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-utensils"></i> عناصر المنيو
        </button>
        <div className="dash-nav-label">الحساب</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('settings');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-gear"></i> إعدادات المطعم
        </button>
        <div className="dash-sidebar-foot">
          <button
            type="button"
            className="dash-link w-full text-start"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i> تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <div className="dash-topbar">
          <button
            className="sidebar-toggle btn-icon btn-ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="input-icon-wrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className="input" placeholder="دور على طلبات أو عناصر المنيو..." />
          </div>
          <div className="flex items-center gap-2" style={{ marginInlineStart: 'auto' }}>
            <button
              className="icon-btn"
              style={{ width: '42px', height: '42px', borderRadius: '50%' }}
              aria-label="الإشعارات"
            >
              <i className="fa-regular fa-bell"></i>
            </button>
            <div className="avatar">بن</div>
          </div>
        </div>

        <div className="dash-content">
          {/* نظرة عامة */}
          {activeSection === 'overview' && (
            <section id="sec-overview">
              <div className="dash-page-head">
                <div>
                  <h2>أهلاً بيك يا بيلا نابولي 👋</h2>
                  <p className="text-muted">ده أداء مطعمك النهاردة.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                  <i className="fa-solid fa-plus"></i> إضافة عنصر للمنيو
                </button>
              </div>

              <div className="grid grid-2 mb-3">
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic orange">
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 12%
                    </span>
                  </div>
                  <div className="stat-value">348</div>
                  <div className="stat-label">إجمالي الطلبات هذا الشهر</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic green">
                      <i className="fa-solid fa-sack-dollar"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 8%
                    </span>
                  </div>
                  <div className="stat-value">32,100 ج.م</div>
                  <div className="stat-label">إيرادات هذا الشهر</div>
                </div>
              </div>

              <div className="chart-card mb-3">
                <div className="chart-head">
                  <h4>الإيرادات — آخر 7 أيام</h4>
                  <span className="badge badge-success">+8% عن الأسبوع الماضي</span>
                </div>
                <div className="bar-chart">
                  <div className="bar-col">
                    <div className="bar" style={{ height: '55%' }}></div>
                    <span className="bar-label">سبت</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar" style={{ height: '68%' }}></div>
                    <span className="bar-label">أحد</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar" style={{ height: '42%' }}></div>
                    <span className="bar-label">إثنين</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar" style={{ height: '80%' }}></div>
                    <span className="bar-label">ثلاثاء</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar active" style={{ height: '95%' }}></div>
                    <span className="bar-label">أربعاء</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar" style={{ height: '73%' }}></div>
                    <span className="bar-label">خميس</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar" style={{ height: '60%' }}></div>
                    <span className="bar-label">جمعة</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* الطلبات */}
          {activeSection === 'orders' && (
            <section id="sec-orders">
              <div className="dash-page-head">
                <div>
                  <h2>الطلبات</h2>
                  <p className="text-muted">إدارة الطلبات الواردة والسابقة.</p>
                </div>
              </div>
              <div className="tabs mb-3">
                {['الكل (32)', 'جديدة (5)', 'قيد التحضير (4)', 'في الطريق (3)', 'مكتملة (20)'].map((tabLabel) => (
                  <button
                    key={tabLabel}
                    className={`tab-btn ${orderTab === tabLabel ? 'active' : ''}`}
                    onClick={() => setOrderTab(tabLabel)}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>
              <div className="card table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الطلب</th>
                      <th>العميل</th>
                      <th>العناصر</th>
                      <th>الإجمالي</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody id="ownerOrderRows">
                    {mockOwnerOrders.map((o) => (
                      <tr key={o.id}>
                        <td className="price">{o.id}</td>
                        <td>{o.customer}</td>
                        <td>{o.items} عناصر</td>
                        <td className="price">{fmt(o.total)}</td>
                        <td>{ownerStatusBadge(o.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button className="page-btn">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              </div>
            </section>
          )}

          {/* المنيو */}
          {activeSection === 'menu' && (
            <section id="sec-menu">
              <div className="dash-page-head">
                <div>
                  <h2>إدارة المنيو</h2>
                  <p className="text-muted">أضف أو عدّل أو احذف عناصر من قائمة طعامك.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                  <i className="fa-solid fa-plus"></i> إضافة عنصر للمنيو
                </button>
              </div>
              <div className="card table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>العنصر</th>
                      <th>الفئة</th>
                      <th>السعر</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody id="ownerMenuRows">
                    {ownerMenu.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="row-item">
                            <img className="row-thumb" src={item.img} alt={item.name} />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>{item.tab}</td>
                        <td className="price">{fmt(item.price)}</td>
                        <td>
                          <span className="badge badge-success">متوفر</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* الإعدادات */}
          {activeSection === 'settings' && (
            <section id="sec-settings">
              <div className="dash-page-head">
                <div>
                  <h2>إعدادات المطعم</h2>
                  <p className="text-muted">حدّث بيانات مطعمك ومواعيد العمل.</p>
                </div>
              </div>
              <div className="card card-pad" style={{ maxWidth: '640px' }}>
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="field">
                    <label>اسم المطعم</label>
                    <input
                      className="input"
                      value={restName}
                      onChange={(e) => setRestName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>نوع المطبخ</label>
                    <input
                      className="input"
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>وقت الفتح</label>
                    <input
                      className="input"
                      type="time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>وقت الإغلاق</label>
                    <input
                      className="input"
                      type="time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                  </div>
                  <div className="field" style={{ gridColumn: '1/-1' }}>
                    <label>رسوم التوصيل</label>
                    <input
                      className="input"
                      value={deliveryFee}
                      onChange={(e) => setDeliveryFee(e.target.value)}
                    />
                  </div>
                  <div className="field" style={{ gridColumn: '1/-1' }}>
                    <label>الحد الأدنى للطلب</label>
                    <input
                      className="input"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <strong>استقبال الطلبات مفعّل حاليًا</strong>
                    <div className="text-sm text-muted">أوقف الاستقبال مؤقتًا عند الحاجة</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isOpenForOrders}
                      onChange={(e) => setIsOpenForOrders(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleSaveSettings}>
                  حفظ التغييرات
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* نافذة إضافة/تعديل عنصر منيو */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} id="addItemModal">
        <div className="modal-box">
          <div className="modal-head">
            <h3>إضافة عنصر للمنيو</h3>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="field">
            <label>اسم العنصر</label>
            <input
              className="input"
              placeholder="مثال: مارجريتا كلاسيك"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>الوصف</label>
            <textarea
              className="input"
              rows="2"
              placeholder="وصف مختصر"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div className="field">
              <label>الفئة</label>
              <select
                className="input"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
              >
                <option value="بيتزا">بيتزا</option>
                <option value="باستا">باستا</option>
                <option value="أطباق جانبية">أطباق جانبية</option>
                <option value="مشروبات">مشروبات</option>
              </select>
            </div>
            <div className="field">
              <label>السعر</label>
              <input
                className="input"
                placeholder="47.50"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>رابط الصورة</label>
            <input
              className="input"
              placeholder="https://..."
              value={itemImg}
              onChange={(e) => setItemImg(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={handleSaveItem}>
            حفظ العنصر
          </button>
        </div>
      </div>
    </div>
  );
}
