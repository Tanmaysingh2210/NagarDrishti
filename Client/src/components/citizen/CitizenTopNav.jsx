import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CitizenTopNav({ userName = "Vasu", userLocation = "Noida, Uttar Pradesh" }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-6 lg:px-10 py-3.5 flex justify-between items-center border-b border-outline-variant/40 shadow-xs">
      <div>
        <h2 className="text-xl lg:text-2xl font-extrabold text-on-surface flex items-center gap-1.5">
          Good morning, {userName} <span className="animate-bounce">👋</span>
        </h2>
        <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-0.5 font-medium">
          <span className="material-symbols-outlined text-sm text-primary-container">location_on</span>
          <span>{userLocation}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issues, locations, tickets..."
            className="pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-full text-xs w-72 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all shadow-xs"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-container rounded-full border-2 border-surface"></span>
        </button>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary-container transition-all cursor-pointer focus:outline-none"
          >
            <img
              alt="Citizen profile avatar"
              className="w-9 h-9 rounded-full object-cover border border-outline-variant shadow-xs"
              src="/assets/citizen-avatar.jpg"
              onError={(e) => {
                e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuD0c36DSiQCiXamJgWG4ZQuoiTDbXKw4TUJ90u0Gz3rQErCg5tVZ78hAkuSkvR1ITOTNBgDGA3j-TyTuzS00bCzWwlOoeZMvKAIXMMFF4otsgNWTuuJ3zAZVm4rWDudV5U_9pqVCREUAQsSB2ymaAtmk3A-BRFgf8oc5fvGxvrgbTCkQhUS1kIJ6cYacMK_xn7lMwow9BP3BdV4yzCzWP4fX3HbY7BuN44Nn6_i27fLR7y9_pR86Ig5";
              }}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-outline-variant py-2 z-50">
              <div className="px-4 py-2 border-b border-outline-variant/40">
                <p className="text-xs font-bold text-on-surface">{userName} Sharma</p>
                <p className="text-[11px] text-on-surface-variant">Verified Citizen (ID: #ND-9021)</p>
              </div>
              <Link
                to="/"
                className="block px-4 py-2 text-xs text-on-surface-variant hover:bg-surface-container-low flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">public</span>
                Public Landing Page
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
    </header>
  );
}
