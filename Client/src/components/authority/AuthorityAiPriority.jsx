import React, { useState } from 'react';

export default function AuthorityAiPriority() {
  const [dispatched, setDispatched] = useState(false);

  const priorityQueue = [
    {
      id: '8842',
      title: 'Open Drain Hazard',
      sla: '3h SLA',
      location: 'Sector 15 • 23 linked reports',
      dept: 'Sanitation',
      severity: 'border-l-error text-error',
      badgeBg: 'bg-error text-white',
    },
    {
      id: '8850',
      title: 'Major Pothole cluster',
      sla: '12h SLA',
      location: 'Sector 62 Main Road',
      dept: 'Public Works',
      severity: 'border-l-orange-500 text-orange-600',
      badgeBg: 'bg-orange-500 text-white',
    },
    {
      id: '8861',
      title: 'Uncollected Garbage Dump',
      sla: '24h SLA',
      location: 'Sector 18 Commercial Market',
      dept: 'Sanitation',
      severity: 'border-l-orange-500 text-orange-600',
      badgeBg: 'bg-orange-500 text-white',
    },
    {
      id: '8875',
      title: 'Burst Water Pipeline',
      sla: '4h SLA',
      location: 'Civil Lines Ward 04',
      dept: 'Water & Sewage',
      severity: 'border-l-error text-error',
      badgeBg: 'bg-error text-white',
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* AI Intelligence Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <span>AI Intelligence Engine</span>
        </h3>

        {/* Hotspot Alert */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <div className="font-bold text-[10px] text-red-600 uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">warning_amber</span>
              <span>Emerging Hotspot</span>
            </div>
            <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-extrabold shadow-xs">
              +340% SURGE
            </span>
          </div>
          <div className="font-bold text-slate-900 text-sm mb-1">Sector 62 Waterlogging</div>
          <p className="text-xs text-slate-600 mb-3">43 new citizen reports clustered in last 2 hours.</p>
          <button
            type="button"
            onClick={() => {
              setDispatched(true);
              setTimeout(() => setDispatched(false), 3000);
            }}
            className={`w-full font-bold text-xs py-2 rounded-lg border transition-all cursor-pointer ${
              dispatched
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {dispatched ? '✓ PWD Quick Response Team Dispatched' : 'Dispatch Public Works'}
          </button>
        </div>

        {/* Issue Consolidation */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="font-bold text-[10px] text-secondary uppercase tracking-widest flex items-center gap-1 mb-1.5">
            <span className="material-symbols-outlined text-sm">join_inner</span>
            <span>Issue Consolidation</span>
          </div>
          <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
            7 duplicates detected (94% similarity) regarding "Broken Streetlight on MG Road".
          </p>
          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-mono text-slate-500 font-semibold">ISSUE #1024</span>
            <span className="text-[10px] font-bold text-secondary bg-blue-50 px-2 py-0.5 rounded">
              Consolidated (7x Weight)
            </span>
          </div>
        </div>
      </div>

      {/* Priority Queue Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex-1 flex flex-col shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">assignment_late</span>
            <span>Priority SLA Queue</span>
          </h3>
          <span className="text-xs text-primary-container font-bold cursor-pointer hover:underline">
            View All ({priorityQueue.length})
          </span>
        </div>

        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[300px] pr-1">
          {priorityQueue.map((item) => (
            <div
              key={item.id}
              className={`p-3 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer border-l-4 ${item.severity} bg-white`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-xs text-slate-900">{item.title}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${item.badgeBg}`}>
                  {item.sla}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mb-2">{item.location}</div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-slate-600">
                  #ID-{item.id}
                </span>
                <span className="text-[9px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-600">
                  {item.dept}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
