import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DisasterList from './components/DisasterList';
import DonationModal from './components/DonationModal';
import ImpactDashboard from './components/ImpactDashboard';
import TransparencyLedger from './components/TransparencyLedger';
import USSDSimulator from './components/USSDSimulator';
import EducationPage from './components/EducationPage';
import AuthModal from './components/AuthModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedDisasterId, setSelectedDisasterId] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleDonate = (disasterId: string) => {
    setSelectedDisasterId(disasterId);
    setIsDonationModalOpen(true);
  };

  const handleDonationComplete = (donation: any) => {
    console.log('Donation completed:', donation);
    // In a real app, this would update the backend
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onDonate={handleDonate} />;
      case 'disasters':
        return <DisasterList onDonate={handleDonate} onNavigate={handleNavigate} />;
      case 'impact':
        return <ImpactDashboard />;
      case 'transparency':
        return <TransparencyLedger />;
      case 'ussd':
        return <USSDSimulator />;
      case 'education':
        return <EducationPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onDonate={handleDonate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {renderCurrentPage()}
      
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        disasterId={selectedDisasterId}
        onDonationComplete={handleDonationComplete}
        user={user}
      />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;