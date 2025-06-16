import React, { useState } from 'react';
import { X, MessageSquare, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RequestModal = ({ isOpen, onClose, onRequest, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { id: 'minecraft', name: 'Minecraft Leaks' },
    { id: 'xenforo2', name: 'XenForo 2.X.X Leaks' },
    { id: 'xenforo1', name: 'XenForo 1.X.X Leaks' },
    { id: 'ips', name: 'IPS Suite Leaks' },
    { id: 'adobe', name: 'Adobe & GFX Leaks' },
    { id: 'wordpress', name: 'WordPress Leaks' },
    { id: 'whmcs', name: 'WHMCS Leaks' },
    { id: 'unity', name: 'Unity / UE Asset Leaks' },
    { id: 'misc', name: 'Misc & Other Leaks' }
  ];

  const urgencyLevels = [
    { id: 'low', name: 'Low Priority', color: 'text-[#22c55e]' },
    { id: 'normal', name: 'Normal Priority', color: 'text-[#f59e0b]' },
    { id: 'high', name: 'High Priority', color: 'text-[#ef4444]' }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Request description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to request resources');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate request submission
    setTimeout(() => {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      const selectedUrgency = urgencyLevels.find(urg => urg.id === formData.urgency);
      
      const newRequest = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: selectedCategory.name,
        urgency: selectedUrgency.name,
        urgencyColor: selectedUrgency.color,
        requester: user.username,
        date: new Date().toLocaleDateString(),
        status: 'Open',
        votes: 0
      };

      onRequest(newRequest);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        urgency: 'normal'
      });
      setErrors({});
      setIsLoading(false);
      
      alert(`Resource request "${newRequest.title}" submitted successfully! The community will be notified.`);
    }, 1000);
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
              You need to be logged in to request resources from the PYBROO community.
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
          <h2 className="text-xl font-bold text-white">Request a Resource</h2>
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
            <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">Requesting as {user.username}</p>
              <p className="text-gray-400 text-sm">Level {user.level} • Community Member</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Request Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>What are you looking for? *</span>
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Advanced Minecraft Plugin for Economy System"
              className={`bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                errors.title ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
          </div>

          {/* Request Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Detailed Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide as much detail as possible about what you're looking for. Include specific features, version requirements, compatibility needs, and any other relevant information that would help the community understand your request..."
              rows={5}
              className={`w-full bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] rounded-md px-3 py-2 resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
            <p className="text-gray-400 text-xs">{formData.description.length}/1000 characters</p>
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
              <option value="">Select the most relevant category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs">{errors.category}</p>}
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Priority Level</label>
            <div className="grid grid-cols-3 gap-3">
              {urgencyLevels.map((level) => (
                <label
                  key={level.id}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.urgency === level.id
                      ? 'border-[#ff6b35] bg-[#ff6b35]/20'
                      : 'border-[#3f3f46] hover:border-[#6b7280]'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={level.id}
                    checked={formData.urgency === level.id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${level.color}`}>
                    {level.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Request Guidelines */}
          <div className="bg-[#1f1f1f] border border-[#3f3f46] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Request Guidelines</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Be specific about what you're looking for</li>
              <li>• Include version numbers and compatibility requirements</li>
              <li>• Check if the resource already exists before requesting</li>
              <li>• Be patient - community members fulfill requests voluntarily</li>
              <li>• Consider offering something in return to encourage fulfillment</li>
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
              className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;

