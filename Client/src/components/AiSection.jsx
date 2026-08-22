import React from 'react';

export default function AiSection() {
  return (
    <section id="how-it-works" className="py-24 bg-surface-container-low border-y border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Information */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-container/10 text-primary-container font-semibold text-xs mb-4 border border-primary-container/20">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Intelligent Automation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
              AI That Understands Your City
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Our advanced machine learning models analyze your reports instantly, extracting key information to ensure faster and more accurate resolutions without manual delays.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-surface/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">image_search</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg mb-1">Image Recognition</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Automatically identifies the type, dimensions, and severity of the civic issue from your uploaded photos.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-surface/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">route</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg mb-1">Smart Routing</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Directs the report to the specific municipal ward and department responsible with automated priority scoring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Vision Visualizer Card */}
          <div className="relative">
            <div className="bg-white p-6 rounded-card border border-outline-variant shadow-card hover:shadow-card-hover transition-all">
              <div className="aspect-video bg-surface-container-low rounded-lg overflow-hidden mb-5 relative group">
                <img 
                  alt="Civic Pothole Detection" 
                  className="object-cover w-full h-full"
                  src="/assets/ai-pothole.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBbjS0JAMsL717Ier7x19SgSDLSZjIfDxZGUWWVUkYwsG4a7k15NTbxhNpQdaP38_6AczCCnUGCcdSM4wtqvHh-kUgP4Oppz2zhXpIOCgOmrt3GjcV5SPtfxvTZ43jeLp1tqUy2KCy3v-K7t3B6CEBQOv9ZMO24APMz0SUjCM65NvDu5m9MHe81vcWav_coW5Idp2och-FY5zYvR_d2XNnGLH1pqEbCXtCOoqPFKNoH0l7xMpuqKHiD";
                  }}
                />

                {/* Simulated AI Scanning Bounding Box */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-primary-container rounded-sm shadow-lg pointer-events-none">
                  <span className="absolute -top-6 left-0 bg-primary-container text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    Pothole (98.4%)
                  </span>
                  {/* Subtle scanline animation */}
                  <div className="w-full h-0.5 bg-primary-container/80 shadow-sm animate-pulse"></div>
                </div>

                {/* Geolocation Tag Overlay */}
                <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary-container">location_on</span>
                  <span>28.6139° N, 77.2090° E</span>
                </div>
              </div>

              {/* Extraction Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-secondary">memory</span>
                    Category &amp; Ward Extraction
                  </span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Complete
                  </span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full w-full transition-all duration-700"></div>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant pt-1">
                  <span>Assigned: Public Works Department (PWD)</span>
                  <span>Est. SLA: 48 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
