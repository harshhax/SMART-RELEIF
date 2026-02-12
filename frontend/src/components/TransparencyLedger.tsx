import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Eye,
  ExternalLink,
  Download,
  Check,
  Clock,
  AlertCircle,
  ChevronDown,
  Copy,
  Hash
} from 'lucide-react';
import { recentDonations, disasters, ngos } from '../data/mockData';
import { formatCurrency, formatDateTime, generateTransactionHash } from '../utils/formatters';

const TransparencyLedger: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  // Generate mock transactions with more details
  const transactions = [
    ...recentDonations.map(donation => {
      const disaster = disasters.find(d => d.id === donation.disasterId);
      const ngo = ngos.find(n => n.name === disaster?.ngoPartner);
      return {
        ...donation,
        disaster,
        ngo,
        type: 'donation',
        status: 'confirmed',
        blockHeight: Math.floor(Math.random() * 1000000),
        gasUsed: Math.floor(Math.random() * 50000) + 20000,
        confirmations: Math.floor(Math.random() * 50) + 10
      };
    }),
    // Add fund allocation transactions
    {
      id: 'alloc_001',
      type: 'allocation',
      disasterId: '1',
      amount: 50000,
      currency: 'INR',
      timestamp: '2024-01-21T14:00:00Z',
      transactionHash: generateTransactionHash(),
      status: 'confirmed',
      description: 'Fund allocation for emergency supplies',
      allocatedTo: 'Kerala Relief Foundation',
      purpose: 'Emergency food and water supplies',
      blockHeight: 999123,
      gasUsed: 35000,
      confirmations: 25
    },
    {
      id: 'alloc_002',
      type: 'allocation',
      disasterId: '2',
      amount: 25000,
      currency: 'INR',
      timestamp: '2024-01-21T12:30:00Z',
      transactionHash: generateTransactionHash(),
      status: 'pending',
      description: 'Fund allocation for medical supplies',
      allocatedTo: 'Mountain Rescue Trust',
      purpose: 'Emergency medical aid',
      blockHeight: 999089,
      gasUsed: 42000,
      confirmations: 8
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = selectedFilter === 'All' || tx.type === selectedFilter.toLowerCase();
    const matchesSearch = 
      tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.disaster?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.allocatedTo?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  const renderTransactionDetails = (tx: any) => (
    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Transaction Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Block Height:</span>
              <span className="font-mono">{tx.blockHeight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gas Used:</span>
              <span className="font-mono">{tx.gasUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Confirmations:</span>
              <span className="font-mono">{tx.confirmations}</span>
            </div>
            {tx.type === 'donation' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{tx.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impact:</span>
                  <span className="text-green-600 text-xs">{tx.impact}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            {tx.type === 'donation' ? 'Disaster Information' : 'Allocation Details'}
          </h4>
          <div className="space-y-2 text-sm">
            {tx.type === 'donation' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disaster:</span>
                  <span>{tx.disaster?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>{tx.disaster?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NGO Partner:</span>
                  <span>{tx.disaster?.ngoPartner}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Allocated To:</span>
                  <span>{tx.allocatedTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="text-right">{tx.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="text-right text-xs">{tx.description}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Transaction Hash:</span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="text-xs bg-white px-2 py-1 rounded border font-mono">
              {tx.transactionHash}
            </code>
            <button
              onClick={() => copyToClipboard(tx.transactionHash)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Transparency Ledger
              </h1>
              <p className="text-gray-600">Blockchain-powered donation tracking</p>
            </div>
          </div>
          <p className="text-xl text-gray-600">
            Every donation and fund allocation is recorded on an immutable ledger for complete transparency
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Transparent</h3>
            <p className="text-gray-600">Every transaction is publicly verifiable and immutable</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Allocations</h3>
            <p className="text-gray-600">All fund distributions are verified by our NGO partners</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Monitor your donations in real-time from source to impact</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by hash, disaster, or NGO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Transactions</option>
                  <option value="Donation">Donations</option>
                  <option value="Allocation">Fund Allocations</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-5 w-5" />
              <span>Export Records</span>
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <p className="text-gray-600">Real-time ledger of all donations and allocations</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedTransaction(expandedTransaction === tx.id ? null : tx.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'donation' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {tx.type === 'donation' ? (
                        <Download className={`h-5 w-5 ${tx.type === 'donation' ? 'text-blue-600' : 'text-green-600'}`} />
                      ) : (
                        <ExternalLink className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">
                          {tx.type === 'donation' ? 'Donation Received' : 'Fund Allocated'}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(tx.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{formatDateTime(tx.timestamp)}</span>
                        <span>•</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          {tx.transactionHash.slice(0, 10)}...{tx.transactionHash.slice(-8)}
                        </code>
                        {tx.type === 'donation' && tx.disaster && (
                          <>
                            <span>•</span>
                            <span>{tx.disaster.title}</span>
                          </>
                        )}
                        {tx.type === 'allocation' && (
                          <>
                            <span>•</span>
                            <span>{tx.allocatedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {formatCurrency(tx.amount)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tx.confirmations} confirmations
                      </div>
                    </div>
                    
                    <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      expandedTransaction === tx.id ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedTransaction === tx.id && renderTransactionDetails(tx)}
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Blockchain Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">&lt; 5 sec</div>
              <div className="text-blue-100">Average Confirmation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">Zero</div>
              <div className="text-blue-100">Transaction Fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyLedger;