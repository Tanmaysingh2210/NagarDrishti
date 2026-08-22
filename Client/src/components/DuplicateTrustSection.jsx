import React from 'react';

export default function DuplicateTrustSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <span className="text-sm font-bold text-secondary uppercase tracking-widest block mb-2">Transparency & Efficiency</span>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Smart Consolidation &amp; Trust
        </h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          We streamline reporting to avoid municipal overload while ensuring every complaint is transparently and securely recorded.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Duplicate Detection Card */}
        <div className="bg-surface-container-low border border-outline-variant/70 rounded-card p-8 shadow-card flex flex-col items-center text-center hover:shadow-card-hover transition-all">
          <div className="bg-white p-4 rounded-full border border-outline-variant shadow-sm mb-6 inline-flex text-secondary">
            <span className="material-symbols-outlined text-4xl">merge_type</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-3">One Issue, Many Citizens</h3>
          <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
            Our system detects identical issues reported by multiple people and clusters them into a single high-priority ticket, adding weight to the complaint instead of spamming officials.
          </p>
          
          {/* Visual flow */}
          <div className="mt-auto pt-4 flex flex-wrap items-center justify-center gap-2 w-full">
            <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xs font-bold border border-secondary/30">
              R1
            </div>
            <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xs font-bold border border-secondary/30">
              R2
            </div>
            <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xs font-bold border border-secondary/30">
              R3
            </div>
            <span className="material-symbols-outlined text-on-surface-variant mx-1">arrow_forward</span>
            <div className="px-3.5 py-2 bg-primary-container text-white rounded-card text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">priority_high</span>
              <span>High Priority Ticket</span>
            </div>
          </div>
        </div>

        {/* Blockchain Audit Card */}
        <div className="bg-surface-container-low border border-outline-variant/70 rounded-card p-8 shadow-card flex flex-col items-center text-center hover:shadow-card-hover transition-all">
          <div className="bg-white p-4 rounded-full border border-outline-variant shadow-sm mb-6 inline-flex text-success">
            <span className="material-symbols-outlined text-4xl">verified_user</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-3">Your Complaint. Your Proof.</h3>
          <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
            Every submitted report generates an immutable cryptographic hash. This creates a verifiable public audit trail, ensuring complaints cannot be quietly closed or altered.
          </p>

          {/* Blockchain Hash Box */}
          <div className="mt-auto pt-4 w-full bg-white border border-outline-variant rounded-card p-3 font-mono text-xs text-on-surface-variant flex items-center justify-between shadow-xs">
            <span className="truncate">TX: 0x8f2a9e...4c931b</span>
            <span className="text-success font-semibold flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-sm">lock</span>
              Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
