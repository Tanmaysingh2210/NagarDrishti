import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="py-24 bg-surface grid-pattern relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <span className="text-sm font-bold text-primary-container uppercase tracking-widest block mb-3">
          Get Started In Seconds
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 leading-tight">
          Be the Change. Report Today.
        </h2>
        <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of citizens actively improving their communities. Download the mobile app or start reporting online instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/report-issue"
            className="bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-lg px-8 py-4 rounded-card shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              campaign
            </span>
            <span>Start Reporting</span>
          </Link>
          <a 
            href="#download"
            className="bg-white border-2 border-secondary text-secondary hover:bg-secondary/5 font-semibold text-lg px-8 py-4 rounded-card transition-all flex justify-center items-center gap-2 shadow-xs hover:shadow-sm transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined">download</span>
            <span>Download App</span>
          </a>
        </div>
      </div>
    </section>
  );
}

