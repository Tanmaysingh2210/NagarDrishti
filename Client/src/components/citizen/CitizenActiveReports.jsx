import React from 'react';

export default function CitizenActiveReports({ reports = [], onViewDetails }) {
  const defaultReports = [
    {
      id: 'ND-2024-8912',
      title: 'Road Pothole',
      location: 'Sector 62, Noida (Near Tech Park)',
      icon: 'commute',
      priority: 'High Priority',
      priorityColor: 'bg-error/15 text-error border-error/30',
      step: 3, // 1: Reported, 2: Assigned, 3: Working, 4: Resolved
      statusText: 'In Progress',
      reportedTime: 'Reported 2 days ago',
      assignedTo: 'Public Works Department (PWD)',
    },
    {
      id: 'ND-2024-8894',
      title: 'Broken Streetlight',
      location: 'Sector 18 Commercial Market',
      icon: 'lightbulb',
      priority: 'Medium Priority',
      priorityColor: 'bg-orange-100 text-orange-700 border-orange-200',
      step: 2,
      statusText: 'Assigned to Electrical Wing',
      reportedTime: 'Reported 1 day ago',
      assignedTo: 'Noida Power & Lighting',
    },
    {
      id: 'ND-2024-8840',
      title: 'Garbage Dump Clearance',
      location: 'Sector 15 Community Park',
      icon: 'delete',
      priority: 'High Priority',
      priorityColor: 'bg-error/15 text-error border-error/30',
      step: 4,
      statusText: 'Resolved & Cleaned',
      reportedTime: 'Reported 4 days ago',
      assignedTo: 'Sanitation Dept',
    },
  ];

  const activeReportsList = reports.length > 0 ? reports : defaultReports;

  const steps = ['Reported', 'Assigned', 'Working', 'Resolved'];

  return (
    <section>
      {/* Section Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-on-surface">Active Reports</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Real-time status updates from municipal squads</p>
        </div>
        <button
          type="button"
          className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all ({activeReportsList.length})</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeReportsList.map((card, idx) => (
          <div
            key={card.id || idx}
            onClick={() => onViewDetails && onViewDetails(card)}
            className="bg-white rounded-[20px] p-5 border border-outline-variant/60 hover:border-primary-container hover:shadow-md transition-all shadow-xs relative group cursor-pointer flex flex-col justify-between"
          >
            {/* Top Row: Icon, Title, Priority */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface group-hover:bg-primary-container/10 group-hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined text-2xl">{card.icon || 'report_problem'}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface group-hover:text-primary-container transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-primary-container">location_on</span>
                      <span>{card.location}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${card.priorityColor}`}>
                  {card.priority}
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="relative pt-4 pb-4 px-1">
                {/* Background Line */}
                <div className="absolute top-6 left-3 right-3 h-0.5 bg-slate-200 -z-0"></div>
                {/* Active Line */}
                <div
                  style={{ width: `${((card.step - 1) / (steps.length - 1)) * 100}%` }}
                  className="absolute top-6 left-3 h-0.5 bg-primary-container -z-0 transition-all duration-700"
                ></div>

                <div className="flex justify-between relative z-10">
                  {steps.map((label, stepIdx) => {
                    const isCompleted = stepIdx + 1 <= card.step;
                    const isCurrent = stepIdx + 1 === card.step;

                    return (
                      <div key={label} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
                            isCompleted
                              ? 'bg-primary-container'
                              : 'bg-slate-300'
                          } ${isCurrent && card.step < 4 ? 'ring-2 ring-primary-container/40 animate-pulse' : ''}`}
                        />
                        <span
                          className={`text-[10px] ${
                            isCurrent
                              ? 'text-primary-container font-bold'
                              : 'text-on-surface-variant font-medium'
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-3 pt-3 border-t border-outline-variant/40 flex justify-between items-center text-xs">
              <span className="text-on-surface-variant font-medium">{card.reportedTime}</span>
              <span className="text-primary-container font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">
                  {card.step === 4 ? 'check_circle' : 'hourglass_top'}
                </span>
                <span>{card.statusText}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
