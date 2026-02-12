import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Filter,
  Search,
  Heart
} from 'lucide-react';
import { disasters } from '../data/mockData';
import { formatCurrency, formatNumber, formatDate, calculateProgress } from '../utils/formatters';
import { Disaster } from '../types';

interface DisasterListProps {
  onDonate: (disasterId: string) => void;
  onNavigate: (page: string) => void;
}

const DisasterList: React.FC<DisasterListProps> = ({ onDonate, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredDisasters = disasters.filter((disaster) => {
    const matchesSearch = disaster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disaster.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || disaster.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || disaster.status === selectedStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Urgent': return 'bg-red-100 text-red-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'Government Verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'NGO Verified':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Satellite Confirmed':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Active Disaster Relief Campaigns
          </h1>
          <p className="text-xl text-gray-600">
            Choose a verified disaster relief campaign to support with your micro-donation
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search disasters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Severity Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Urgent">Urgent</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Quick Donate Button */}
            <button
              onClick={() => onNavigate('ussd')}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Quick USSD</span>
            </button>
          </div>
        </div>

        {/* Disaster Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDisasters.map((disaster) => (
            <div key={disaster.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 group">
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 relative overflow-hidden">
                {disaster.images[0] && (
                  <img 
                    src={disaster.images[0]} 
                    alt={disaster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(disaster.severity)}`}>
                    {disaster.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(disaster.status)}`}>
                    {disaster.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Verification */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">
                      {disaster.title}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      {getVerificationIcon(disaster.verificationStatus)}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{disaster.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {disaster.verificationStatus}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {disaster.description.slice(0, 120)}...
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatNumber(disaster.affectedPeople)}
                      </div>
                      <div className="text-xs text-gray-500">People Affected</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatDate(disaster.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">Started</div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Fundraising Progress</span>
                    <span>{Math.round(calculateProgress(disaster.raisedAmount, disaster.targetAmount))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress(disaster.raisedAmount, disaster.targetAmount)}%` }}
                    ></div>
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

                {/* NGO Partner */}
                {disaster.ngoPartner && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-600 font-medium">NGO Partner</div>
                    <div className="text-sm font-semibold text-blue-900">{disaster.ngoPartner}</div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => onDonate(disaster.id)}
                  disabled={disaster.status === 'Completed'}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 ${
                    disaster.status === 'Completed'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>
                    {disaster.status === 'Completed' ? 'Campaign Completed' : 'Donate Now'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDisasters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No disasters found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterList;