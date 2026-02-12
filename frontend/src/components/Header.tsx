import React, { useState } from 'react';
import { Menu, X, Heart, User, Bell, Shield } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: any;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onNavigate, 
  user, 
  onLogin, 
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'disasters', label: 'Active Disasters' },
    { id: 'impact', label: 'Impact Dashboard' },
    { id: 'transparency', label: 'Transparency' },
    { id: 'education', label: 'Learn' },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Smart Relief</h1>
              <p className="text-xs text-gray-500">Disaster Relief Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium mt-4"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;