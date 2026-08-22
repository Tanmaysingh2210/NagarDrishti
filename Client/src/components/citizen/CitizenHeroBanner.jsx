import React from 'react';

export default function CitizenHeroBanner({ onOpenReportModal }) {
  return (
    <section className="bg-gradient-to-r from-primary-container/15 via-primary-container/10 to-orange-50/50 border border-primary-container/25 rounded-[24px] p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-xs">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -mb-16 w-44 h-44 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Copy & CTA */}
      <div className="z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/15 text-primary font-bold text-xs mb-3 border border-primary-container/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
          <span>Community Impact Portal</span>
        </div>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-on-surface mb-3 tracking-tight">
          See something wrong?
        </h3>
        <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
          Help improve your neighborhood by reporting civic issues like potholes, garbage, or broken streetlights directly to municipal teams in seconds.
        </p>
        <button
          type="button"
          onClick={onOpenReportModal}
          className="bg-primary-container text-white font-bold text-sm py-3.5 px-7 rounded-full flex items-center gap-2.5 hover:bg-primary transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_circle
          </span>
          <span>Report an Issue Now</span>
        </button>
      </div>

      {/* 3D City Illustration */}
      <div className="z-10 hidden md:flex items-center justify-center shrink-0">
        <img
          alt="Clean city 3D illustration"
          className="w-60 h-60 object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
          src="/assets/city-illustration.png"
          onError={(e) => {
            e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAJiOuCcBUDXmKs6mjaXs7O46kIIt1RMIUqRFR5fjjS9NxhfKgsBdBmNqYSV2BB3Z9Z0Zl5DBHzdJ3n4004APJhS-7VYU219qg5VnHF2hVL5fGYzhwT5NSFmBWL6u_2V5LZbQ4xcn9JoezQ5xIlsjEtGEYfG3voiCQoPt2Ej7VIxyRL2MHGH5xob4hzk7aAL_tVvlLnMOiO3OsV97T2tNfMD3gadGoWHnBICDtOFoaE34vISVh8VzM";
          }}
        />
      </div>
    </section>
  );
}
