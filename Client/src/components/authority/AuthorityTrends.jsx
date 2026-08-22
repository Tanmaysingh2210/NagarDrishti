import React from 'react';

export default function AuthorityTrends() {
  const chartData = [
    { day: 'Mon', count: 120, height: '40%' },
    { day: 'Tue', count: 180, height: '60%' },
    { day: 'Wed', count: 240, height: '80%' },
    { day: 'Thu', count: 150, height: '50%' },
    { day: 'Fri', count: 270, height: '90%' },
    { day: 'Sat', count: 300, height: '100%', highlight: true },
    { day: 'Sun', count: 210, height: '70%' },
  ];

  const depts = [
    { name: 'Public Works (Roads & Bridges)', percent: 91, color: 'bg-green-500' },
    { name: 'Sanitation & Solid Waste', percent: 87, color: 'bg-secondary' },
    { name: 'Water Supply & Sewage', percent: 72, color: 'bg-orange-500' },
  ];

  const wards = [
    { ward: 'Ward 01 (Civil Lines)', open: 142, rate: '94%', rateColor: 'text-green-600' },
    { ward: 'Ward 02 (South Ext)', open: 89, rate: '91%', rateColor: 'text-green-600' },
    { ward: 'Ward 03 (East Market)', open: 312, rate: '78%', rateColor: 'text-orange-500', isHigh: true },
    { ward: 'Ward 04 (Industrial Area)', open: 56, rate: '98%', rateColor: 'text-green-600' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 3-Column Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: 7-Day Volume Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Issue Influx (Last 7 Days)
            </h3>
            <div className="h-32 flex items-end justify-between gap-2 pb-2 border-b border-slate-200 relative pt-6">
              {chartData.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div
                    style={{ height: d.height }}
                    className={`w-full rounded-t-md transition-all relative cursor-pointer ${
                      d.highlight ? 'bg-secondary' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xs">
                      {d.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-2 px-1">
              {chartData.map((d, idx) => (
                <span key={idx}>{d.day}</span>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 text-right">
            Weekly Peak: <strong className="text-slate-800">Saturday (300)</strong>
          </div>
        </div>

        {/* Card 2: Department SLA Compliance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-4 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Dept SLA Compliance</span>
              <span className="text-xs text-slate-400 font-normal">Target &gt; 85%</span>
            </h3>
            <div className="space-y-4">
              {depts.map((d, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-700">{d.name}</span>
                    <span className="font-extrabold text-slate-900">{d.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div className={`${d.color} h-full rounded-full`} style={{ width: `${d.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg font-medium">
            <div>Avg Ack: <strong className="text-slate-900">2.4 hrs</strong></div>
            <div>Avg SLA: <strong className="text-slate-900">2.8 days</strong></div>
          </div>
        </div>

        {/* Card 3: Ward Statistics Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-3 border-b border-slate-100 pb-2">
              Ward Performance Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500 bg-slate-50 border-y border-slate-200">
                  <tr>
                    <th className="p-2 font-bold uppercase text-[10px] tracking-wider">Ward</th>
                    <th className="p-2 font-bold uppercase text-[10px] tracking-wider text-center">Open</th>
                    <th className="p-2 font-bold uppercase text-[10px] tracking-wider text-right">Res %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {wards.map((w, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2 font-semibold text-slate-800">{w.ward}</td>
                      <td className="p-2 text-center font-mono font-bold">
                        {w.isHigh ? (
                          <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[11px]">
                            {w.open}
                          </span>
                        ) : (
                          <span className="text-slate-600">{w.open}</span>
                        )}
                      </td>
                      <td className={`p-2 text-right font-bold ${w.rateColor}`}>{w.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 text-right">
            Best Performing: <strong className="text-green-600">Ward 04 (98%)</strong>
          </div>
        </div>
      </div>

      {/* Footer System Status Bar */}
      <footer className="bg-white border border-slate-200 rounded-2xl p-4 px-6 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 shadow-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50"></span>
            <strong className="text-slate-800">System Status:</strong> Nominal (Cloud GIS Live)
          </span>
          <span className="border-l border-slate-200 pl-4 hidden sm:inline">Last Data Sync: 2 mins ago</span>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
          <span className="font-extrabold text-slate-800 text-[11px] tracking-wide uppercase">City Health Index:</span>
          <span className="flex items-center gap-1 text-green-600 font-bold">
            <span className="material-symbols-outlined text-[15px]">done_all</span> 91% Res Rate
          </span>
          <span className="border-l border-slate-300 pl-3 flex items-center gap-1 text-orange-500 font-bold">
            <span className="material-symbols-outlined text-[15px]">star</span> 4.4 / 5.0
          </span>
        </div>
      </footer>
    </div>
  );
}
