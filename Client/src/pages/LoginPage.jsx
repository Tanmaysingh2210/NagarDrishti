import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('citizen'); // 'citizen' | 'authority' | 'workman'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginToast, setLoginToast] = useState('');

  const roles = [
    { id: 'citizen', label: 'Citizen', color: 'primary' },
    { id: 'authority', label: 'Authority', color: 'secondary' },
    { id: 'workman', label: 'Workman', color: 'secondary' },
  ];

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setLoginToast('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginToast(`Logged in successfully as ${activeRole.toUpperCase()}! Redirecting...`);
      setTimeout(() => {
        if (activeRole === 'authority') {
          navigate('/authority');
        } else if (activeRole === 'workman') {
          navigate('/authority');
        } else {
          navigate('/citizen');
        }
      }, 1200);
    }, 900);
  };

  // Dynamic headings and buttons based on role
  const getRoleDetails = () => {
    switch (activeRole) {
      case 'authority':
        return {
          heading: 'Municipal Administration Portal',
          subheading: 'Official Government Municipal Login',
          inputLabel: 'Official Email or Employee ID',
          inputPlaceholder: 'admin@municipality.gov.in',
          buttonText: 'Secure Login',
          buttonClass: 'bg-secondary hover:bg-secondary/90 text-white',
          footerNote: (
            <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
              Credentials provided by Municipal Super Admin
            </p>
          ),
        };
      case 'workman':
        return {
          heading: 'Field Task Management System',
          subheading: 'Public Works & Sanitation Field Crew',
          inputLabel: 'Workman ID or Mobile Number',
          inputPlaceholder: 'e.g. WRK-2024-8841',
          buttonText: 'Access Tasks',
          buttonClass: 'bg-secondary hover:bg-secondary/90 text-white',
          footerNote: (
            <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">engineering</span>
              Authorized Field Personnel Only
            </p>
          ),
        };
      case 'citizen':
      default:
        return {
          heading: 'Sign In to Report & Track Issues',
          subheading: '256-Bit Encrypted Official Session',
          inputLabel: 'Email or Mobile Number',
          inputPlaceholder: 'Enter your registered ID / mobile',
          buttonText: 'Sign In to Portal',
          buttonClass: 'bg-primary-container hover:bg-primary-container/90 text-white',
          footerNote: (
            <p className="text-sm text-on-surface-variant">
              New to NagarDrishti?{' '}
              <Link
                to="/signup"
                className="font-semibold text-primary-container hover:text-primary transition-colors underline"
              >
                Register as a Citizen
              </Link>
            </p>
          ),
        };
    }
  };

  const roleConfig = getRoleDetails();

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex flex-col font-sans text-on-surface antialiased">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-outline-variant px-6 lg:px-12 py-3.5 flex justify-between items-center z-10 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-container text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="text-xl font-bold text-primary-container">NagarDrishti</span>
          </Link>
          <span className="bg-surface-container-highest px-2.5 py-0.5 rounded text-[10px] font-bold text-on-surface-variant tracking-wider uppercase ml-2">
            Secure Portal
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Return to Portal</span>
          </Link>
          <button
            type="button"
            aria-label="Select Language"
            className="flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-card shadow-[0px_10px_25px_-5px_rgba(30,58,138,0.08)] border border-outline-variant overflow-hidden">
          
          {/* Role Switcher Tabs */}
          <div className="flex border-b border-outline-variant bg-surface-container-lowest">
            {roles.map((r) => {
              const isActive = activeRole === r.id;
              const activeColorClass =
                r.id === 'citizen'
                  ? 'text-primary-container border-b-2 border-primary-container bg-white font-bold'
                  : 'text-secondary border-b-2 border-secondary bg-white font-bold';

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleChange(r.id)}
                  className={`flex-1 py-3 text-sm transition-all focus:outline-none cursor-pointer ${
                    isActive
                      ? activeColorClass
                      : 'text-on-surface-variant border-b-2 border-transparent hover:bg-surface-container-low hover:text-primary-container font-medium'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-secondary mb-2 transition-all">
                {roleConfig.heading}
              </h1>
              <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[15px] text-success">lock</span>
                <span>{roleConfig.subheading}</span>
              </p>
            </div>

            {loginToast ? (
              <div className="bg-success/10 border border-success/30 text-success p-5 rounded-card text-center space-y-2 mb-4">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <p className="font-bold text-sm">{loginToast}</p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-secondary" htmlFor="identifier">
                    {roleConfig.inputLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      required
                      placeholder={roleConfig.inputPlaceholder}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all bg-white text-on-surface placeholder:text-outline/70"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-secondary" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all bg-white text-on-surface placeholder:text-outline/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary-container transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-primary-container focus:ring-primary-container border-outline-variant rounded cursor-pointer accent-primary-container"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-xs text-on-surface-variant cursor-pointer font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link will be sent to your registered email or phone.');
                    }}
                    className="text-xs text-primary-container hover:underline font-semibold"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold transition-all items-center gap-2 cursor-pointer mt-6 ${roleConfig.buttonClass} disabled:opacity-50`}
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>{isSubmitting ? 'Verifying Access...' : roleConfig.buttonText}</span>
                </button>
              </form>
            )}

            {/* Dynamic Footer Action */}
            <div className="mt-6 text-center pt-2">
              {roleConfig.footerNote}
            </div>
          </div>

          {/* Bottom Security Banner */}
          <div className="bg-surface-container-low px-8 py-3 border-t border-outline-variant/60 flex justify-center items-center opacity-80 gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-success">verified_user</span>
            <span className="text-xs font-semibold text-on-surface-variant">Secure Government Gateway</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-outline-variant bg-surface-container-low shrink-0 text-xs text-on-surface-variant">
        <p>© 2024 NagarDrishti Municipal Corporation. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-primary-container hover:underline transition-colors" href="#privacy">
            Privacy Policy
          </a>
          <a className="hover:text-primary-container hover:underline transition-colors" href="#terms">
            Terms of Service
          </a>
          <a className="hover:text-primary-container hover:underline transition-colors" href="#accessibility">
            Accessibility
          </a>
          <a className="hover:text-primary-container hover:underline transition-colors" href="#contact">
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
