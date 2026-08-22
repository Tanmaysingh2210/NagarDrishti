import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthoritySidebar({ activeTab, setActiveTab }) {
  const navSections = [
    {
      title: 'Operations',
      items: [
        { id: 'overview', label: 'Overview', icon: 'dashboard' },
        { id: 'live-issues', label: 'Live Issues', icon: 'assignment_late', badge: '47' },
        { id: 'all-issues', label: 'All Issues', icon: 'list_alt' },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        { id: 'ai-insights', label: 'AI Insights', icon: 'psychology' },
        { id: 'hotspots', label: 'Hotspots', icon: 'local_fire_department' },
      ],
    },
    {
      title: 'Infrastructure',
      items: [
        { id: 'analytics', label: 'Analytics', icon: 'query_stats' },
        { id: 'critical-infra', label: 'Critical Infrastructure', icon: 'domain' },
        { id: 'public-safety', label: 'Public Safety', icon: 'security' },
      ],
    },
  ];

  return (
    <nav className="bg-white border-r border-slate-200 w-64 flex flex-col py-6 px-4 shrink-0 hidden md:flex sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      {/* Unit header */}
      <div className="mb-6 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-secondary/20 shrink-0">
          <span className="material-symbols-outlined text-2xl">account_balance</span>
        </div>
        <div>
          <h2 className="font-bold text-slate-900 text-xs tracking-wide">Command Center</h2>
          <p className="text-[10px] text-slate-500">City Intelligence Unit</p>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 flex flex-col gap-1">
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    type="button"
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-50 text-primary-container font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dispatch & Logout */}
      <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => alert('🚨 Emergency Dispatch protocol initiated! Alerting local QRT and Fire/Police control.')}
          className="w-full bg-red-50 text-red-600 font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">emergency</span>
          <span>Emergency Dispatch</span>
        </button>

        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            System Live
          </span>
          <Link to="/login" className="hover:text-error transition-colors flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-sm">logout</span>
            Exit
          </Link>
        </div>
      </div>
    </nav>
  );
}
