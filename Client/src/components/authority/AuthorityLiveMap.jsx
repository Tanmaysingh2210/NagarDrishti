import React, { useState } from 'react';

export default function AuthorityLiveMap() {
  const [mapMode, setMapMode] = useState('clusters'); // 'heatmap' | 'clusters' | 'satellite'
  const [activePin, setActivePin] = useState(null);

  const pins = [
    {
      id: 1,
      top: '30%',
      left: '42%',
      type: 'critical',
      title: 'Open Drain Hazard',
      location: 'Sector 15, Ring Road',
      reports: 23,
      sla: '3 Hours Left',
      color: 'bg-error',
    },
    {
      id: 2,
      top: '62%',
      left: '24%',
      type: 'high',
      title: 'Waterlogging & Potholes',
      location: 'Sector 62 Main Crossing',
      reports: 14,
      sla: '12 Hours Left',
      color: 'bg-orange-500',
    },
    {
      id: 3,
      top: '25%',
      left: '72%',
      type: 'cluster',
      title: 'Sector 18 Market Cluster',
      location: 'Commercial Block C',
      reports: 38,
      sla: 'Assigned to Sanitation',
      color: 'bg-green-500',
    },
    {
      id: 4,
      top: '48%',
      left: '58%',
      type: 'high',
      title: 'Faulty High-Mast Light',
      location: 'Central Plaza Junction',
      reports: 8,
      sla: '24 Hours Left',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col relative h-[560px] shadow-sm">
      {/* Map Controls Header */}
      <div className="px-6 py-3.5 border-b border-slate-200 flex justify-between items-center bg-white/95 backdrop-blur-md z-10">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">map</span>
          <span>Live City Map (Delhi NCR Grid)</span>
        </h3>

        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
          {['heatmap', 'clusters', 'satellite'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMapMode(mode)}
              className={`px-3 py-1 text-xs capitalize transition-all rounded-md cursor-pointer ${
                mapMode === mode
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Map Canvas */}
      <div
        className={`flex-1 relative w-full h-full overflow-hidden transition-all ${
          mapMode === 'satellite'
            ? 'bg-slate-800'
            : mapMode === 'heatmap'
            ? 'bg-orange-50/40'
            : 'bg-slate-50'
        }`}
        style={{
          backgroundImage:
            mapMode === 'satellite'
              ? 'radial-gradient(#334155 1px, transparent 1px)'
              : 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Subtle City Road Grids */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none stroke-slate-400">
          <line x1="10%" y1="20%" x2="90%" y2="80%" strokeWidth="4" />
          <line x1="20%" y1="90%" x2="80%" y2="10%" strokeWidth="3" />
          <circle cx="50%" cy="50%" r="180" fill="none" strokeWidth="2" strokeDasharray="6,6" />
          <rect x="35%" y="25%" width="30%" height="45%" fill="none" strokeWidth="2" />
        </svg>

        {/* Heatmap Layer if active */}
        {mapMode === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-red-500/20 via-orange-400/10 to-transparent blur-2xl"></div>
        )}

        {/* Interactive Map Pins */}
        {pins.map((pin) => (
          <div
            key={pin.id}
            style={{ top: pin.top, left: pin.left }}
            className="absolute flex flex-col items-center group cursor-pointer z-20"
            onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
          >
            {/* Animated Pin Marker */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                  pin.color
                } ${pin.type === 'critical' ? 'animate-pulse' : ''}`}
              />
              <span className="absolute -top-2 -right-2 bg-white text-slate-800 font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-slate-200">
                {pin.reports}
              </span>
            </div>

            {/* Tooltip Card (Shown on hover or active click) */}
            <div
              className={`absolute top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-3.5 rounded-xl shadow-xl w-60 z-30 transition-all ${
                activePin === pin.id ? 'block' : 'hidden group-hover:block'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                    pin.type === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {pin.type.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{pin.sla}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">{pin.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{pin.location}</p>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                <span className="font-semibold text-secondary">ID: #TKT-{pin.id}042</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Quick dispatching unit to ${pin.location}`);
                  }}
                  className="bg-primary-container text-white px-2 py-0.5 rounded font-bold hover:bg-primary transition-colors"
                >
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Glassmorphism Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 flex flex-col gap-2 text-xs font-semibold text-slate-700 shadow-md z-20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-error rounded-full shadow-xs"></div>
          <span>Critical SLA (47)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full shadow-xs"></div>
          <span>High Priority (312)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-xs"></div>
          <span>Resolved / Normal (800+)</span>
        </div>
      </div>
    </div>
  );
}
