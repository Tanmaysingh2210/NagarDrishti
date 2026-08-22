import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    aadhaar: '',
    phone: '9876543210',
    email: '',
    termsAccepted: false,
    consentAccepted: false,
  });

  const [showAadhaar, setShowAadhaar] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSendOtp = () => {
    if (!formData.aadhaar) {
      alert('Please enter your Aadhaar / Citizen ID number first');
      return;
    }
    setOtpSent(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted || !formData.consentAccepted) {
      alert('Please accept the Terms of Service and Verification Consent');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        navigate('/citizen');
      }, 1400);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-on-surface antialiased bg-[#F1F3F5] selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Simplified Top Header */}
      <header className="bg-surface/90 backdrop-blur-md fixed top-0 w-full border-b border-outline-variant z-[100]">
        <div className="flex justify-between items-center h-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="material-symbols-outlined text-primary-container text-3xl group-hover:scale-105 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="text-xl font-bold text-primary-container">NagarDrishti</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-1 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Return to Portal</span>
            </Link>
            <button
              type="button"
              className="text-on-surface-variant hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-high"
              aria-label="Change Language"
            >
              <span className="material-symbols-outlined text-xl">language</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
        <div className="w-full max-w-5xl bg-white rounded-card shadow-[0px_4px_12px_rgba(47,54,237,0.08)] border border-outline-variant overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel (Visual/Trust) */}
          <div className="lg:w-2/5 bg-secondary text-white p-8 lg:p-10 flex flex-col relative overflow-hidden">
            {/* Decorative Pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Government Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full w-fit mb-6 border border-white/20">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Official Government Civic Portal
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold mb-8 leading-tight">
                Join Your Local<br />Civic Community
              </h1>

              {/* Value propositions */}
              <ul className="space-y-6 flex-grow">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">how_to_reg</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Instant Verification</h3>
                    <p className="text-xs text-secondary-fixed leading-relaxed">
                      Link your official ID for immediate access to municipal civic services and live tracking.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">lock</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Data Encryption</h3>
                    <p className="text-xs text-secondary-fixed leading-relaxed">
                      Military-grade security ensuring your personal information and identities remain confidential.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">assignment_turned_in</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Direct Municipal Action</h3>
                    <p className="text-xs text-secondary-fixed leading-relaxed">
                      Your reports bypass middlemen and route straight to the responsible ward officials.
                    </p>
                  </div>
                </li>
              </ul>

              {/* Encrypted compliance box */}
              <div className="mt-8 bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-md flex items-center gap-4">
                <span
                  className="material-symbols-outlined text-3xl text-white shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  enhanced_encryption
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Your Privacy &amp; Data Are Encrypted</p>
                  <p className="text-[11px] text-secondary-fixed">Compliant with National Digital Standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <div className="lg:w-3/5 p-8 lg:p-12 bg-white">
            <div className="mb-8 border-b border-outline-variant pb-6">
              <h2 className="text-2xl font-bold text-on-surface mb-2">Create Citizen Account</h2>
              <p className="text-sm text-on-surface-variant">
                Enter your details to verify your identity and start reporting civic issues in your municipality.
              </p>
            </div>

            {successMessage ? (
              <div className="bg-success/10 border border-success/30 text-success p-6 rounded-card text-center space-y-2">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <h3 className="font-bold text-lg">{successMessage}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5" htmlFor="fullName">
                    Full Name (as per Official ID)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-xl">person</span>
                    </div>
                    <input
                      className="block w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-md bg-white text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                      id="fullName"
                      name="fullName"
                      placeholder="First Middle Last Name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="mt-1 text-xs text-on-surface-variant">Must exactly match your government-issued ID.</p>
                </div>

                {/* Field 2: Aadhaar / Citizen ID */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5" htmlFor="aadhaar">
                    Aadhaar / Government Citizen ID
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-xl">badge</span>
                      </div>
                      <input
                        className="block w-full pl-10 pr-10 py-2.5 border border-outline-variant rounded-md bg-white text-on-surface placeholder:text-outline text-sm tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                        id="aadhaar"
                        name="aadhaar"
                        placeholder="XXXX-XXXX-XXXX"
                        type={showAadhaar ? 'text' : 'password'}
                        required
                        value={formData.aadhaar}
                        onChange={handleChange}
                      />
                      <button
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-primary-container transition-colors cursor-pointer"
                        type="button"
                        onClick={() => setShowAadhaar(!showAadhaar)}
                        aria-label="Toggle mask"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showAadhaar ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>

                    <button
                      className={`px-4 py-2.5 border rounded-md text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        otpSent
                          ? 'border-success text-success bg-success/10'
                          : 'border-primary-container text-primary-container hover:bg-primary-container hover:text-white'
                      }`}
                      type="button"
                      onClick={handleSendOtp}
                    >
                      {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
                    </button>
                  </div>

                  {otpSent && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-48 px-3 py-1.5 text-sm border border-outline-variant rounded-md focus:ring-2 focus:ring-primary-container focus:outline-none"
                      />
                      <span className="text-xs text-success font-medium">OTP sent to registered Aadhaar mobile</span>
                    </div>
                  )}

                  <div className="mt-2 flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-sm">lock_person</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      256-Bit Encrypted &amp; Never Shared Publicly
                    </span>
                  </div>
                </div>

                {/* Grid for Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Field 3: Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1.5" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-xs font-bold text-on-surface-variant">+91</span>
                        <span className="material-symbols-outlined text-outline ml-1 text-[18px]">smartphone</span>
                      </div>
                      <input
                        className="block w-full pl-[70px] pr-20 py-2.5 border border-outline-variant rounded-md bg-white text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                        id="phone"
                        name="phone"
                        placeholder="98765 43210"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                        <span className="inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                          <span className="material-symbols-outlined text-[13px] mr-0.5">check_circle</span>
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Field 4: Email */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1.5" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </div>
                      <input
                        className="block w-full pl-10 pr-3.5 py-2.5 border border-outline-variant rounded-md bg-white text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                        id="email"
                        name="email"
                        placeholder="citizen@example.com"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-1 text-xs text-on-surface-variant">For official correspondence.</p>
                  </div>
                </div>

                {/* Field 5: Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-outline-variant border-dashed rounded-md hover:border-primary-container transition-colors bg-surface-container-low group cursor-pointer relative overflow-hidden">
                    <div className="space-y-2 text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center overflow-hidden border border-outline-variant group-hover:border-primary-container transition-colors">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-3xl text-outline-variant">person</span>
                        )}
                      </div>
                      <div className="flex text-sm text-on-surface-variant">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-primary-container hover:text-primary focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-outline">PNG, JPG up to 5MB</p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-outline-variant text-on-surface-variant text-xs font-medium rounded-md hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                        <span>Take Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Field 6: Terms & Consent */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        className="h-4 w-4 text-primary-container border-outline-variant rounded focus:ring-primary-container cursor-pointer accent-primary-container"
                        id="termsAccepted"
                        name="termsAccepted"
                        type="checkbox"
                        required
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-on-surface cursor-pointer text-xs sm:text-sm" htmlFor="termsAccepted">
                        I agree to the{' '}
                        <a className="text-primary-container hover:underline font-semibold" href="#terms">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a className="text-primary-container hover:underline font-semibold" href="#privacy">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        className="h-4 w-4 text-primary-container border-outline-variant rounded focus:ring-primary-container cursor-pointer accent-primary-container"
                        id="consentAccepted"
                        name="consentAccepted"
                        type="checkbox"
                        required
                        checked={formData.consentAccepted}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-on-surface cursor-pointer text-xs sm:text-sm" htmlFor="consentAccepted">
                        I consent to my identity being verified via municipal records for the purpose of civic engagement.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Primary Submit CTA */}
                <div className="pt-4">
                  <button
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-primary-container hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-all items-center gap-2 cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>{isSubmitting ? 'Verifying Credentials...' : 'Verify & Register Account'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 text-center border-t border-outline-variant pt-6">
              <p className="text-sm text-on-surface-variant">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-primary-container hover:text-primary transition-colors">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
