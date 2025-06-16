import React, { useState, useEffect } from 'react';
import { Search, Menu, User, LogOut, Crown, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = ({ 
  user, 
  onSearch, 
  onLoginClick, 
  onRegisterClick, 
  onUpgradeClick, 
  onLogout, 
  onMenuClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Real-time search
    onSearch(query);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return 'text-[#22c55e]';
      case 2: return 'text-[#3b82f6]';
      case 3: return 'text-[#8b5cf6]';
      default: return 'text-[#6b7280]';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 1: return 'bg-[#22c55e]';
      case 2: return 'bg-[#3b82f6]';
      case 3: return 'bg-[#8b5cf6]';
      default: return 'bg-[#6b7280]';
    }
  };

  return (
    <header className="bg-[#0f0f0f] border-b border-[#2a2a2a] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <img src="/nullforums-logo.png" alt="PYBROO" className="h-8 w-auto" onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }} />
              <div className="text-xl font-bold" style={{display: 'block'}}>
                <span className="text-[#22c55e]">PY</span>
                <span className="text-[#ff6b35]">BROO</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative">
              <Button size="sm" className="bg-[#ff6b35] hover:bg-[#ea580c] text-white px-4 py-2 rounded">
                🏠 Home
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#ff6b35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">1</span>
            </div>
            <div className="relative">
              <Button size="sm" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2 rounded">
                💬 Community
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#8b5cf6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">2</span>
            </div>
            <div className="relative">
              <Button size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded">
                📥 Downloads
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#f59e0b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
            </div>
            <div className="relative">
              <Button 
                size="sm" 
                className="bg-[#ec4899] hover:bg-[#db2777] text-white px-4 py-2 rounded"
                onClick={onUpgradeClick}
              >
                ⭐ Upgrades
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#ec4899] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">4</span>
            </div>
            <div className="relative">
              <Button 
                size="sm" 
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded"
                onClick={onUpgradeClick}
              >
                🏆 Levels
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#22c55e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">5</span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative user-menu-container">
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-white hover:bg-[#2a2a2a] px-3 py-2"
                >
                  <div className={`w-8 h-8 ${getLevelBadgeColor(user.level)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {user.level}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user.username}</div>
                    <div className={`text-xs ${getLevelColor(user.level)}`}>
                      Level {user.level} • {user.downloads}/{user.maxDownloads} downloads
                    </div>
                  </div>
                </Button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#1f1f1f] border border-[#3f3f46] rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-[#3f3f46]">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${getLevelBadgeColor(user.level)} rounded-full flex items-center justify-center text-white font-bold`}>
                          {user.level}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.username}</div>
                          <div className={`text-sm ${getLevelColor(user.level)}`}>Level {user.level}</div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-400">
                        Downloads: {user.downloads}/{user.maxDownloads}
                        <div className="w-full bg-[#3f3f46] rounded-full h-2 mt-1">
                          <div 
                            className={`${getLevelBadgeColor(user.level)} h-2 rounded-full transition-all`}
                            style={{ width: `${(user.downloads / user.maxDownloads) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          onUpgradeClick();
                          setShowUserMenu(false);
                        }}
                        className="w-full justify-start text-left hover:bg-[#2a2a2a] text-white"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Level
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          alert('Profile settings would be implemented here');
                          setShowUserMenu(false);
                        }}
                        className="w-full justify-start text-left hover:bg-[#2a2a2a] text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full justify-start text-left hover:bg-[#2a2a2a] text-red-400 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="relative">
                  <Button
                    onClick={onLoginClick}
                    size="sm"
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded"
                  >
                    👤 Log in
                  </Button>
                  <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">10</span>
                </div>
                <div className="relative">
                  <Button
                    onClick={onRegisterClick}
                    size="sm"
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded"
                  >
                    📝 Register
                  </Button>
                  <span className="absolute -top-2 -right-2 bg-[#3b82f6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">11</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#ff6b35] text-sm">🏠</span>
              <span className="text-white text-sm">Home</span>
            </div>
            
            <div className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Quick search…"
                  className="pl-10 pr-4 bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] w-full"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <span className="absolute -top-2 -right-2 bg-[#22c55e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">12</span>
                </div>
              </form>
            </div>

            <div className="relative">
              <Button
                size="sm"
                className="bg-[#6b7280] hover:bg-[#4b5563] text-white px-3 py-2 rounded"
                onClick={() => alert('Search filters would be implemented here')}
              >
                🔍
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#6b7280] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">13</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

