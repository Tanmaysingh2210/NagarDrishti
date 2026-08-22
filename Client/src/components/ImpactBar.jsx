import React from 'react';

export default function ImpactBar() {
  const stats = [
    { value: "12K+", label: "Issues Reported", highlight: false },
    { value: "9K+", label: "Issues Resolved", highlight: false },
    { value: "94%", label: "Resolution Rate", highlight: true },
    { value: "50K+", label: "Active Citizens", highlight: false },
  ];

  return (
    <section className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center px-4 ${idx > 1 ? 'pt-6 md:pt-0' : ''}`}>
              <span className={`text-4xl md:text-5xl font-bold mb-2 ${stat.highlight ? 'text-primary-container' : 'text-white'}`}>
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-medium text-white/80 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
