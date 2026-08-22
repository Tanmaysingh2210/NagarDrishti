import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AuthorityDashboard from './pages/AuthorityDashboard';
import CitizenDashboard from './pages/CitizenDashboard';
import ReportIssuePage from './pages/ReportIssuePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<SignupPage />} />
        
        {/* Report Issue Dedicated Single Page Form */}
        <Route path="/report-issue" element={<ReportIssuePage />} />
        <Route path="/report" element={<ReportIssuePage />} />

        {/* Citizen Homepage / Dashboard */}
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />

        {/* Authority Command Center Dashboard */}
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/command-center" element={<AuthorityDashboard />} />
        <Route path="/dashboard" element={<AuthorityDashboard />} />

        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
