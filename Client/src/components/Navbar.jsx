import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/90 backdrop-blur-md fixed top-0 w-full border-b border-outline-variant transition-all duration-300 z-[100]">
      <div className="flex justify-between items-center h-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <Link className="text-2xl font-bold text-secondary flex items-center gap-2 hover:opacity-90 transition-opacity" to="/">
          <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            assured_workload
          </span>
          <span>NagarDrishti</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-secondary font-semibold border-b-2 border-secondary pb-1 transition-colors" to="/">
            Home
          </Link>
          <a className="text-on-surface-variant hover:text-secondary transition-colors font-medium" href="/#how-it-works">
            How It Works
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors font-medium" href="/#categories">
            Features
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors font-medium" href="/#live-map">
            Live Map
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            type="button"
            aria-label="Language selector"
            className="text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-colors flex items-center justify-center p-2 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">language</span>
          </button>
          <Link className="text-secondary hover:text-secondary/80 transition-colors px-4 py-2 font-semibold" to="/login">
            Login
          </Link>
          <Link 
            className="bg-primary-container hover:bg-primary-container/90 text-white font-semibold px-6 py-2.5 rounded-card shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            to="/report-issue"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              report
            </span>
            <span>Report an Issue</span>
          </Link>
        </div>


        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link 
            className="bg-primary-container text-white font-semibold px-3 py-1.5 rounded-card text-xs flex items-center gap-1 shadow-sm"
            to="/report-issue"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              report
            </span>
            Report
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-secondary rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant px-6 py-4 space-y-3 shadow-lg">
          <Link 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-secondary font-semibold py-1.5" 
            to="/"
          >
            Home
          </Link>
          <a 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-on-surface-variant hover:text-secondary font-medium py-1.5" 
            href="/#how-it-works"
          >
            How It Works
          </a>
          <a 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-on-surface-variant hover:text-secondary font-medium py-1.5" 
            href="/#categories"
          >
            Features & Categories
          </a>
          <a 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-on-surface-variant hover:text-secondary font-medium py-1.5" 
            href="/#live-map"
          >
            Live Map
          </a>
          <div className="pt-2 border-t border-outline-variant flex items-center justify-between">
            <Link 
              onClick={() => setMobileMenuOpen(false)}
              className="text-secondary font-semibold" 
              to="/login"
            >
              Login / Portal
            </Link>
            <button className="flex items-center gap-1 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">language</span>
              <span>English / हिन्दी</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
