import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6 border border-secondary/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span>Your City. Your Voice. Your Impact.</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 leading-tight tracking-tight">
            Report. Track.<br />
            <span className="text-primary-container">Resolve.</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed font-normal">
            NagarDrishti empowers citizens to instantly report civic issues—from potholes to broken streetlights. 
            Our AI categorizes, routes, and tracks your reports, ensuring rapid response from local authorities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/report-issue"
              className="bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-lg px-8 py-4 rounded-card shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-3 transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-2xl">add_circle</span>
              <span>Report an Issue</span>
            </Link>
            <a 
              href="#live-map"
              className="bg-white border-2 border-secondary text-secondary hover:bg-secondary/5 font-semibold text-lg px-8 py-4 rounded-card transition-all flex justify-center items-center gap-3 shadow-xs hover:shadow-sm transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-2xl">map</span>
              <span>Explore Live Issues</span>
            </a>
          </div>
        </div>


        {/* Right Column: Elite Smartphone HUD Mockup */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative rounded-[40px] border-[8px] border-on-surface bg-white shadow-2xl overflow-hidden aspect-[9/19]">
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-on-surface rounded-b-3xl w-40 mx-auto z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-white/20 rounded-full"></div>
            </div>

            {/* Background Map Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('/assets/phone-map-bg.jpg'), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBeZJ8YH3aS5Ec9Rt88uDLAU7Sxcrk7u_bFhMYTZJREKDjvO_K3ROMES3ySJng2_Efr55SHTTaio4sJaDAB5bNSoUl6F-l0Lb-zlsZbm8XmEjR6Fa6Cq8Sug3vcHUm0Q6drxPGOd05bB0VuLX9e9P5Wsozv05vEC7x5lVnDz27Qo-vc2t5xkQ2Zt0YOJjYy9vqz3p7qVp6aChoyoxqJfjnHRkNj6psbs9E9FHsrolJFQwmKuGBTV7h')` 
              }}
            />

            {/* Map overlay with smooth gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90 pointer-events-none" />

            {/* HUD Elements inside phone */}
            <div className="absolute inset-x-4 top-20 flex flex-col gap-4">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-card border border-outline-variant shadow-card transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-xl">warning</span>
                  </div>
                  <div>
                    <div className="font-semibold text-on-surface text-base">Pothole Detected</div>
                    <div className="text-xs text-on-surface-variant">Main St. &amp; 5th Ave (Ward 14)</div>
                  </div>
                </div>

                <div className="h-1.5 bg-outline-variant/40 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-success w-3/4 rounded-full transition-all duration-1000"></div>
                </div>

                <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    AI Confidence: 94%
                  </span>
                  <span className="text-secondary font-semibold">Routing to PWD</span>
                </div>
              </div>

              {/* Tag pill */}
              <div className="self-end bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>AI Powered</span>
              </div>
            </div>
          </div>

          {/* Decorative radial blur glow behind phone */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-secondary/15 to-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
