import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { FH_DATA, fmt } from '../data/data';

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userTab, setUserTab] = useState('الكل');

  // Settings state
  const [commission, setCommission] = useState('15');
  const [defaultDeliveryFee, setDefaultDeliveryFee] = useState('12.50');
  const [supportEmail, setSupportEmail] = useState('support@foodhub.app');
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast('تم تسجيل الخروج بنجاح', 'default', 'fa-right-from-bracket');
    setTimeout(() => navigate('/login'), 400);
  };

  const handleSaveSettings = () => {
    toast('تم حفظ الإعدادات', 'success', 'fa-circle-check');
  };

  const mockUsers = [
    { name: 'منى حسن', email: 'mona.h@email.com', role: 'Customer', joined: '14 يناير 2026', status: 'Active' },
    { name: 'بيلا نابولي للبيتزا', email: 'owner@bellanapoli.com', role: 'Owner', joined: '02 نوفمبر 2025', status: 'Active' },
    { name: 'يوسف الأمين', email: 'yusuf.a@email.com', role: 'Customer', joined: '21 مارس 2026', status: 'Active' },
    { name: 'جولدين دراجون ووك', email: 'owner@goldendragon.com', role: 'Owner', joined: '09 أغسطس 2025', status: 'Suspended' },
    { name: 'سارة نجيب', email: 'sara.n@email.com', role: 'Customer', joined: '30 مايو 2026', status: 'Active' },
  ];

  const statusBadgeAdmin = (s) =>
    s === 'Active' ? (
      <span className="badge badge-success">نشط</span>
    ) : (
      <span className="badge badge-danger">موقوف</span>
    );

  const roleBadge = (r) =>
    r === 'Owner' ? (
      <span className="badge badge-info">صاحب مطعم</span>
    ) : (
      <span className="badge badge-dark">عميل</span>
    );

  const mockAdminOrders = [
    { id: '#WJ-10523', customer: 'منى حسن', restaurant: 'بيلا نابولي للبيتزا', total: 122.5, status: 'Preparing' },
    { id: '#WJ-10522', customer: 'طارق سعيد', restaurant: 'سموك هاوس برجر', total: 80.0, status: 'On the way' },
    { id: '#WJ-10521', customer: 'لينا فتحي', restaurant: 'ساكورا سوشي هاوس', total: 191.0, status: 'Delivered' },
    { id: '#WJ-10520', customer: 'عمر سعيد', restaurant: 'مطبخ الروضة الدمشقي', total: 47.5, status: 'Cancelled' },
  ];

  const adminStatusBadge = (s) =>
    ({
      'Preparing': <span className="badge badge-warning">قيد التحضير</span>,
      'On the way': <span className="badge badge-info">في الطريق</span>,
      'Delivered': <span className="badge badge-success">تم التوصيل</span>,
      'Cancelled': <span className="badge badge-danger">ملغي</span>,
    }[s]);

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <i className="fa-solid fa-utensils"></i>
          </span>
          وجبة{' '}
          <span className="badge badge-dark" style={{ marginInlineStart: '4px' }}>
            مشرف
          </span>
        </Link>
        <div className="dash-nav-label">نظرة عامة</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('analytics');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-chart-line"></i> التحليلات
        </button>
        <div className="dash-nav-label">المنصة</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('users');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-users"></i> المستخدمين
        </button>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'restaurants' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('restaurants');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-store"></i> المطاعم
        </button>
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
        <div className="dash-nav-label">النظام</div>
        <button
          type="button"
          className={`dash-link w-full text-start ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('settings');
            setIsSidebarOpen(false);
          }}
        >
          <i className="fa-solid fa-gear"></i> الإعدادات
        </button>
        <div className="dash-sidebar-foot">
          <button type="button" className="dash-link w-full text-start" onClick={handleLogout}>
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
            <input className="input" placeholder="ابحث عن مستخدمين، مطاعم، طلبات..." />
          </div>
          <div className="flex items-center gap-2" style={{ marginInlineStart: 'auto' }}>
            <button
              className="icon-btn"
              style={{ width: '42px', height: '42px', borderRadius: '50%' }}
              aria-label="الإشعارات"
            >
              <i className="fa-regular fa-bell"></i>
            </button>
            <div className="avatar" style={{ background: 'var(--c-primary)' }}>
              أد
            </div>
          </div>
        </div>

        <div className="dash-content">
          {/* التحليلات */}
          {activeSection === 'analytics' && (
            <section id="sec-analytics">
              <div className="dash-page-head">
                <div>
                  <h2>تحليلات المنصة</h2>
                  <p className="text-muted">نظرة عامة على أداء منصة وجبة.</p>
                </div>
                <select className="input" style={{ width: '160px' }}>
                  <option>آخر 7 أيام</option>
                  <option>آخر 30 يوم</option>
                  <option>هذا العام</option>
                </select>
              </div>

              <div className="grid grid-4 mb-3">
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic orange">
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 18%
                    </span>
                  </div>
                  <div className="stat-value">12,480</div>
                  <div className="stat-label">إجمالي الطلبات</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic green">
                      <i className="fa-solid fa-sack-dollar"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 11%
                    </span>
                  </div>
                  <div className="stat-value">184,000 ج.م</div>
                  <div className="stat-label">إجمالي الإيرادات</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic blue">
                      <i className="fa-solid fa-store"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 4%
                    </span>
                  </div>
                  <div className="stat-value">386</div>
                  <div className="stat-label">المطاعم النشطة</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-top">
                    <div className="stat-ic yellow">
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <span className="stat-trend up">
                      <i className="fa-solid fa-arrow-up"></i> 9%
                    </span>
                  </div>
                  <div className="stat-value">28,910</div>
                  <div className="stat-label">العملاء المسجلون</div>
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', gap: '24px' }}>
                <div className="chart-card">
                  <div className="chart-head">
                    <h4>الطلبات — آخر 7 أيام</h4>
                    <span className="badge badge-success">+18% مقارنة بالأسبوع الماضي</span>
                  </div>
                  <div className="bar-chart">
                    <div className="bar-col">
                      <div className="bar" style={{ height: '48%' }}></div>
                      <span className="bar-label">إثنين</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '62%' }}></div>
                      <span className="bar-label">ثلاثاء</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '55%' }}></div>
                      <span className="bar-label">أربعاء</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '71%' }}></div>
                      <span className="bar-label">خميس</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '84%' }}></div>
                      <span className="bar-label">جمعة</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar active" style={{ height: '100%' }}></div>
                      <span className="bar-label">سبت</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: '90%' }}></div>
                      <span className="bar-label">أحد</span>
                    </div>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-head">
                    <h4>الطلبات حسب المدينة</h4>
                  </div>
                  <ul className="donut-legend">
                    <li>
                      <span className="sw" style={{ background: 'var(--c-primary)' }}></span> القاهرة — 41%
                    </li>
                    <li>
                      <span className="sw" style={{ background: 'var(--c-dark)' }}></span> الرياض — 29%
                    </li>
                    <li>
                      <span className="sw" style={{ background: 'var(--c-gray-300)' }}></span> الجيزة — 18%
                    </li>
                    <li>
                      <span className="sw" style={{ background: 'var(--c-gray-200)' }}></span> أخرى — 12%
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* المستخدمين */}
          {activeSection === 'users' && (
            <section id="sec-users">
              <div className="dash-page-head">
                <div>
                  <h2>إدارة المستخدمين</h2>
                  <p className="text-muted">عرض وإدارة حسابات العملاء وأصحاب المطاعم.</p>
                </div>
                <button className="btn btn-primary">
                  <i className="fa-solid fa-plus"></i> إضافة مستخدم
                </button>
              </div>
              <div className="tabs mb-3">
                {['الكل', 'العملاء', 'أصحاب المطاعم', 'الموقوفة'].map((t) => (
                  <button
                    key={t}
                    className={`tab-btn ${userTab === t ? 'active' : ''}`}
                    onClick={() => setUserTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="card table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>البريد الإلكتروني</th>
                      <th>الدور</th>
                      <th>تاريخ الانضمام</th>
                      <th>الحالة</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="userRows">
                    {mockUsers.map((u, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="row-item">
                            <div
                              className="avatar"
                              style={{ width: '32px', height: '32px', fontSize: '12px' }}
                            >
                              {u.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>{roleBadge(u.role)}</td>
                        <td>{u.joined}</td>
                        <td>{statusBadgeAdmin(u.status)}</td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn" aria-label="عرض">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button className="icon-btn danger" aria-label="إيقاف">
                              <i className="fa-solid fa-ban"></i>
                            </button>
                          </div>
                        </td>
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

          {/* المطاعم */}
          {activeSection === 'restaurants' && (
            <section id="sec-restaurants">
              <div className="dash-page-head">
                <div>
                  <h2>إدارة المطاعم</h2>
                  <p className="text-muted">الموافقة على قائمة المطاعم أو إيقافها أو تعديلها.</p>
                </div>
                <button className="btn btn-primary">
                  <i className="fa-solid fa-plus"></i> إضافة مطعم
                </button>
              </div>
              <div className="card table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>المطعم</th>
                      <th>صاحب المطعم</th>
                      <th>المطبخ</th>
                      <th>التقييم</th>
                      <th>الحالة</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="restaurantRows">
                    {FH_DATA.restaurants.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <div className="row-item">
                            <img className="row-thumb" src={r.logo} alt={r.name} />
                            <span>{r.name}</span>
                          </div>
                        </td>
                        <td>owner@{r.id}.com</td>
                        <td>{r.cuisine}</td>
                        <td>
                          <i className="fa-solid fa-star"></i> {r.rating.toFixed(1)}
                        </td>
                        <td>
                          {r.isOpen ? (
                            <span className="badge badge-success">مقبول</span>
                          ) : (
                            <span className="badge badge-warning">قيد المراجعة</span>
                          )}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn" aria-label="عرض">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button className="icon-btn" aria-label="تعديل">
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="icon-btn danger" aria-label="حذف">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* الطلبات */}
          {activeSection === 'orders' && (
            <section id="sec-orders">
              <div className="dash-page-head">
                <div>
                  <h2>جميع طلبات المنصة</h2>
                  <p className="text-muted">متابعة وإدارة الطلبات عبر جميع المطاعم.</p>
                </div>
              </div>
              <div className="card table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>رقم الطلب</th>
                      <th>العميل</th>
                      <th>المطعم</th>
                      <th>الإجمالي</th>
                      <th>الحالة</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="adminOrderRows">
                    {mockAdminOrders.map((o) => (
                      <tr key={o.id}>
                        <td className="price">{o.id}</td>
                        <td>{o.customer}</td>
                        <td>{o.restaurant}</td>
                        <td className="price">{fmt(o.total)}</td>
                        <td>{adminStatusBadge(o.status)}</td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn" aria-label="عرض">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                          </div>
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
                  <h2>إعدادات النظام</h2>
                  <p className="text-muted">الإعدادات العامة للمنصة.</p>
                </div>
              </div>
              <div className="card card-pad" style={{ maxWidth: '640px' }}>
                <div className="field">
                  <label>عمولة المنصة (%)</label>
                  <input
                    className="input"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>رسوم التوصيل الافتراضية (ج.م)</label>
                  <input
                    className="input"
                    value={defaultDeliveryFee}
                    onChange={(e) => setDefaultDeliveryFee(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>البريد الإلكتروني للدعم</label>
                  <input
                    className="input"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 mb-2">
                  <div>
                    <strong>تسجيل المطاعم الجديدة</strong>
                    <div className="text-sm text-muted">السماح للمطاعم الجديدة بالتسجيل</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={allowRegistration}
                      onChange={(e) => setAllowRegistration(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <strong>وضع الصيانة</strong>
                    <div className="text-sm text-muted">تعطيل طلبات العملاء مؤقتاً</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <button className="btn btn-primary mt-2" onClick={handleSaveSettings}>
                  حفظ الإعدادات
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
