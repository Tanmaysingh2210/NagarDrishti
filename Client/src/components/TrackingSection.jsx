import React from 'react';

export default function TrackingSection() {
  return (
    <section id="live-map" className="py-24 bg-secondary text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs md:text-sm font-semibold text-primary-fixed-dim uppercase tracking-widest block mb-2">Live Lifecycle</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Track Progress Like a Delivery
        </h2>

        {/* Card */}
        <div className="bg-white rounded-card p-6 md:p-10 shadow-2xl text-left border border-white/20">
          {/* Header of Ticket */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-outline-variant/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-on-surface font-extrabold text-lg md:text-xl">Ticket #ND-2024-8912</span>
                <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2 py-0.5 rounded-full">Roads &amp; Traffic</span>
              </div>
              <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary-container">pin_drop</span>
                Pothole on Main St. &amp; 5th Ave (Ward 14)
              </p>
            </div>
            <span className="bg-success/10 text-success px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold border border-success/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
              In Progress
            </span>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col md:flex-row justify-between w-full mt-6 mb-4">
            {/* Base Background Track Line */}
            <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-outline-variant/40 -z-0"></div>
            {/* Active Progress Track Line */}
            <div className="hidden md:block absolute top-4 left-0 w-2/3 h-0.5 bg-success -z-0 transition-all duration-1000"></div>

            {/* Vertical Line on Mobile */}
            <div className="md:hidden absolute top-4 bottom-4 left-4 w-0.5 bg-outline-variant/40 -z-0"></div>
            <div className="md:hidden absolute top-4 h-2/3 left-4 w-0.5 bg-success -z-0"></div>

            {/* Step 1: Submitted */}
            <div className="flex md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 relative z-10 pl-12 md:pl-0">
              <div className="absolute left-0 md:static w-8 h-8 rounded-full bg-success text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <div className="md:text-center">
                <div className="text-on-surface font-bold text-sm">Submitted</div>
                <div className="text-on-surface-variant text-xs">Oct 24, 09:00 AM</div>
              </div>
            </div>

            {/* Step 2: Verified by AI */}
            <div className="flex md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 relative z-10 pl-12 md:pl-0">
              <div className="absolute left-0 md:static w-8 h-8 rounded-full bg-success text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <div className="md:text-center">
                <div className="text-on-surface font-bold text-sm">Verified by AI</div>
                <div className="text-on-surface-variant text-xs">Oct 24, 09:02 AM</div>
              </div>
            </div>

            {/* Step 3: Assigned (PWD) - Current Active */}
            <div className="flex md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 relative z-10 pl-12 md:pl-0">
              <div className="absolute left-0 md:static w-8 h-8 rounded-full bg-surface border-2 border-success text-success flex items-center justify-center shadow-sm shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-success animate-ping"></div>
              </div>
              <div className="md:text-center">
                <div className="text-on-surface font-bold text-sm">Assigned (PWD)</div>
                <div className="text-on-surface-variant text-xs">Oct 25, 10:15 AM</div>
              </div>
            </div>

            {/* Step 4: Resolved */}
            <div className="flex md:flex-col items-center gap-4 md:gap-2 relative z-10 pl-12 md:pl-0">
              <div className="absolute left-0 md:static w-8 h-8 rounded-full bg-surface border-2 border-outline-variant/60 text-outline-variant flex items-center justify-center shadow-sm shrink-0">
                <span className="w-2 h-2 rounded-full bg-outline-variant/40"></span>
              </div>
              <div className="md:text-center">
                <div className="text-on-surface-variant font-bold text-sm">Resolved</div>
                <div className="text-outline-variant text-xs">Pending Inspection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
