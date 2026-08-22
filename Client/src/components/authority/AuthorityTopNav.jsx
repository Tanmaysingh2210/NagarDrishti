import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthorityTopNav({ onOpenCreateModal }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white flex justify-between items-center w-full px-6 lg:px-10 h-16 border-b border-slate-200 shrink-0 z-50 sticky top-0 shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold text-secondary tracking-tight flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance
          </span>
          <span>Municipal Command Center</span>
        </Link>
        <span className="text-slate-400 text-xs font-semibold ml-2 border-l border-slate-200 pl-3 hidden sm:inline-block">
          NagarDrishti
        </span>
      </div>

      {/* Universal Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 transition-colors group-focus-within:text-primary-container text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Universal Search (Issues, Wards, Assets, Depts)..."
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-xs focus:bg-white focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenCreateModal}
          className="bg-primary-container text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-primary-container/90 transition-all shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Create Issue</span>
        </button>

        <div className="flex items-center gap-2 text-slate-500 border-l border-slate-200 pl-4">
          <button
            type="button"
            className="p-2 hover:bg-slate-50 hover:text-slate-800 rounded-full transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>

          <button
            type="button"
            className="p-2 hover:bg-slate-50 hover:text-slate-800 rounded-full transition-colors cursor-pointer hidden sm:flex"
            title="Settings"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-all cursor-pointer focus:outline-none"
            >
              <img
                alt="Chief Operational Officer Profile"
                className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-xs"
                src="/assets/officer-avatar.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAslzfodyFyCiVq5gDHfYiYySgQ6BjRw9dXbKTC-6qxirLdVK5Sw0rSxPCGp3qOzXwSV2sd8umlufznJQzrx8_sFpykWMqywIP8Kvz1DyKO8HyzpXHnvklgSbRUrrcb5VC161jz4yJ2ZqCxGvUzjRvXxaCDLbG7L33ei8yWe34ghwscV1FacRZDpyAtQUdyz00gKitZycrKgAE5Pl_Vh8A2KMTAIZSZsxlqtG31_CB7JG8RBSlTYUxq";
                }}
              />
              <span className="material-symbols-outlined text-base text-slate-400">expand_more</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">Dr. Rajesh Varma</p>
                  <p className="text-[11px] text-slate-500">Chief Municipal Officer</p>
                </div>
                <Link
                  to="/"
                  className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-slate-400">public</span>
                  Public Citizen Portal
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-xs text-error hover:bg-red-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
