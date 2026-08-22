import React from 'react';

export default function AuthorityKpiBar() {
  const kpis = [
    {
      title: 'Total Issues',
      value: '12,483',
      change: '+8.4%',
      isIncrease: true,
      color: 'text-slate-900',
      tagColor: 'text-red-500 bg-red-50',
      icon: 'arrow_upward',
    },
    {
      title: 'Pending',
      value: '1,284',
      change: '-4.2%',
      isIncrease: false,
      color: 'text-slate-900',
      tagColor: 'text-green-600 bg-green-50',
      icon: 'arrow_downward',
    },
    {
      title: 'In Progress',
      value: '2,137',
      change: '+11.3%',
      isIncrease: true,
      color: 'text-secondary',
      tagColor: 'text-red-500 bg-red-50',
      icon: 'arrow_upward',
    },
    {
      title: 'Resolved',
      value: '9,062',
      change: '+14.2%',
      isIncrease: true,
      color: 'text-green-600',
      tagColor: 'text-green-600 bg-green-50',
      icon: 'arrow_upward',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 p-6 lg:p-8 flex gap-6 overflow-x-auto shrink-0 shadow-xs">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="flex-1 min-w-[140px] border-r border-slate-200 pr-6">
          <div className="text-slate-500 font-semibold text-[10px] uppercase tracking-widest mb-1.5">
            {kpi.title}
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className={`text-3xl lg:text-4xl font-extrabold tracking-tight ${kpi.color}`}>
              {kpi.value}
            </span>
            <span className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded-md ${kpi.tagColor}`}>
              <span className="material-symbols-outlined text-[13px] mr-0.5">{kpi.icon}</span>
              {kpi.change}
            </span>
          </div>
        </div>
      ))}

      {/* Critical Highlight Card */}
      <div className="flex-1 min-w-[150px] bg-red-50 rounded-xl p-4 border border-red-100 flex flex-col justify-center shadow-xs">
        <div className="text-red-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 mb-1">
          <span className="material-symbols-outlined text-sm">warning</span>
          <span>Critical</span>
        </div>
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-red-600">47</span>
          <span className="text-red-700 font-extrabold text-xs uppercase tracking-wide bg-red-100/80 px-2 py-0.5 rounded-md">
            Urgent SLA
          </span>
        </div>
      </div>
    </div>
  );
}
