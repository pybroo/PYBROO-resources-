import React, { useState } from 'react';
import { X, Crown, Download, Star, CreditCard, Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LevelUpgradeModal = ({ isOpen, onClose, onUpgrade, user }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const levels = [
    {
      id: 1,
      name: 'Level 1 - Free Starter',
      price: 0,
      priceText: 'Free',
      downloads: 3,
      color: 'bg-[#22c55e]',
      borderColor: 'border-[#22c55e]',
      features: [
        '3 downloads per month',
        'Access to basic resources',
        'Community forum access',
        'Basic support'
      ],
      current: true
    },
    {
      id: 2,
      name: 'Level 2 - Premium',
      price: 1,
      priceText: '$1',
      downloads: 20,
      color: 'bg-[#3b82f6]',
      borderColor: 'border-[#3b82f6]',
      features: [
        '20+ downloads per month',
        'Access to premium resources',
        'Priority support',
        'Early access to new releases',
        'No ads'
      ]
    },
    {
      id: 3,
      name: 'Level 3 - VIP',
      price: 2,
      priceText: '$2',
      downloads: 80,
      color: 'bg-[#8b5cf6]',
      borderColor: 'border-[#8b5cf6]',
      features: [
        '80+ downloads per month',
        'Access to all VIP resources',
        'Dedicated VIP support',
        'Exclusive VIP content',
        'Custom requests priority',
        'VIP badge and status'
      ]
    }
  ];

  const upiId = '9279632795@fam';

  const handleLevelSelect = (level) => {
    if (level.id <= (user?.level || 1)) {
      return; // Can't downgrade or select current level
    }
    setSelectedLevel(level);
    if (level.price > 0) {
      setShowPayment(true);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    if (!utrNumber.trim()) {
      alert('Please enter the UTR number from your payment');
      return;
    }

    if (utrNumber.length < 10) {
      alert('UTR number should be at least 10 characters');
      return;
    }

    setIsProcessing(true);

    // Simulate payment verification
    setTimeout(() => {
      const upgradeData = {
        newLevel: selectedLevel.id,
        maxDownloads: selectedLevel.downloads,
        downloads: user.downloads, // Keep current download count
        utrNumber: utrNumber,
        upgradeDate: new Date().toLocaleDateString()
      };

      onUpgrade(upgradeData);
      setIsProcessing(false);
      onClose();
      
      // Reset state
      setSelectedLevel(null);
      setShowPayment(false);
      setUtrNumber('');
      
      alert(`Congratulations! You've been upgraded to ${selectedLevel.name}. You now have ${selectedLevel.downloads} downloads per month!`);
    }, 2000);
  };

  const handleBack = () => {
    setShowPayment(false);
    setSelectedLevel(null);
    setUtrNumber('');
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
              You need to be logged in to upgrade your level on PYBROO.
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
      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-[#ff6b35]" />
            <h2 className="text-xl font-bold text-white">
              {showPayment ? 'Complete Payment' : 'Upgrade Your Level'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {!showPayment ? (
          <>
            {/* Current Level Info */}
            <div className="p-6 border-b border-[#2a2a2a] bg-[#1f1f1f]">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${levels[user.level - 1]?.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {user.level}
                </div>
                <div>
                  <h3 className="text-white font-medium">{levels[user.level - 1]?.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {user.downloads}/{user.maxDownloads} downloads used this month
                  </p>
                </div>
              </div>
            </div>

            {/* Level Options */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {levels.map((level) => {
                  const isCurrent = level.id === user.level;
                  const isLower = level.id < user.level;
                  const canUpgrade = level.id > user.level;

                  return (
                    <div
                      key={level.id}
                      className={`relative border-2 rounded-lg p-6 transition-all duration-200 ${
                        isCurrent
                          ? `${level.borderColor} bg-gradient-to-br from-transparent to-${level.color}/20`
                          : isLower
                          ? 'border-[#3f3f46] bg-[#1f1f1f] opacity-60'
                          : canUpgrade
                          ? 'border-[#3f3f46] bg-[#1f1f1f] hover:border-[#ff6b35] cursor-pointer hover:scale-105'
                          : 'border-[#3f3f46] bg-[#1f1f1f]'
                      }`}
                      onClick={() => canUpgrade && handleLevelSelect(level)}
                    >
                      {/* Level Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 ${level.color} rounded-full flex items-center justify-center text-white font-bold`}>
                          {level.id}
                        </div>
                        {isCurrent && (
                          <div className="bg-[#22c55e] text-white text-xs px-2 py-1 rounded-full font-medium">
                            Current
                          </div>
                        )}
                      </div>

                      {/* Level Name and Price */}
                      <h3 className="text-white font-medium mb-2">{level.name}</h3>
                      <div className="text-2xl font-bold text-[#ff6b35] mb-4">{level.priceText}</div>

                      {/* Downloads */}
                      <div className="flex items-center space-x-2 mb-4">
                        <Download className="w-4 h-4 text-[#22c55e]" />
                        <span className="text-white font-medium">{level.downloads}+ downloads/month</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {level.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                            <Check className="w-3 h-3 text-[#22c55e] flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Button */}
                      {isCurrent ? (
                        <Button disabled className="w-full bg-[#22c55e] text-white">
                          Current Level
                        </Button>
                      ) : isLower ? (
                        <Button disabled className="w-full bg-[#6b7280] text-white opacity-50">
                          Previous Level
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleLevelSelect(level)}
                          className="w-full bg-[#ff6b35] hover:bg-[#ea580c] text-white"
                        >
                          Upgrade to Level {level.id}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Payment Section */
          <div className="p-6">
            {/* Selected Level Summary */}
            <div className="bg-[#1f1f1f] border border-[#3f3f46] rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${selectedLevel.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {selectedLevel.id}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{selectedLevel.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedLevel.downloads}+ downloads per month</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#ff6b35]">{selectedLevel.priceText}</div>
                  <div className="text-gray-400 text-sm">One-time payment</div>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment via UPI</span>
                </h3>
                
                {/* UPI ID */}
                <div className="bg-[#1f1f1f] border border-[#3f3f46] rounded-lg p-4 mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">UPI ID</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={upiId}
                      readOnly
                      className="bg-[#2a2a2a] border-[#3f3f46] text-white flex-1"
                    />
                    <Button
                      onClick={copyUpiId}
                      variant="outline"
                      size="sm"
                      className="border-[#3f3f46] text-gray-300 hover:bg-[#2a2a2a]"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-[#1f1f1f] border border-[#3f3f46] rounded-lg p-4 mb-4">
                  <h4 className="text-white font-medium mb-2">Payment Instructions:</h4>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Open your UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
                    <li>Send <strong className="text-[#ff6b35]">{selectedLevel.priceText}</strong> to UPI ID: <strong className="text-[#ff6b35]">{upiId}</strong></li>
                    <li>Copy the UTR number from your payment confirmation</li>
                    <li>Enter the UTR number below and click "Verify Payment"</li>
                  </ol>
                </div>

                {/* UTR Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">UTR Number *</label>
                  <Input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="Enter 12-digit UTR number from your payment"
                    className="bg-[#1f1f1f] border-[#3f3f46] text-white placeholder-[#6b7280] focus:border-[#ff6b35] focus:ring-[#ff6b35]"
                    maxLength={12}
                  />
                  <p className="text-gray-400 text-xs">
                    The UTR (Unique Transaction Reference) number is provided by your UPI app after successful payment
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-[#3f3f46] text-gray-300 hover:bg-[#2a2a2a]"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !utrNumber.trim()}
                  className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium disabled:opacity-50"
                >
                  {isProcessing ? 'Verifying Payment...' : 'Verify Payment'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelUpgradeModal;

