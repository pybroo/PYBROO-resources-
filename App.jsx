import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import UploadModal from './components/UploadModal';
import RequestModal from './components/RequestModal';
import LevelUpgradeModal from './components/LevelUpgradeModal';
import './App.css';

function App() {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [userResources, setUserResources] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  
  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isLevelUpgradeModalOpen, setIsLevelUpgradeModalOpen] = useState(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pybroo_user');
    const savedResources = localStorage.getItem('pybroo_resources');
    const savedRequests = localStorage.getItem('pybroo_requests');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedResources) {
      setUserResources(JSON.parse(savedResources));
    }
    if (savedRequests) {
      setUserRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pybroo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pybroo_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pybroo_resources', JSON.stringify(userResources));
  }, [userResources]);

  useEffect(() => {
    localStorage.setItem('pybroo_requests', JSON.stringify(userRequests));
  }, [userRequests]);

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserResources([]);
    setUserRequests([]);
    localStorage.removeItem('pybroo_user');
    localStorage.removeItem('pybroo_resources');
    localStorage.removeItem('pybroo_requests');
  };

  // Resource management handlers
  const handleResourceUpload = (newResource) => {
    setUserResources(prev => [newResource, ...prev]);
    setIsUploadModalOpen(false);
  };

  const handleResourceRequest = (newRequest) => {
    setUserRequests(prev => [newRequest, ...prev]);
    setIsRequestModalOpen(false);
  };

  const handleResourceDownload = (resource) => {
    if (!user) {
      alert('Please login to download resources');
      setIsLoginModalOpen(true);
      return;
    }

    if (user.downloads >= user.maxDownloads) {
      alert(`You've reached your download limit (${user.maxDownloads} downloads). Please upgrade your level to download more resources.`);
      setIsLevelUpgradeModalOpen(true);
      return;
    }

    // Simulate download
    const updatedUser = {
      ...user,
      downloads: user.downloads + 1
    };
    setUser(updatedUser);
    alert(`Downloaded: ${resource.title}\nRemaining downloads: ${updatedUser.maxDownloads - updatedUser.downloads}`);
  };

  // Level upgrade handler
  const handleLevelUpgrade = (upgradeData) => {
    const updatedUser = {
      ...user,
      level: upgradeData.newLevel,
      maxDownloads: upgradeData.maxDownloads,
      downloads: upgradeData.downloads,
      upgradeDate: upgradeData.upgradeDate
    };
    setUser(updatedUser);
    setIsLevelUpgradeModalOpen(false);
  };

  // Search and filter handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Modal handlers
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleUploadClick = () => {
    if (!user) {
      alert('Please login to upload resources');
      setIsLoginModalOpen(true);
      return;
    }
    setIsUploadModalOpen(true);
  };

  const handleRequestClick = () => {
    if (!user) {
      alert('Please login to request resources');
      setIsLoginModalOpen(true);
      return;
    }
    setIsRequestModalOpen(true);
  };

  const handleUpgradeClick = () => {
    if (!user) {
      alert('Please login to upgrade your level');
      setIsLoginModalOpen(true);
      return;
    }
    setIsLevelUpgradeModalOpen(true);
  };

  // Modal switching handlers
  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <Header
        user={user}
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onUpgradeClick={handleUpgradeClick}
        onLogout={handleLogout}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCategoryFilter={handleCategoryFilter}
          selectedCategory={selectedCategory}
          userResources={userResources}
          onUploadClick={handleUploadClick}
          onRequestClick={handleRequestClick}
        />

        {/* Main Content */}
        <MainContent
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          userResources={userResources}
          onResourceDownload={handleResourceDownload}
          user={user}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={switchToLogin}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleResourceUpload}
        user={user}
      />

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onRequest={handleResourceRequest}
        user={user}
      />

      <LevelUpgradeModal
        isOpen={isLevelUpgradeModalOpen}
        onClose={() => setIsLevelUpgradeModalOpen(false)}
        onUpgrade={handleLevelUpgrade}
        user={user}
      />
    </div>
  );
}

export default App;

