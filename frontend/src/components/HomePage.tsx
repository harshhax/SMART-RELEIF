import React from 'react';
import { 
  Heart, 
  Shield, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { impactData, disasters } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onDonate: (disasterId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onDonate }) => {
  const activeDisasters = disasters.filter(d => d.status === 'Active');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-1 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Transparent • Verified • Secure
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">₹1</span> Counts in 
                <br />Disaster Relief
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join millions in making micro-donations that create massive impact. 
                Track every rupee with blockchain transparency and see real-time results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('disasters')}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Start Donating</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => onNavigate('impact')}
                  className="border-2 border-blue-200 text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>View Impact</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Impact</h3>
                  <p className="text-gray-600">Real-time disaster relief statistics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formatCurrency(impactData.totalDonations)}
                    </div>
                    <div className="text-sm text-gray-600">Total Donated</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {formatNumber(impactData.totalDonors)}
                    </div>
                    <div className="text-sm text-gray-600">Active Donors</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {impactData.disastersSupported}
                    </div>
                    <div className="text-sm text-gray-600">Disasters Supported</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {formatNumber(impactData.livesImpacted)}
                    </div>
                    <div className="text-sm text-gray-600">Lives Impacted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Smart Relief?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology for maximum transparency, security, and impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain Transparency</h3>
              <p className="text-gray-600">
                Every donation tracked on an immutable ledger. View exactly where your money goes.
              </p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">USSD Support</h3>
              <p className="text-gray-600">
                Donate even without internet. Simple USSD codes work on any phone.
              </p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Verification</h3>
              <p className="text-gray-600">
                Disasters verified through government data, NGOs, and satellite imagery.
              </p>
            </div>
            
            <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Micro Impact</h3>
              <p className="text-gray-600">
                See exactly what your ₹1 achieved - from water bottles to medicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Disasters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Active Disasters Need Help
              </h2>
              <p className="text-xl text-gray-600">
                Your micro-donation can make an immediate impact
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('disasters')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeDisasters.slice(0, 3).map((disaster) => (
              <div key={disaster.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400"></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      disaster.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      disaster.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {disaster.severity}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-gray-600">Verified</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {disaster.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {disaster.description.slice(0, 100)}...
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round((disaster.raisedAmount / disaster.targetAmount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min((disaster.raisedAmount / disaster.targetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{formatCurrency(disaster.raisedAmount)} raised</span>
                      <span>{formatCurrency(disaster.targetAmount)} target</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onDonate(disaster.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Trusted by Organizations Worldwide
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="font-semibold">Government Verified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-8 w-8 text-green-600" />
              <span className="font-semibold">NGO Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="font-semibold">5-Star Security</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <span className="font-semibold">50K+ Donors</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;