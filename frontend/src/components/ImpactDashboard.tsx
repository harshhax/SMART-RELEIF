import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  Globe,
  Calendar,
  MapPin,
  DollarSign,
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { impactData, disasters, recentDonations } from '../data/mockData';
import { formatCurrency, formatNumber, formatDateTime } from '../utils/formatters';

const ImpactDashboard: React.FC = () => {
  const recentImpacts = impactData.recentImpacts.slice(0, 5);
  const activeDisasters = disasters.filter(d => d.status === 'Active');
  const completedDisasters = disasters.filter(d => d.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-time Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            See exactly how your donations are making a difference across disaster relief campaigns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Donations</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(impactData.totalDonations)}
                </p>
                <p className="text-green-600 text-sm mt-1">↑ 23% this month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Donors</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatNumber(impactData.totalDonors)}
                </p>
                <p className="text-green-600 text-sm mt-1">↑ 18% this month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Disasters Supported</p>
                <p className="text-3xl font-bold text-purple-600">
                  {impactData.disastersSupported}
                </p>
                <p className="text-green-600 text-sm mt-1">3 new this week</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Lives Impacted</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatNumber(impactData.livesImpacted)}
                </p>
                <p className="text-green-600 text-sm mt-1">2.1K added today</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Impact Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Impact Activities</h2>
                <Activity className="h-6 w-6 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentImpacts.map((impact) => (
                  <div key={impact.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">
                        {impact.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{impact.disaster}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDateTime(impact.timestamp)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(impact.amount)}
                      </div>
                      <div className="text-xs text-gray-500">funding used</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disaster Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Campaign Progress</h2>
              
              <div className="space-y-6">
                {activeDisasters.map((disaster) => {
                  const progress = (disaster.raisedAmount / disaster.targetAmount) * 100;
                  return (
                    <div key={disaster.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{disaster.title}</h3>
                          <p className="text-sm text-gray-600 flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{disaster.location}</span>
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          disaster.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                          disaster.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {disaster.severity}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Fundraising Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(disaster.raisedAmount)} raised
                        </span>
                        <span className="text-gray-600">
                          of {formatCurrency(disaster.targetAmount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Impact</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Donations</span>
                  <span className="font-semibold text-blue-600">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Raised</span>
                  <span className="font-semibold text-green-600">{formatCurrency(156780)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">People Helped</span>
                  <span className="font-semibold text-purple-600">892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Supplies Delivered</span>
                  <span className="font-semibold text-orange-600">1.2K items</span>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Donations</h3>
              
              <div className="space-y-3">
                {recentDonations.slice(0, 5).map((donation) => {
                  const disaster = disasters.find(d => d.id === donation.disasterId);
                  return (
                    <div key={donation.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {disaster?.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDateTime(donation.timestamp)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">
                          {formatCurrency(donation.amount)}
                        </div>
                        <div className="text-xs text-gray-500">{donation.paymentMethod}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="h-8 w-8" />
                <h3 className="text-xl font-bold">This Month's Achievement</h3>
              </div>
              
              <p className="text-blue-100 mb-4">
                Together, we've helped more people than any previous month!
              </p>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl font-bold mb-1">15,234 People</div>
                <div className="text-blue-100 text-sm">received emergency aid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;