import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ArrowRight, 
  Check, 
  X,
  Smartphone,
  Signal,
  Battery,
  Hash
} from 'lucide-react';
import { disasters } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const USSDSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const ussdCode = '*456*123#';
  
  const steps = [
    {
      title: 'Dial USSD Code',
      instruction: `Dial ${ussdCode} from your mobile phone`,
      content: 'Welcome to Smart Relief USSD\n\nQuick Disaster Donations\n\n1. View Active Disasters\n2. Donate to Emergency\n3. Check Donation History\n4. Help\n\nReply with option number:'
    },
    {
      title: 'Select Disaster',
      instruction: 'Choose a disaster to support',
      content: 'Active Disasters:\n\n1. Kerala Flood Relief\n   Target: ₹1 Cr | Raised: 65%\n\n2. HP Landslide Relief\n   Target: ₹30 L | Raised: 63%\n\n3. Odisha Cyclone (Completed)\n   Target: ₹50 L | Raised: 96%\n\nSelect disaster (1-2):'
    },
    {
      title: 'Enter Amount',
      instruction: 'Enter donation amount (minimum ₹1)',
      content: 'Kerala Flood Relief\n\nAffected: 52,000 people\nCurrent: ₹65.4L / ₹1Cr\n\nEnter amount to donate:\n(Min: ₹1, Max: ₹10,000)\n\nAmount: ₹'
    },
    {
      title: 'Confirm Donation',
      instruction: 'Confirm your donation details',
      content: `Confirm Donation:\n\nDisaster: Kerala Flood Relief\nAmount: ₹${amount}\nFrom: ${phoneNumber}\n\nYour ₹${amount} will provide:\n• ${Math.floor(parseInt(amount) / 5)} liters clean water\n• Essential supplies\n\n1. Confirm\n2. Change Amount\n0. Cancel`
    },
    {
      title: 'Processing',
      instruction: 'Processing your donation...',
      content: 'Processing donation...\n\nPlease wait while we\nprocess your payment.\n\nDo not close or switch apps.\n\n[████████░░] 80%'
    },
    {
      title: 'Success',
      instruction: 'Donation completed successfully!',
      content: `✅ Donation Successful!\n\nAmount: ₹${amount}\nTxn ID: DR${Date.now().toString().slice(-8)}\nTo: Kerala Flood Relief\n\nYour impact:\n${Math.floor(parseInt(amount) / 5)} liters clean water provided\n\nThank you for your contribution!\n\nSMS receipt sent to ${phoneNumber}`
    }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      setDisplayText(steps[currentStep].content);
    }
  }, [currentStep, amount, phoneNumber]);

  const handleNext = () => {
    if (currentStep === 0) {
      // Start session
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Select disaster
      if (selectedDisaster) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      // Enter amount
      if (amount && parseInt(amount) >= 1) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      // Confirm donation
      setIsProcessing(true);
      setCurrentStep(4);
      
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(5);
        setSessionComplete(true);
      }, 3000);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedDisaster('');
    setAmount('');
    setPhoneNumber('');
    setIsProcessing(false);
    setSessionComplete(false);
  };

  const handleDisasterSelect = (disasterId: string) => {
    setSelectedDisaster(disasterId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            USSD Donation Simulator
          </h1>
          <p className="text-xl text-gray-600">
            Experience how micro-donations work on feature phones without internet connectivity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How USSD Donations Work</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dial USSD Code</h3>
                    <p className="text-gray-600 text-sm">Dial *456*123# from any mobile phone, even basic feature phones</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <ArrowRight className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Select Disaster</h3>
                    <p className="text-gray-600 text-sm">Choose from active verified disaster relief campaigns</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                    <Hash className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Enter Amount</h3>
                    <p className="text-gray-600 text-sm">Donate as little as ₹1 - every rupee makes a difference</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <Check className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Confirm & Pay</h3>
                    <p className="text-gray-600 text-sm">Amount is deducted from mobile balance or linked account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Why USSD Donations?</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Works on any mobile phone - no smartphone needed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>No internet connection required</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Instant donations in emergency situations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Accessible in remote areas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>Same transparency and tracking</span>
                </li>
              </ul>
            </div>

            {/* Input Fields */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Simulate Your Phone</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {currentStep === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Disaster (1-2)
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleDisasterSelect('1')}
                        className={`w-full p-3 rounded-lg border-2 text-left ${
                          selectedDisaster === '1' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold">1. Kerala Flood Relief</div>
                        <div className="text-sm text-gray-600">₹65.4L raised of ₹1Cr target</div>
                      </button>
                      <button
                        onClick={() => handleDisasterSelect('2')}
                        className={`w-full p-3 rounded-lg border-2 text-left ${
                          selectedDisaster === '2' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold">2. HP Landslide Relief</div>
                        <div className="text-sm text-gray-600">₹18.9L raised of ₹30L target</div>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Amount (₹1 minimum)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="50"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone Simulator */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
              {/* Phone Header */}
              <div className="bg-black text-white px-4 py-2 rounded-t-2xl">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-1">
                    <Signal className="h-3 w-3" />
                    <span>Airtel</span>
                  </div>
                  <div className="font-mono">12:34</div>
                  <div className="flex items-center space-x-1">
                    <Battery className="h-3 w-3" />
                    <span>85%</span>
                  </div>
                </div>
              </div>

              {/* Phone Screen */}
              <div className="bg-green-900 text-green-100 p-4 font-mono text-sm leading-tight min-h-[400px] rounded-none">
                <div className="whitespace-pre-line">
                  {displayText}
                </div>
                
                {currentStep < 5 && !isProcessing && (
                  <div className="mt-4">
                    <span className="bg-green-800 px-1 animate-pulse">_</span>
                  </div>
                )}
              </div>

              {/* Phone Keypad */}
              <div className="bg-gray-800 rounded-b-2xl p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key) => (
                    <button
                      key={key}
                      className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded text-center transition-colors"
                    >
                      {key}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors">
                    📞 Call
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors">
                    ❌ End
                  </button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Step {currentStep + 1}: {steps[currentStep]?.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {steps[currentStep]?.instruction}
              </p>
              
              <div className="space-y-3">
                {sessionComplete ? (
                  <button
                    onClick={handleReset}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={
                      isProcessing ||
                      (currentStep === 0 && !phoneNumber) ||
                      (currentStep === 1 && !selectedDisaster) ||
                      (currentStep === 2 && (!amount || parseInt(amount) < 1))
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Processing...' : 'Next'}
                  </button>
                )}
                
                <button
                  onClick={handleReset}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDSimulator;