import React from 'react';

const categories = [
  {
    icon: "add_road",
    title: "Roads & Potholes",
    description: "Damaged roads, open manholes.",
    colorTheme: "secondary",
  },
  {
    icon: "delete",
    title: "Waste & Garbage",
    description: "Uncollected trash, illegal dumping.",
    colorTheme: "primary",
  },
  {
    icon: "water_drop",
    title: "Water & Sewage",
    description: "Leaks, contamination, blockages.",
    colorTheme: "success",
  },
  {
    icon: "lightbulb",
    title: "Streetlights",
    description: "Broken or non-functioning lights.",
    colorTheme: "secondary",
  },
  {
    icon: "park",
    title: "Public Amenities",
    description: "Parks, benches, public toilets.",
    colorTheme: "primary",
  },
];

export default function ProblemGrid() {
  const getIconContainerStyle = (theme) => {
    switch (theme) {
      case 'primary':
        return 'bg-primary-container/10 text-primary-container group-hover:bg-primary-container/20';
      case 'success':
        return 'bg-success/10 text-success group-hover:bg-success/20';
      case 'secondary':
      default:
        return 'bg-secondary/10 text-secondary group-hover:bg-secondary/20';
    }
  };

  return (
    <section id="categories" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary-container uppercase tracking-widest block mb-2">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            What Can You Report?
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            NagarDrishti handles a wide range of civic issues, automatically routing them to the correct municipal department.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-surface-container-low border border-outline-variant/60 hover:border-outline-variant rounded-card p-6 text-center shadow-xs hover:shadow-card-hover transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${getIconContainerStyle(cat.colorTheme)}`}
              >
                <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-on-surface text-lg mb-2 group-hover:text-secondary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
