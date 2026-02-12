import React from 'react';
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  Heart,
  Users,
  TrendingUp,
  Play,
  Download,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const EducationPage: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'Disaster Preparedness: Essential Guide for Indian Families',
      excerpt: 'Learn how to prepare your family and home for natural disasters common in India.',
      category: 'Preparedness',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/73833/worms-eye-view-shot-of-shelves-73833.jpeg'
    },
    {
      id: 2,
      title: 'Understanding Flood Safety: Before, During, and After',
      excerpt: 'Comprehensive guide to staying safe during flood situations.',
      category: 'Safety',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg'
    },
    {
      id: 3,
      title: 'How Blockchain Ensures Donation Transparency',
      excerpt: 'Learn how our platform uses blockchain technology to track every rupee.',
      category: 'Technology',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Emergency Kit Essentials',
      duration: '4:32',
      thumbnail: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg'
    },
    {
      id: 2,
      title: 'Earthquake Safety Drill',
      duration: '6:15',
      thumbnail: 'https://images.pexels.com/photos/8668129/pexels-photo-8668129.jpeg'
    },
    {
      id: 3,
      title: 'Flood Evacuation Procedures',
      duration: '3:45',
      thumbnail: 'https://images.pexels.com/photos/552774/pexels-photo-552774.jpeg'
    }
  ];

  const preparednessChecklist = [
    { item: 'Emergency contact list', completed: false },
    { item: 'First aid kit and medications', completed: false },
    { item: '72-hour water supply (1 gallon per person per day)', completed: false },
    { item: 'Non-perishable food for 3 days', completed: false },
    { item: 'Battery-powered radio and flashlights', completed: false },
    { item: 'Extra batteries and phone chargers', completed: false },
    { item: 'Cash in small bills', completed: false },
    { item: 'Important documents in waterproof container', completed: false },
    { item: 'Blankets and warm clothing', completed: false },
    { item: 'Personal hygiene items', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Disaster Preparedness & Education
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Learn essential disaster preparedness skills, understand our transparency technology, 
            and discover how micro-donations create maximum impact.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">25+</div>
            <div className="text-gray-600">Educational Articles</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">15+</div>
            <div className="text-gray-600">Safety Videos</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">50K+</div>
            <div className="text-gray-600">People Educated</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-gray-600">Better Prepared</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Articles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Educational Resources</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                  <span>View All</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-6">
                {articles.map((article) => (
                  <div key={article.id} className="flex space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm">{article.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Library */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Safety Training Videos</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                  <span>View All</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="relative group cursor-pointer">
                    <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:bg-opacity-100 transition-all">
                          <Play className="h-6 w-6 text-gray-900" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-3">{video.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* How Micro-Donations Work */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">How Micro-Donations Create Maximum Impact</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Start Small</h3>
                  <p className="text-blue-100 text-sm">
                    Every ₹1 counts. Small donations from many people create massive impact.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Scale Together</h3>
                  <p className="text-blue-100 text-sm">
                    When thousands donate small amounts, we can fund entire relief operations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Track Impact</h3>
                  <p className="text-blue-100 text-sm">
                    See exactly what your donation achieved with our transparent tracking system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Emergency Preparedness Checklist */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Emergency Preparedness</h3>
              </div>
              
              <div className="space-y-3">
                {preparednessChecklist.map((item, index) => (
                  <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {item.item}
                    </span>
                  </label>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Full Checklist</span>
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold text-red-900">Emergency Numbers</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-medium">Police</span>
                  <a href="tel:100" className="text-red-600 font-bold text-lg">100</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-medium">Fire</span>
                  <a href="tel:101" className="text-red-600 font-bold text-lg">101</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-medium">Ambulance</span>
                  <a href="tel:102" className="text-red-600 font-bold text-lg">102</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-medium">Disaster Helpline</span>
                  <a href="tel:108" className="text-red-600 font-bold text-lg">108</a>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Quick Safety Tips</h3>
              
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Keep emergency kit in an easily accessible location</li>
                <li>• Practice evacuation routes with your family</li>
                <li>• Stay informed through official channels</li>
                <li>• Have multiple communication plans</li>
                <li>• Keep important documents waterproof</li>
                <li>• Know your area's specific risks</li>
              </ul>
            </div>

            {/* Resource Downloads */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download Resources</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">Family Emergency Plan</span>
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">Emergency Kit Checklist</span>
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">First Aid Quick Reference</span>
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;