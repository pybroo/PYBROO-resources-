import React, { useState } from 'react';
import { X, Upload, Image, FileText, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const UploadModal = ({ isOpen, onClose, onUpload, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    downloadLink: '',
    logo: null,
    logoPreview: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Helper function to validate URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const categories = [
    { id: 'minecraft', name: 'Minecraft Leaks', color: 'bg-[#22c55e]' },
    { id: 'xenforo2', name: 'XenForo 2.X.X Leaks', color: 'bg-[#8b5cf6]' },
    { id: 'xenforo1', name: 'XenForo 1.X.X Leaks', color: 'bg-[#f97316]' },
    { id: 'ips', name: 'IPS Suite Leaks', color: 'bg-[#4b5563]' },
    { id: 'adobe', name: 'Adobe & GFX Leaks', color: 'bg-[#ef4444]' },
    { id: 'wordpress', name: 'WordPress Leaks', color: 'bg-[#3b82f6]' },
    { id: 'whmcs', name: 'WHMCS Leaks', color: 'bg-[#8b5cf6]' },
    { id: 'unity', name: 'Unity / UE Asset Leaks', color: 'bg-[#ec4899]' },
    { id: 'misc', name: 'Misc & Other Leaks', color: 'bg-[#ea580c]' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, logo: 'Logo file size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          logo: file,
          logoPreview: e.target.result
        }));
        setErrors(prev => ({ ...prev, logo: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Resource title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Resource description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.downloadLink.trim()) {
      newErrors.downloadLink = 'Download link is required';
    } else if (!isValidUrl(formData.downloadLink)) {
      newErrors.downloadLink = 'Please enter a valid URL (e.g., https://example.com/file.zip)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to upload resources');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate upload process
    setTimeout(() => {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      
      const newResource = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: selectedCategory.name,
        categoryId: formData.category,
        categoryColor: selectedCategory.color,
        author: user.username,
        date: new Date().toLocaleDateString(),
        updated: 'just now',
        updatedTimestamp: Date.now(),
        rating: 0,
        ratings: 0,
        logo: formData.logoPreview,
        image: formData.logoPreview ? null : '📦',
        number: Math.floor(Math.random() * 100) + 1,
        downloadLink: formData.downloadLink
      };

      onUpload(newResource);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        downloadLink: '',
        logo: null,
        logoPreview: null
      });
      setErrors({});
      setIsLoading(false);
      
      alert(`Resource "${newResource.title}" uploaded successfully!`);
    }, 1500);
  };

  if (!isOpen) return null;

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
            <h2 className="text-xl font-bold text-white">Authentication Required</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6 text-center">
            <AlertCircle className="w-16 h-16 text-[#ff6b35] mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">Login Required</h3>
            <p className="text-gray-400 mb-4">
              You need to be logged in to upload resources to PYBROO.
            </p>
            <Button
              onClick={onClose}
              className="bg-[#ff6b35] hover:bg-[#ea580c] text-white px-6 py-2"
            >
              Login to Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white">Upload Resource</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-[#2a2a2a] bg-[#1f1f1f]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#ff6b35] rounded-full flex items-center justify-center text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">Uploading as {user.username}</p>
              <p className="text-gray-400 text-sm">Level {user.level} • {user.downloads}/{user.maxDownloads} downloads used</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resource Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resource Title *</span>
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your resource"
              className={`bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                errors.title ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
          </div>

          {/* Resource Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Resource Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of your resource, including features, installation instructions, and any important notes..."
              rows={4}
              className={`w-full bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] rounded-md px-3 py-2 resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
            <p className="text-gray-400 text-xs">{formData.description.length}/500 characters</p>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Category *</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full bg-[#1f1f1f] border-[#3f3f46] text-white focus:border-[#ff6b35] focus:ring-[#ff6b35] rounded-md px-3 py-2 ${
                errors.category ? 'border-red-500' : ''
              }`}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs">{errors.category}</p>}
          </div>

          {/* Download Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Download Link *</span>
            </label>
            <Input
              type="url"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleInputChange}
              placeholder="https://example.com/your-resource-file.zip"
              className={`bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                errors.downloadLink ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.downloadLink && <p className="text-red-400 text-xs">{errors.downloadLink}</p>}
            <p className="text-gray-400 text-xs">Provide a direct download link to your resource file (e.g., Google Drive, Dropbox, MediaFire, etc.)</p>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Resource Logo (Optional)</span>
            </label>
            <div className="flex items-center space-x-4">
              {/* Logo Preview */}
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-lg border border-[#3f3f46] flex items-center justify-center overflow-hidden">
                {formData.logoPreview ? (
                  <img src={formData.logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                ) : (
                  <Image className="w-6 h-6 text-gray-400" />
                )}
              </div>
              
              {/* Upload Button */}
              <div className="flex-1">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#3f3f46] hover:bg-[#4b5563] text-white rounded-lg cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Logo
                </label>
                <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {errors.logo && <p className="text-red-400 text-xs">{errors.logo}</p>}
          </div>

          {/* Upload Guidelines */}
          <div className="bg-[#1f1f1f] border border-[#3f3f46] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Upload Guidelines</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Ensure your resource is original or properly credited</li>
              <li>• Provide clear installation instructions in the description</li>
              <li>• Choose the most appropriate category for your resource</li>
              <li>• Resources will be reviewed before being made public</li>
              <li>• Inappropriate content will be removed</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#3f3f46] text-gray-300 hover:bg-[#2a2a2a]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#ff6b35] hover:bg-[#ea580c] text-white font-medium disabled:opacity-50"
            >
              {isLoading ? 'Uploading...' : 'Upload Resource'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;

