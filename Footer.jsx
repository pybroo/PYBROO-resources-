import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Helpful Links',
      icon: '🔗',
      color: 'text-[#ff6b35]',
      links: [
        { name: 'User Awards & Level', count: 14, color: 'text-[#22c55e]' },
        { name: 'Help & Site Guides', count: 15, color: 'text-[#ec4899]' },
        { name: 'Support & Reports', count: 16, color: 'text-[#8b5cf6]' },
        { name: 'Upgrade Your Account', count: 17, color: 'text-[#f59e0b]' },
        { name: 'DMCA Policy', count: 18, color: 'text-[#6b7280]' },
        { name: 'Rules & Guidelines', count: 19, color: 'text-[#dc2626]' },
        { name: 'Create Support Ticket', count: 20, color: 'text-[#3b82f6]' }
      ]
    },
    {
      title: 'Resource Categories',
      icon: '📁',
      color: 'text-[#8b5cf6]',
      links: [
        { name: 'Minecraft', count: 21, color: 'text-[#22c55e]' },
        { name: 'XenForo', count: 22, color: 'text-[#8b5cf6]' },
        { name: 'IPS Suite', count: 23, color: 'text-[#6b7280]' },
        { name: 'WordPress', count: 24, color: 'text-[#2563eb]' },
        { name: 'WHMCS', count: 25, color: 'text-[#7c3aed]' },
        { name: 'Unity / Unreal Engine', count: 26, color: 'text-[#ec4899]' },
        { name: 'PHP Scripts & Software', count: 27, color: 'text-[#f59e0b]' }
      ]
    },
    {
      title: 'More Resource Categories',
      icon: '📦',
      color: 'text-[#22c55e]',
      links: [
        { name: 'Minecraft Models', count: 28, color: 'text-[#8b5cf6]' },
        { name: 'Minecraft Maps & Builds', count: 29, color: 'text-[#ff6b35]' },
        { name: 'Minecraft Plugins', count: 30, color: 'text-[#22c55e]' },
        { name: 'XenForo 2 Styles', count: 31, color: 'text-[#3b82f6]' },
        { name: 'XenForo 2 Releases', count: 32, color: 'text-[#22c55e]' },
        { name: 'IPS Suite Themes', count: 33, color: 'text-[#dc2626]' },
        { name: 'IPS Suite Releases', count: 34, color: 'text-[#22c55e]' }
      ]
    },
    {
      title: 'Forum Sections',
      icon: '💬',
      color: 'text-[#dc2626]',
      links: [
        { name: 'Announcements', count: 35, color: 'text-[#3b82f6]' },
        { name: 'General Discussions', count: 36, color: 'text-[#dc2626]' },
        { name: 'Minecraft Discussions', count: 37, color: 'text-[#22c55e]' },
        { name: 'XenForo 2 Discussions', count: 38, color: 'text-[#8b5cf6]' },
        { name: 'Invision Community Discussions', count: 39, color: 'text-[#ec4899]' },
        { name: 'WordPress Discussions', count: 40, color: 'text-[#2563eb]' },
        { name: 'Request a New Resource', count: 41, color: 'text-[#22c55e]' }
      ]
    }
  ];

  const handleLinkClick = (linkName) => {
    alert(`${linkName} section would be implemented here`);
  };

  return (
    <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a] mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className={`flex items-center space-x-2 font-semibold ${section.color}`}>
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <div className="relative inline-block">
                      <button
                        onClick={() => handleLinkClick(link.name)}
                        className={`${link.color} hover:text-[#ff6b35] transition-colors text-sm cursor-pointer hover:underline`}
                      >
                        {link.name}
                      </button>
                      <span className="absolute -top-2 -right-6 bg-[#6b7280] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                        {link.count}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="border-t border-[#2a2a2a] pt-8">
          {/* Logo and Description */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#22c55e]">PY</span>
              <span className="text-[#ff6b35]">BROO</span>
            </div>
            <p className="text-[#6b7280] text-sm mb-2">
              The #1 Online Community for Free Resources.
            </p>
            <p className="text-[#6b7280] text-sm mb-4">
              Download Premium Minecraft Plugins & Builds, XenForo Add-ons & Styles, IPS Suite Plugins & Apps, PHP scripts, & more!
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-[#6b7280]">
              <span>NullForums™ is in compliance with 17 U.S.C. 512 and the Digital Millennium Copyright Act ("DMCA").</span>
              <button 
                onClick={() => alert('DMCA report functionality would be implemented here')}
                className="text-[#dc2626] hover:text-[#ef4444] underline cursor-pointer"
              >
                submit a DMCA report
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-[#6b7280]">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <select className="bg-[#1f1f1f] border border-[#3f3f46] text-white rounded px-2 py-1 text-xs">
                <option>English (US)</option>
              </select>
              <span className="bg-[#8b5cf6] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">43</span>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center space-x-4">
              <button 
                onClick={() => alert('Contact page would be implemented here')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                Contact us
                <span className="absolute -top-2 -right-6 bg-[#f59e0b] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">44</span>
              </button>
              <button 
                onClick={() => alert('Terms page would be implemented here')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                Terms and rules
                <span className="absolute -top-2 -right-6 bg-[#22c55e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">45</span>
              </button>
              <button 
                onClick={() => alert('Privacy policy would be implemented here')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                Privacy policy
                <span className="absolute -top-2 -right-6 bg-[#ec4899] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">46</span>
              </button>
              <button 
                onClick={() => alert('Help page would be implemented here')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                Help
                <span className="absolute -top-2 -right-6 bg-[#3b82f6] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">47</span>
              </button>
              <button 
                onClick={() => alert('Home page')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                Home
                <span className="absolute -top-2 -right-6 bg-[#dc2626] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">48</span>
              </button>
              <button 
                onClick={() => alert('RSS feed would be implemented here')}
                className="hover:text-[#ff6b35] transition-colors relative"
              >
                RSS
                <span className="absolute -top-2 -right-6 bg-[#22c55e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">49</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

