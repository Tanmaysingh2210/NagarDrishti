import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-16 border-t border-outline-variant/60 z-[10]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Brand info */}
        <div className="flex flex-col gap-4">
          <a className="text-xl font-bold text-secondary flex items-center gap-2" href="#">
            <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              assured_workload
            </span>
            <span>NagarDrishti Platform</span>
          </a>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            © 2024 NagarDrishti Platform. An Initiative for Digital Governance, Smart Civic Infrastructure, and Citizen Empowerment.
          </p>
          <div className="flex gap-4 mt-2">
            <span className="material-symbols-outlined text-secondary/60 hover:text-secondary cursor-pointer transition-colors" title="Verified Security">
              verified_user
            </span>
            <span className="material-symbols-outlined text-secondary/60 hover:text-secondary cursor-pointer transition-colors" title="Data Privacy Shield">
              shield
            </span>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 uppercase text-xs tracking-wider">
            Legal &amp; Governance
          </h4>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#privacy">
            Privacy Policy
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#terms">
            Terms of Service
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#citizen-charter">
            Citizen Charter
          </a>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 uppercase text-xs tracking-wider">
            Resources &amp; Devs
          </h4>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#api">
            API Documentation
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#portal">
            Municipal Admin Portal
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#open-data">
            Open Civic Data
          </a>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 uppercase text-xs tracking-wider">
            Support &amp; Contact
          </h4>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#help">
            Help Center &amp; FAQs
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#contact">
            Contact Support
          </a>
          <a className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#ward-directory">
            Ward Directory
          </a>
        </div>
      </div>
    </footer>
  );
}
