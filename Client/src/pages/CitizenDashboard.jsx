import React, { useState } from 'react';
import CitizenSidebar from '../components/citizen/CitizenSidebar';
import CitizenTopNav from '../components/citizen/CitizenTopNav';
import CitizenHeroBanner from '../components/citizen/CitizenHeroBanner';
import CitizenActiveReports from '../components/citizen/CitizenActiveReports';

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Initial user reports list
  const [reports, setReports] = useState([
    {
      id: 'ND-2024-8912',
      title: 'Road Pothole',
      location: 'Sector 62, Noida (Near Tech Park)',
      icon: 'commute',
      priority: 'High Priority',
      priorityColor: 'bg-error/15 text-error border-error/30',
      step: 3,
      statusText: 'In Progress',
      reportedTime: 'Reported 2 days ago',
      assignedTo: 'Public Works Department (PWD)',
      txHash: '0x8f2a9e4c931ba6721ef932bce1',
    },
    {
      id: 'ND-2024-8894',
      title: 'Broken High-Mast Streetlight',
      location: 'Sector 18 Commercial Market',
      icon: 'lightbulb',
      priority: 'Medium Priority',
      priorityColor: 'bg-orange-100 text-orange-700 border-orange-200',
      step: 2,
      statusText: 'Assigned to Electrical Wing',
      reportedTime: 'Reported 1 day ago',
      assignedTo: 'Noida Power & Lighting',
      txHash: '0x4d1b8830fac9801ec2994bb10',
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
      txHash: '0x33e8992a101fcd4703bca0199',
    },
  ]);

  // Form state for new report
  const [newReport, setNewReport] = useState({
    title: '',
    category: 'Roads & Potholes',
    location: 'Sector 62, Noida',
    description: '',
    photoPreview: null,
    aiDetected: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReport((prev) => ({
          ...prev,
          photoPreview: reader.result,
          aiDetected: 'AI Vision Analysis: Road Hazard / Pothole (96.4% confidence)',
          title: prev.title || 'Road Pothole Hazard',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const createdItem = {
        id: `ND-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        title: newReport.title || 'Civic Complaint',
        location: newReport.location || 'Noida, UP',
        icon:
          newReport.category === 'Roads & Potholes'
            ? 'commute'
            : newReport.category === 'Waste & Garbage'
            ? 'delete'
            : newReport.category === 'Streetlights'
            ? 'lightbulb'
            : 'report_problem',
        priority: 'High Priority',
        priorityColor: 'bg-error/15 text-error border-error/30',
        step: 1, // Reported
        statusText: 'Submitted to AI Verification',
        reportedTime: 'Just now',
        assignedTo: 'Routing to Ward Squad...',
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      };

      setReports([createdItem, ...reports]);
      setIsSubmitting(false);
      setShowReportModal(false);
      setSuccessToast(`Report #${createdItem.id} logged! AI is routing to municipal authorities.`);
      setNewReport({
        title: '',
        category: 'Roads & Potholes',
        location: 'Sector 62, Noida',
        description: '',
        photoPreview: null,
        aiDetected: '',
      });

      setTimeout(() => setSuccessToast(''), 4500);
    }, 1000);
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen flex antialiased font-sans text-on-surface">
      {/* Side Navigation */}
      <CitizenSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setShowReportModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 bg-[#f8f9fb] min-h-screen flex flex-col overflow-y-auto">
        {/* Top Header */}
        <CitizenTopNav userName="Vasu" userLocation="Noida, Uttar Pradesh" />

        {/* Toast Alert */}
        {successToast && (
          <div className="mx-6 lg:mx-10 mt-4 p-4 bg-green-600 text-white rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">verified</span>
              <span>{successToast}</span>
            </span>
            <button onClick={() => setSuccessToast('')} className="text-white hover:text-green-100 font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Body */}
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full pb-24">
          {/* Hero Banner */}
          <CitizenHeroBanner onOpenReportModal={() => setShowReportModal(true)} />

          {/* Active Reports Grid */}
          <CitizenActiveReports
            reports={reports}
            onViewDetails={(ticket) => setSelectedTicket(ticket)}
          />
        </div>
      </main>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl border border-outline-variant animate-in zoom-in-95 duration-150 my-auto">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary-container/15 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-xl">campaign</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-on-surface">Report Civic Issue</h3>
                  <p className="text-xs text-on-surface-variant">Fast, geotagged &amp; AI-routed</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 mt-5 text-xs">
              {/* Photo Upload with AI Simulator */}
              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Upload Photo of Issue
                </label>
                <div className="border-2 border-dashed border-outline-variant hover:border-primary-container rounded-2xl p-4 text-center bg-surface-container-low transition-colors cursor-pointer relative overflow-hidden">
                  {newReport.photoPreview ? (
                    <div className="space-y-2">
                      <img
                        src={newReport.photoPreview}
                        alt="Issue Upload Preview"
                        className="h-36 w-full object-cover rounded-xl shadow-xs"
                      />
                      <p className="text-[11px] text-success font-bold flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                        {newReport.aiDetected}
                      </p>
                    </div>
                  ) : (
                    <label htmlFor="modal-photo" className="cursor-pointer block py-3 space-y-1">
                      <span className="material-symbols-outlined text-3xl text-primary-container">
                        add_a_photo
                      </span>
                      <p className="text-xs font-semibold text-on-surface">
                        Click to take photo or upload image
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        Our AI instantly identifies category and severity
                      </p>
                    </label>
                  )}
                  <input
                    id="modal-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>

              {/* Title / Headline */}
              <div>
                <label className="block font-bold text-on-surface mb-1">Issue Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Pothole outside Tech Park Gate 2"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl text-xs focus:ring-2 focus:ring-primary-container focus:outline-none bg-white text-on-surface"
                />
              </div>

              {/* Category & Ward */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Category</label>
                  <select
                    value={newReport.category}
                    onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                    className="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs focus:ring-2 focus:ring-primary-container focus:outline-none bg-white"
                  >
                    <option>Roads &amp; Potholes</option>
                    <option>Waste &amp; Garbage</option>
                    <option>Water &amp; Sewage</option>
                    <option>Streetlights</option>
                    <option>Public Amenities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Location / Landmark</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sector 62, Noida"
                    value={newReport.location}
                    onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                    className="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs focus:ring-2 focus:ring-primary-container focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-on-surface mb-1">Description (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Add any extra details (nearby shops, hazards, urgency)..."
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-outline-variant rounded-xl text-xs focus:ring-2 focus:ring-primary-container focus:outline-none bg-white"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2.5 border border-outline-variant rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-high cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary-container hover:bg-primary text-white rounded-xl font-bold shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>{isSubmitting ? 'Transmitting to AI...' : 'Submit Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-outline-variant animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex justify-between items-start border-b border-outline-variant/40 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">
                  {selectedTicket.id}
                </span>
                <h3 className="font-extrabold text-base text-on-surface mt-1">{selectedTicket.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-on-surface-variant hover:text-on-surface font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Location:</span>
                <span className="font-bold text-on-surface">{selectedTicket.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Assigned Department:</span>
                <span className="font-bold text-secondary">{selectedTicket.assignedTo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Current Status:</span>
                <span className="font-bold text-success">{selectedTicket.statusText}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Blockchain Proof:</span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">{selectedTicket.txHash}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="w-full py-2.5 bg-secondary text-white font-bold rounded-xl text-xs hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
