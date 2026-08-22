import React, { useState } from 'react';
import AuthorityTopNav from '../components/authority/AuthorityTopNav';
import AuthoritySidebar from '../components/authority/AuthoritySidebar';
import AuthorityKpiBar from '../components/authority/AuthorityKpiBar';
import AuthorityLiveMap from '../components/authority/AuthorityLiveMap';
import AuthorityAiPriority from '../components/authority/AuthorityAiPriority';
import AuthorityTrends from '../components/authority/AuthorityTrends';

export default function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    category: 'Roads & Potholes',
    ward: 'Ward 01',
    priority: 'High',
    description: '',
  });
  const [createdToast, setCreatedToast] = useState(false);

  const handleCreateIssue = (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    setCreatedToast(true);
    setTimeout(() => setCreatedToast(false), 3500);
  };

  return (
    <div className="bg-[#f8f9fb] text-slate-900 min-h-screen flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <AuthorityTopNav onOpenCreateModal={() => setShowCreateModal(true)} />

      {/* Main Layout Body */}
      <div className="flex flex-1 max-w-[1920px] mx-auto w-full">
        {/* Sidebar */}
        <AuthoritySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dashboard Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fb]">
          {/* KPI Summary Bar */}
          <AuthorityKpiBar />

          {/* Success Toast */}
          {createdToast && (
            <div className="mx-6 mt-4 p-3 bg-green-500 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-bounce">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                New municipal ticket created &amp; dispatched to field team successfully!
              </span>
              <button onClick={() => setCreatedToast(false)} className="text-white hover:text-green-100">
                ✕
              </button>
            </div>
          )}

          {/* Main Grid Area */}
          <div className="p-6 lg:p-8 flex flex-col gap-8">
            {/* Top Split: Live Map (8 cols) + AI & Priority Queue (4 cols) */}
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-8">
                <AuthorityLiveMap />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <AuthorityAiPriority />
              </div>
            </div>

            {/* Bottom Section: Performance Charts & Ward Matrix */}
            <AuthorityTrends />
          </div>
        </main>
      </div>

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">add_circle</span>
                Create Official Civic Ticket
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Issue Title / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Major Water Pipeline Leak on Sector 15"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary-container focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Category</label>
                  <select
                    value={newIssue.category}
                    onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary-container focus:outline-none"
                  >
                    <option>Roads &amp; Potholes</option>
                    <option>Sanitation &amp; Garbage</option>
                    <option>Water &amp; Sewage</option>
                    <option>Streetlights</option>
                    <option>Public Amenities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Municipal Ward</label>
                  <select
                    value={newIssue.ward}
                    onChange={(e) => setNewIssue({ ...newIssue, ward: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary-container focus:outline-none"
                  >
                    <option>Ward 01 (Civil Lines)</option>
                    <option>Ward 02 (South Ext)</option>
                    <option>Ward 03 (East Market)</option>
                    <option>Ward 04 (Industrial)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority / SLA Target</label>
                <div className="flex gap-2">
                  {['Low (48h)', 'Medium (24h)', 'High (12h)', 'Critical (3h)'].map((pri) => (
                    <button
                      key={pri}
                      type="button"
                      onClick={() => setNewIssue({ ...newIssue, priority: pri })}
                      className={`flex-1 py-1.5 rounded-lg border text-[11px] font-bold cursor-pointer transition-all ${
                        newIssue.priority === pri
                          ? 'bg-primary-container text-white border-primary-container'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pri}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Incident Notes / Instructions</label>
                <textarea
                  rows="3"
                  placeholder="Provide precise location, landmarks, and instructions for field workman crew..."
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary-container focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container hover:bg-primary text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
