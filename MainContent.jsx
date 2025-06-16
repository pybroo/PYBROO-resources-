import React, { useState, useMemo } from 'react';
import { Star, Filter, ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainContent = ({ searchQuery, selectedCategory, userResources = [], onResourceDownload, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('updated');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // Use only user-uploaded resources (empty initially)
  const allResources = userResources;

  // Filter and sort resources
  const filteredAndSortedResources = useMemo(() => {
    let filtered = allResources;

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.categoryId === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'updated':
        default:
          return b.updatedTimestamp - a.updatedTimestamp;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, allResources]);

  const totalPages = Math.ceil(filteredAndSortedResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResources = filteredAndSortedResources.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleDownload = (resource, e) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!user) {
      alert('Please login to download resources');
      return;
    }

    // Check download limits based on user level
    const maxDownloads = user.maxDownloads;
    if (user.downloads >= maxDownloads) {
      alert(`You've reached your download limit (${maxDownloads} downloads). Please upgrade your level to download more resources.`);
      return;
    }

    // Open download link in new tab
    if (resource.downloadLink) {
      window.open(resource.downloadLink, '_blank');
      // Call the download handler to update download count
      onResourceDownload(resource);
    } else {
      alert('Download link not available for this resource');
    }
  };

  const handleResourceClick = (resource) => {
    // Show resource details instead of downloading
    alert(`Resource Details:\n\nTitle: ${resource.title}\nDescription: ${resource.description}\nAuthor: ${resource.author}\nCategory: ${resource.category}\nUploaded: ${resource.date}`);
  };

  const renderStars = (rating, totalRatings) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-[#fbbf24]/50 text-[#fbbf24]" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-[#3f3f46]" />);
      }
    }
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-[#6b7280] text-xs">({totalRatings})</span>
      </div>
    );
  };

  return (
    <main className="flex-1 bg-[#1a1a1a] p-4 min-h-screen">
      {/* Search Results Info */}
      {(searchQuery || selectedCategory) && (
        <div className="mb-4 p-3 bg-[#2a2a2a] rounded-lg border border-[#3f3f46]">
          <p className="text-[#d1d5db] text-sm">
            {searchQuery && `Search results for "${searchQuery}"`}
            {searchQuery && selectedCategory && ' in '}
            {selectedCategory && `${selectedCategory} category`}
            {` - ${filteredAndSortedResources.length} results found`}
          </p>
        </div>
      )}

      {/* Pagination Top */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <div className="relative">
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-2 rounded">43</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-3 py-2 rounded">44</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-3 py-2 rounded">45</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#ec4899] hover:bg-[#db2777] text-white px-3 py-2 rounded">46</Button>
          </div>
          <span className="text-[#6b7280] px-2">…</span>
          <div className="relative">
            <Button size="sm" className="bg-[#6b7280] hover:bg-[#4b5563] text-white px-3 py-2 rounded">47</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-2 rounded">
              Next
            </Button>
            <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">48</span>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="text-[#6b7280] border-[#3f3f46] hover:bg-[#2a2a2a] bg-[#1f1f1f]"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">49</span>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="space-y-4">
        {currentResources.length > 0 ? (
          currentResources.map((resource, index) => (
            <div 
              key={resource.id} 
              className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#ff6b35] transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="flex items-start p-4 space-x-4">
                {/* Resource Thumbnail */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-2xl border border-[#3f3f46] overflow-hidden">
                    {resource.logo ? (
                      <img src={resource.logo} alt={resource.title} className="w-full h-full object-cover" />
                    ) : (
                      resource.image || '📦'
                    )}
                  </div>
                  <span className="absolute -top-2 -left-2 bg-[#ff6b35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{resource.number}</span>
                </div>
                
                {/* Resource Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0">
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <span className={`inline-block ${resource.categoryColor} text-white text-xs px-2 py-1 rounded font-medium mb-2`}>
                        {resource.category}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-white font-medium text-base mb-2 hover:text-[#ff6b35] transition-colors leading-tight">
                        {resource.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[#9ca3af] text-sm mb-3 leading-relaxed">{resource.description}</p>
                      
                      {/* Author and Date */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-[#3b82f6] hover:underline cursor-pointer hover:text-[#60a5fa] transition-colors">{resource.author}</span>
                        <span className="text-[#6b7280]">{resource.date}</span>
                        <span className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors">{resource.categoryName}</span>
                      </div>
                    </div>
                    
                    {/* Rating and Update Info */}
                    <div className="flex-shrink-0 text-right">
                      {renderStars(resource.rating || 0, resource.ratings || 0)}
                      <div className="text-[#6b7280] text-xs mt-2 mb-3">
                        <div>Updated</div>
                        <div className="text-[#ff6b35] font-medium">{resource.updated}</div>
                      </div>
                      
                      {/* Download Button */}
                      <Button
                        onClick={(e) => handleDownload(resource, e)}
                        className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 text-sm font-medium flex items-center space-x-2 w-full"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-white text-xl mb-2">No resources uploaded yet</h3>
            <p className="text-[#6b7280] mb-4">Be the first to upload a resource to PYBROO!</p>
            <Button 
              className="bg-[#ff6b35] hover:bg-[#ea580c] text-white px-6 py-2"
              onClick={() => alert('Please use the Upload File button in the sidebar to upload resources')}
            >
              Upload Your First Resource
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Bottom */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-1 overflow-x-auto pb-4">
          <div className="relative">
            <Button size="sm" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-2 rounded">43</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-3 py-2 rounded">44</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-3 py-2 rounded">45</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#ec4899] hover:bg-[#db2777] text-white px-3 py-2 rounded">46</Button>
          </div>
          <span className="text-[#6b7280] px-2">…</span>
          <div className="relative">
            <Button size="sm" className="bg-[#6b7280] hover:bg-[#4b5563] text-white px-3 py-2 rounded">47</Button>
          </div>
          <div className="relative">
            <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-2 rounded">
              Next
            </Button>
            <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">48</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;

