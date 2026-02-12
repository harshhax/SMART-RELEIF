import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Bitcoin,
  Heart,
  Shield,
  Check,
  Gift,
  RefreshCw
} from 'lucide-react';
import { disasters } from '../data/mockData';
import { formatCurrency, generateTransactionHash } from '../utils/formatters';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  disasterId: string;
  onDonationComplete: (donation: any) => void;
  user?: any;
}

const DonationModal: React.FC<DonationModalProps> = ({ 
  isOpen, 
  onClose, 
  disasterId, 
  onDonationComplete,
  user 
}) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success

  const disaster = disasters.find(d => d.id === disasterId);
  
  if (!isOpen || !disaster) return null;

  const predefinedAmounts = [1, 10, 50, 100, 500, 1000];
  
  const paymentMethods = [
    { id: 'UPI', name: 'UPI', icon: Smartphone, description: 'PhonePe, GPay, Paytm' },
    { id: 'Card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'Wallet', name: 'Digital Wallet', icon: Wallet, description: 'PayPal, Razorpay' },
    { id: 'Crypto', name: 'Cryptocurrency', icon: Bitcoin, description: 'Bitcoin, Ethereum' },
  ];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const calculateImpact = (donationAmount: number) => {
    if (donationAmount >= 1000) return `${Math.floor(donationAmount / 50)} families with emergency supplies`;
    if (donationAmount >= 500) return `${Math.floor(donationAmount / 10)} meals for disaster victims`;
    if (donationAmount >= 100) return `${Math.floor(donationAmount / 5)} liters of clean water`;
    if (donationAmount >= 50) return `${Math.floor(donationAmount / 2)} bottles of water`;
    if (donationAmount >= 10) return `${donationAmount} units of basic supplies`;
    return `${donationAmount * 2} liters of clean water`;
  };

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) < 1) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const donation = {
        id: Date.now().toString(),
        userId: user?.id || 'anonymous',
        disasterId,
        amount: parseFloat(amount),
        currency: 'INR',
        paymentMethod,
        isRecurring,
        frequency: isRecurring ? frequency : undefined,
        timestamp: new Date().toISOString(),
        transactionHash: generateTransactionHash(),
        impact: calculateImpact(parseFloat(amount)),
        isAnonymous
      };
      
      setIsProcessing(false);
      setStep(3);
      onDonationComplete(donation);
    }, 2000);
  };

  const renderStep1 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Donation Amount</h3>
        <p className="text-gray-600">Every rupee counts in making a difference</p>
      </div>

      {/* Disaster Info */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-1">{disaster.title}</h4>
        <p className="text-blue-700 text-sm">{disaster.location}</p>
      </div>

      {/* Predefined Amounts */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {predefinedAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleAmountSelect(value)}
            className={`p-4 rounded-xl border-2 transition-all ${
              amount === value.toString()
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold">{formatCurrency(value)}</div>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Amount (Min: ₹1)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Impact Preview */}
      {amount && parseFloat(amount) >= 1 && (
        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">Your Impact</span>
          </div>
          <p className="text-green-800">{calculateImpact(parseFloat(amount))}</p>
        </div>
      )}

      {/* Recurring Option */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-900">Make this a recurring donation</span>
          </label>
          <RefreshCw className="h-5 w-5 text-gray-400" />
        </div>
        
        {isRecurring && (
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        )}
      </div>

      {/* Anonymous Option */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="anonymous" className="text-gray-700">
          Make this donation anonymous
        </label>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!amount || parseFloat(amount) < 1}
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
      >
        Continue to Payment
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h3>
        <p className="text-gray-600">Secure payment powered by top payment processors</p>
      </div>

      {/* Amount Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(parseFloat(amount))}</div>
            <div className="text-sm text-gray-600">
              {isRecurring ? `Recurring ${frequency}` : 'One-time donation'}
            </div>
          </div>
          <Heart className="h-8 w-8 text-red-500" />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center space-x-4 ${
              paymentMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <method.icon className="h-6 w-6 text-gray-600" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{method.name}</div>
              <div className="text-sm text-gray-600">{method.description}</div>
            </div>
            {paymentMethod === method.id && (
              <Check className="h-5 w-5 text-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-gray-900">Secure Payment</span>
        </div>
        <p className="text-sm text-gray-600">
          Your payment is protected by 256-bit SSL encryption and stored securely.
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleDonate}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Donate Now'}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
      <p className="text-gray-600 mb-6">Your donation has been successfully processed</p>
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {formatCurrency(parseFloat(amount))}
        </div>
        <div className="text-green-700 font-semibold mb-2">
          {calculateImpact(parseFloat(amount))}
        </div>
        <div className="text-sm text-gray-600">
          Transaction ID: {generateTransactionHash()}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        You'll receive a confirmation email with your donation receipt and tax certificate.
      </p>
      
      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
      >
        Done
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Make a Donation</h2>
                <div className="text-sm text-gray-600">Step {step} of 3</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Steps */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-8 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;