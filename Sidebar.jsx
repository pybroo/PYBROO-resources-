import React from 'react';
import { Upload, MessageSquare, Users, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ isOpen, onClose, onCategoryFilter, selectedCategory, userResources = [], onUploadClick, onRequestClick }) => {
  // Calculate dynamic counts based on user uploads
  const getCategoryCount = (categoryId) => {
    return userResources.filter(resource => resource.categoryId === categoryId).length;
  };

  const categories = [
    { 
      name: 'Minecraft Leaks', 
      count: getCategoryCount('minecraft'), 
      color: 'bg-gradient-to-r from-[#16a34a] to-[#22c55e]', 
      icon: '🎮', 
      id: 'minecraft',
      number: 16
    },
    { 
      name: 'XenForo 2.X.X Leaks', 
      count: getCategoryCount('xenforo2'), 
      color: 'bg-gradient-to-r from-[#9333ea] to-[#a855f7]', 
      icon: '🔧', 
      id: 'xenforo2',
      number: 18
    },
    { 
      name: 'XenForo 1.X.X Leaks', 
      count: getCategoryCount('xenforo1'), 
      color: 'bg-gradient-to-r from-[#ea580c] to-[#f97316]', 
      icon: '🔧', 
      id: 'xenforo1',
      number: 20
    },
    { 
      name: 'IPS Suite Leaks', 
      count: getCategoryCount('ips'), 
      color: 'bg-gradient-to-r from-[#374151] to-[#4b5563]', 
      icon: '💼', 
      id: 'ips',
      number: 22
    },
    { 
      name: 'Adobe & GFX Leaks', 
      count: getCategoryCount('adobe'), 
      color: 'bg-gradient-to-r from-[#dc2626] to-[#ef4444]', 
      icon: '🎨', 
      id: 'adobe',
      number: 24
    },
    { 
      name: 'WordPress Leaks', 
      count: getCategoryCount('wordpress'), 
      color: 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6]', 
      icon: '📝', 
      id: 'wordpress',
      number: 26
    },
    { 
      name: 'WHMCS Leaks', 
      count: getCategoryCount('whmcs'), 
      color: 'bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]', 
      icon: '💳', 
      id: 'whmcs',
      number: 28
    },
    { 
      name: 'Unity / UE Asset Leaks', 
      count: getCategoryCount('unity'), 
      color: 'bg-gradient-to-r from-[#db2777] to-[#ec4899]', 
      icon: '🎯', 
      id: 'unity',
      number: 30
    },
    { 
      name: 'Misc & Other Leaks', 
      count: getCategoryCount('misc'), 
      color: 'bg-gradient-to-r from-[#c2410c] to-[#ea580c]', 
      icon: '📦', 
      id: 'misc',
      number: 32
    }
  ];

  // Get top contributors based on user uploads
  const getTopContributors = () => {
    const contributorMap = {};
    userResources.forEach(resource => {
      if (contributorMap[resource.author]) {
        contributorMap[resource.author]++;
      } else {
        contributorMap[resource.author] = 1;
      }
    });

    return Object.entries(contributorMap)
      .map(([name, count]) => ({ name, count, avatar: '👤' }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  const topContributors = getTopContributors();

  const handleCategoryClick = (categoryId) => {
    onCategoryFilter(categoryId === selectedCategory ? null : categoryId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-80 bg-[#0f0f0f] border-r border-[#2a2a2a]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        h-screen overflow-y-auto scrollbar-thin scrollbar-track-[#1f1f1f] scrollbar-thumb-[#3f3f46]
      `}>
        <div className="p-4 space-y-3">
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center md:hidden">
            <h2 className="text-white font-semibold">Categories</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Clear Filter Button */}
          {selectedCategory && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35]/20"
              onClick={() => handleCategoryClick(selectedCategory)}
            >
              Clear Filter
            </Button>
          )}

          {/* Ad Space */}
          <div className="relative bg-[#ff6b35]/20 border border-[#ff6b35] rounded-lg p-3 text-center cursor-pointer hover:bg-[#ff6b35]/30 transition-colors">
            <p className="text-[#ff6b35] text-sm font-medium">Place your Ad here for $35.00 per Month!</p>
            <span className="absolute -top-2 -right-2 bg-[#ff6b35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">14</span>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`
                  relative ${category.color} rounded-lg p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]
                  ${selectedCategory === category.id ? 'ring-2 ring-[#ff6b35] scale-[1.02]' : ''}
                `}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-white font-medium text-sm">{category.name}</span>
                  </div>
                  <span className="text-white/90 text-sm font-bold">{category.count.toLocaleString()}</span>
                </div>
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{category.number}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="relative">
              <Button 
                className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-3 rounded-lg"
                onClick={onUploadClick}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">33</span>
            </div>
            
            <div className="relative">
              <Button 
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium py-3 rounded-lg"
                onClick={onRequestClick}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Request a Resource
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">34</span>
            </div>
            
            <div className="relative">
              <Button 
                className="w-full bg-[#6b7280] hover:bg-[#4b5563] text-white font-medium py-3 rounded-lg"
                onClick={() => window.open('https://discord.com', '_blank')}
              >
                <Users className="w-4 h-4 mr-2" />
                Join Our Discord
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#6b7280] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">35</span>
            </div>
          </div>

          {/* Top Resources - Only show if there are user uploads */}
          {userResources.length > 0 && (
            <div className="relative bg-[#1f1f1f] rounded-lg p-3 border border-[#3f3f46]">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-white font-medium">Top resources</span>
              </div>
              <div className="space-y-2">
                {userResources.slice(0, 3).map((resource, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-[#2a2a2a] p-2 rounded transition-colors"
                    onClick={() => alert(`${resource.title} details would be shown here`)}
                  >
                    <div className="w-8 h-8 bg-[#ff6b35] rounded flex items-center justify-center text-white text-xs font-bold">
                      {resource.title.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-gray-300 text-sm hover:text-[#ff6b35] transition-colors truncate">
                      {resource.title}
                    </span>
                  </div>
                ))}
              </div>
              <span className="absolute -top-2 -right-2 bg-[#fbbf24] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">36</span>
            </div>
          )}

          {/* Latest Reviews */}
          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-[#3f3f46]">
            <h3 className="text-white font-medium mb-3">Latest reviews</h3>
            <div className="space-y-2">
              {userResources.length > 0 ? (
                userResources.slice(0, 2).map((resource, index) => (
                  <div 
                    key={index}
                    className="text-[#3b82f6] text-sm cursor-pointer hover:underline hover:text-[#60a5fa] transition-colors"
                    onClick={() => alert(`${resource.title} review details would be shown here`)}
                  >
                    {resource.title}
                  </div>
                ))
              ) : (
                <p className="text-[#6b7280] text-sm">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Most Resources - Only show if there are contributors */}
          {topContributors.length > 0 && (
            <div className="bg-[#1f1f1f] rounded-lg p-3 border border-[#3f3f46]">
              <h3 className="text-white font-medium mb-3">Most resources</h3>
              <div className="space-y-1">
                {topContributors.map((contributor, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between hover:bg-[#2a2a2a] p-2 rounded transition-colors cursor-pointer"
                    onClick={() => alert(`${contributor.name}'s profile would be shown here`)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#3f3f46] rounded-full flex items-center justify-center text-xs">
                        {contributor.avatar}
                      </div>
                      <span className="text-sm hover:text-[#ff6b35] transition-colors text-[#22c55e]">
                        {contributor.name}
                      </span>
                    </div>
                    <span className="text-[#6b7280] text-xs">{contributor.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

