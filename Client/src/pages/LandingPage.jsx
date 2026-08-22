import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ImpactBar from '../components/ImpactBar';
import ProblemGrid from '../components/ProblemGrid';
import AiSection from '../components/AiSection';
import DuplicateTrustSection from '../components/DuplicateTrustSection';
import TrackingSection from '../components/TrackingSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary-container selection:text-white">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ImpactBar />
        <ProblemGrid />
        <AiSection />
        <DuplicateTrustSection />
        <TrackingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
