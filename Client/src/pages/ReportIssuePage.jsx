import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ReportIssuePage() {
  const navigate = useNavigate();

  // Form State
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [category, setCategory] = useState('Road Pothole');
  const [aiConfidence, setAiConfidence] = useState('96.4%');
  const [isAiDetected, setIsAiDetected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    area: 'Sector 62, Noida',
    city: 'Noida, Uttar Pradesh',
    coords: '28.6280° N, 77.3649° E',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Categories list
  const categories = [
    { name: 'Road Pothole', dept: 'Public Works Department (PWD)' },
    { name: 'Uncollected Garbage', dept: 'Sanitation & Solid Waste' },
    { name: 'Water & Sewage Leak', dept: 'Water Supply & Sewerage Board' },
    { name: 'Broken Streetlight', dept: 'Electrical & Lighting Wing' },
    { name: 'Park / Public Amenity Damage', dept: 'Horticulture & Public Works' },
  ];

  const currentDept =
    categories.find((c) => c.name === category)?.dept || 'Public Works Department (PWD)';

  // Handle Photo Upload & AI Simulation
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setIsAiDetected(true);
        setCategory('Road Pothole');
        setAiConfidence('96.8%');
        if (!description) {
          setDescription('Deep pothole on the main transit lane causing severe vehicle slowdown.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Voice recognition simulation
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTimeout(() => {
      setDescription(
        (prev) =>
          prev +
          (prev ? ' ' : '') +
          'Broken road surface with sharp edges near the tech park signal.'
      );
      setIsListening(false);
    }, 2000);
  };

  // Change location simulation
  const handleUseGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            area: 'Sector 62, Block B (Live GPS)',
            city: 'Noida, Uttar Pradesh',
            coords: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`,
          });
        },
        () => {
          setLocation({
            area: 'Sector 62, Near Metro Station',
            city: 'Noida, Uttar Pradesh',
            coords: '28.6289° N, 77.3670° E',
          });
        }
      );
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description && !photoPreview) {
      alert('Please add a photo or description of the issue.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `ND-2024-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setSubmittedTicket({
        id: ticketId,
        category,
        location: location.area,
        dept: currentDept,
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      });
    }, 1400);
  };

  return (
    <div className="bg-surface-container-low text-on-surface font-sans h-screen flex overflow-hidden antialiased">
      {/* Side Navigation Bar */}
      <nav className="hidden md:flex flex-col h-full w-64 fixed left-0 top-0 py-6 border-r bg-white border-outline-variant z-20">
        <div className="px-6 mb-6">
          <Link to="/" className="text-2xl font-black text-primary flex items-center gap-2">
            <span
              className="material-symbols-outlined text-3xl text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              visibility
            </span>
            <span>NagarDrishti</span>
          </Link>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">Citizen Dashboard</p>
        </div>

        <div className="px-4 mb-4">
          <Link
            to="/report-issue"
            className="w-full bg-primary-container text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              add
            </span>
            <span>Report an Issue</span>
          </Link>
        </div>

        <ul className="flex-1 px-3 space-y-1 overflow-y-auto">
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/report-issue"
              className="text-primary font-bold bg-primary-fixed rounded-lg flex items-center gap-3 px-4 py-2.5 translate-x-1 transition-transform text-sm"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                report_problem
              </span>
              <span>Report Issue</span>
            </Link>
          </li>
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">assignment</span>
              <span>My Reports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">map</span>
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">notifications</span>
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/citizen"
              className="text-on-surface-variant flex items-center gap-3 px-4 py-2.5 hover:text-secondary hover:bg-surface-container-high transition-all rounded-lg text-sm font-semibold group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>

        <div className="px-3 mt-auto pt-3 border-t border-outline-variant space-y-1 text-xs font-semibold">
          <a
            href="#help"
            className="text-on-surface-variant flex items-center gap-3 px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg group"
          >
            <span className="material-symbols-outlined text-base">help</span>
            <span>Help Center</span>
          </a>
          <Link
            to="/login"
            className="text-error flex items-center gap-3 px-4 py-2 hover:bg-error-container/40 transition-all rounded-lg group"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white border-b border-outline-variant flex justify-between items-center w-full px-6 lg:px-10 h-[72px] shrink-0 z-10 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Report an Issue</h2>
            <p className="text-xs text-on-surface-variant hidden sm:block">
              Help improve your city by reporting a problem with automated AI triage.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/citizen"
              className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to Dashboard</span>
            </Link>
            <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant overflow-hidden shadow-xs">
              <img
                className="w-full h-full object-cover"
                alt="Citizen avatar"
                src="/assets/citizen-avatar.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuD0c36DSiQCiXamJgWG4ZQuoiTDbXKw4TUJ90u0Gz3rQErCg5tVZ78hAkuSkvR1ITOTNBgDGA3j-TyTuzS00bCzWwlOoeZMvKAIXMMFF4otsgNWTuuJ3zAZVm4rWDudV5U_9pqVCREUAQsSB2ymaAtmk3A-BRFgf8oc5fvGxvrgbTCkQhUS1kIJ6cYacMK_xn7lMwow9BP3BdV4yzCzWP4fX3HbY7BuN44Nn6_i27fLR7y9_pR86Ig5";
                }}
              />
            </div>
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative z-0">
          <div className="max-w-3xl mx-auto w-full pb-20">
            {/* Form Container */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant shadow-sm p-6 md:p-10 space-y-8">
              
              {/* 1. Photo Section */}
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">
                  1. Add Photo or Visual Proof
                </label>
                <div className="border-2 border-dashed border-outline-variant hover:border-primary-container rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center bg-surface transition-colors relative overflow-hidden group">
                  {photoPreview ? (
                    <div className="w-full space-y-3">
                      <div className="relative max-w-md mx-auto aspect-video rounded-xl overflow-hidden shadow-sm border border-outline-variant">
                        <img src={photoPreview} alt="Uploaded Proof" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null);
                            setIsAiDetected(false);
                          }}
                          className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors cursor-pointer"
                          title="Remove Photo"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-on-surface font-semibold">{photoName}</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-fixed transition-colors">
                        <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary-container transition-colors">
                          photo_camera
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-on-surface mb-1">Add a photo</h3>
                      <p className="text-xs text-on-surface-variant mb-5">
                        Take a clear photo of the civic issue for automatic AI classification.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <label
                          htmlFor="camera-input"
                          className="bg-primary-container text-white py-2.5 px-5 rounded-xl text-xs font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <span className="material-symbols-outlined text-base">camera_alt</span>
                          <span>Take Photo</span>
                          <input
                            id="camera-input"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="sr-only"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                        <label
                          htmlFor="file-input"
                          className="bg-transparent border border-secondary text-secondary py-2.5 px-5 rounded-xl text-xs font-bold hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">upload_file</span>
                          <span>Upload Image</span>
                          <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 2. AI Category Section */}
              <div className="bg-[#f8f9fb] rounded-xl border border-outline-variant p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-secondary/15 rounded-full flex items-center justify-center shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <span>AI Suggested Category</span>
                      <span className="bg-secondary text-white text-[9px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">
                        Beta
                      </span>
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {isAiDetected
                        ? `AI Detected: ${category} with ${aiConfidence} confidence`
                        : 'Upload photo to trigger AI categorization or select below.'}
                    </p>
                  </div>
                </div>

                {/* Category Selector dropdown */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold bg-white text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Description Section */}
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">
                  2. Describe the Issue
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={300}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue, landmarks, hazard level, or traffic obstruction..."
                    className="w-full bg-white border border-outline-variant rounded-xl p-4 text-xs font-medium focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-colors resize-y"
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-on-surface-variant">
                    {description.length} / 300
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`mt-2.5 text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isListening
                      ? 'bg-red-100 text-red-600 animate-pulse'
                      : 'text-secondary hover:bg-secondary/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isListening ? 'graphic_eq' : 'mic'}
                  </span>
                  <span>{isListening ? 'Listening to speech...' : 'Describe using your voice'}</span>
                </button>
              </div>

              {/* 4. Location Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-on-surface">3. Location</label>
                  <button
                    type="button"
                    onClick={handleUseGps}
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">my_location</span>
                    <span>Use Current GPS</span>
                  </button>
                </div>
                <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col sm:flex-row shadow-xs">
                  <div className="w-full sm:w-1/3 h-32 sm:h-auto relative bg-surface-container overflow-hidden">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Noida map location"
                      src="/assets/noida-map-preview.png"
                      onError={(e) => {
                        e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBmL97uyZPO1h2vcoubDPzgybSfGEyXdgDVpCOCJpAtQefKMqRwBDJCnloLoJNEKpyxofp3rVn5W2Tl-opQ0PqR0w6AOzBk2uiXZ9G7w6fpTea0wnJwyPRKRk1asGsYHlHlHflBb98h3mNdezLubvL5MJwTOyNmcelWL4iiQBn1HsMWrNtUvkjcO_6YD9R1nK4vqDJGGCDGFIeoRY7mCx2ql2AP29H4_Jnso_hepAGkC-DEOY8VZRw";
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary-container text-xl">
                        location_on
                      </span>
                      <input
                        type="text"
                        value={location.area}
                        onChange={(e) => setLocation({ ...location, area: e.target.value })}
                        className="text-sm font-bold text-on-surface border-b border-dashed border-outline-variant focus:outline-none focus:border-primary-container w-full"
                      />
                    </div>
                    <span className="text-xs text-on-surface-variant pl-7">{location.city}</span>
                    <span className="text-[10px] font-mono text-slate-400 pl-7 mt-0.5">
                      Coordinates: {location.coords}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Municipal Authority Section */}
              <div className="bg-[#f4f5ff] rounded-xl border border-secondary/40 p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0 text-white shadow-xs">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                    Automated Municipal Dispatch Routing
                  </h4>
                  <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary-container text-lg">
                        account_balance
                      </span>
                      <span className="text-sm font-bold">Noida Municipal Corporation</span>
                    </div>
                    <div className="pl-6 text-xs text-on-surface-variant">Nagar Nigam / Urban Local Body</div>
                    <div className="pl-6 pt-1.5">
                      <span className="bg-surface-container-low text-secondary px-3 py-1 rounded-full text-xs font-bold border border-outline-variant/60 inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">architecture</span>
                        <span>{currentDept}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Submit Section */}
              <div className="pt-4 border-t border-outline-variant/60">
                <p className="text-xs text-on-surface-variant mb-5 text-center">
                  By submitting, you confirm that the information provided is accurate and authentic.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-white py-4 px-6 rounded-xl font-extrabold text-base hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5"
                >
                  <span>{isSubmitting ? 'Verifying & Dispatching with AI...' : 'Submit Report'}</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Confirmation Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 lg:p-8 shadow-2xl border border-outline-variant text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <h3 className="text-2xl font-black text-on-surface">Report Submitted!</h3>
            <p className="text-xs text-on-surface-variant">
              Your issue has been recorded on the immutable ledger and dispatched to{' '}
              <strong className="text-secondary">{submittedTicket.dept}</strong>.
            </p>

            <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/60 text-left space-y-1.5 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Ticket ID:</span>
                <span className="font-bold text-primary-container font-mono">{submittedTicket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Category:</span>
                <span className="font-bold text-on-surface">{submittedTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Location:</span>
                <span className="font-bold text-on-surface">{submittedTicket.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Blockchain Hash:</span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">{submittedTicket.txHash}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedTicket(null);
                  setDescription('');
                  setPhotoPreview(null);
                }}
                className="flex-1 py-3 px-4 border border-outline-variant rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container-high cursor-pointer transition-colors"
              >
                Report Another
              </button>
              <button
                type="button"
                onClick={() => navigate('/citizen')}
                className="flex-1 py-3 px-4 bg-primary-container text-white rounded-xl text-xs font-bold hover:bg-primary shadow-md cursor-pointer transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
