import React, { useState } from 'react';
import { X, User, Lock, Mail, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      // Simulate successful registration with Level 1
      const userData = {
        username: formData.username,
        email: formData.email,
        level: 1, // All new users start at Level 1
        downloads: 0,
        maxDownloads: 3, // Level 1 allows 3 downloads
        joinDate: new Date().toLocaleDateString()
      };
      
      onRegister(userData);
      onClose();
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      setIsLoading(false);
      
      // Show welcome message
      alert(`Welcome to PYBROO, ${userData.username}! You've been automatically assigned Level 1 with 3 free downloads.`);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white">Join PYBROO</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Level Info */}
        <div className="p-6 border-b border-[#2a2a2a] bg-[#1f1f1f]">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            <span className="text-white font-medium">Level 1 - Free Starter</span>
          </div>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              <span>3 free downloads per month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              <span>Access to basic resources</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              <span>Community forum access</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                className={`pl-10 bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                  errors.username ? 'border-red-500' : ''
                }`}
                required
              />
            </div>
            {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`pl-10 bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                  errors.email ? 'border-red-500' : ''
                }`}
                required
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={`pl-10 pr-10 bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                  errors.password ? 'border-red-500' : ''
                }`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`pl-10 pr-10 bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35] ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-[#ff6b35] bg-[#1f1f1f] border-[#3f3f46] rounded focus:ring-[#ff6b35] mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I agree to the{' '}
              <Button
                type="button"
                variant="link"
                className="text-[#ff6b35] hover:text-[#ea580c] p-0 h-auto"
                onClick={() => alert('Terms of Service would be shown here')}
              >
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button
                type="button"
                variant="link"
                className="text-[#ff6b35] hover:text-[#ea580c] p-0 h-auto"
                onClick={() => alert('Privacy Policy would be shown here')}
              >
                Privacy Policy
              </Button>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff6b35] hover:bg-[#ea580c] text-white font-medium py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#3f3f46]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0f0f0f] text-gray-400">or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToLogin}
              className="text-[#ff6b35] hover:text-[#ea580c] p-0 font-medium"
            >
              Login here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

