import React from 'react';
import { Link } from 'react-router-dom';

export default function CitizenSidebar({ activeTab, setActiveTab, onOpenReportModal }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'report', label: 'Report Issue', icon: 'report_problem', isAction: true },
    { id: 'my-reports', label: 'My Reports', icon: 'assignment', badge: '3' },
    { id: 'explore', label: 'Explore', icon: 'map' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', badge: '2' },
  ];

  const handleNavClick = (item) => {
    if (item.isAction) {
      onOpenReportModal();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <aside className="hidden md:flex bg-white dark:bg-surface-dim h-full w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex-col py-6 z-50">
      {/* Brand */}
      <div className="px-6 mb-8">
        <Link to="/" className="text-2xl font-black text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            visibility
          </span>
          <span>NagarDrishti</span>
        </Link>
        <p className="text-xs text-on-surface-variant font-medium mt-1">Citizen Portal</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'text-primary font-bold bg-primary-fixed'
                  : 'text-on-surface-variant hover:text-secondary hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-primary-container/20 text-primary-container text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Report Button & Bottom Links */}
      <div className="px-4 mt-auto space-y-4 pt-4 border-t border-outline-variant/60">
        <Link
          to="/report-issue"
          className="w-full bg-primary-container text-white font-bold text-sm py-3 px-4 rounded-full flex justify-center items-center gap-2 hover:bg-primary-container/90 transition-all shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_circle
          </span>
          <span>Report an Issue</span>
        </Link>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-primary font-bold bg-primary-fixed'
                : 'text-on-surface-variant hover:text-secondary hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-xl">person</span>
            <span>Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span>Settings</span>
          </button>
        </div>

        <div className="pt-3 border-t border-outline-variant/60 space-y-1">
          <a
            href="#help"
            className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-base">help</span>
            <span>Help Center</span>
          </a>
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-on-surface-variant hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
