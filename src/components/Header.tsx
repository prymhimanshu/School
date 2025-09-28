import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null); // Initialize loggedUser state
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('loggedUser');
      if (raw) setLoggedUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    const handler = (ev: Event) => {
      const ce = ev as CustomEvent;
      if (ce.detail) setLoggedUser(ce.detail);
      else setLoggedUser(null);
    };
    window.addEventListener('authChanged', handler as EventListener);
    return () => window.removeEventListener('authChanged', handler as EventListener);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    navigate('/');
    window.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src="assest/logo.png" alt="Logo" className="h-10 w-auto mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Shakti Shanti Academy</h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { navigate(`/search?q=${encodeURIComponent(searchQuery)}`); } }}
                placeholder="Search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">About</Link>
            <Link to="/team" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">Team</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">Gallery</Link>
            <Link to="/notices" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">Notices</Link>
            <Link to="/neev" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">NEEV</Link>
            <Link to="/contact" className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">Contact</Link>

            {loggedUser && (
              <button
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={mobileSearchQuery}
                    onChange={e => setMobileSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { setIsMenuOpen(false); navigate(`/search?q=${encodeURIComponent(mobileSearchQuery)}`); } }}
                    placeholder="Search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <Link to="/" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">About</Link>
              <Link to="/team" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">Team</Link>
              <Link to="/gallery" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">Gallery</Link>
               <Link to="/notices" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">Notices</Link>
              <Link to="/neev" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">NEEV</Link>
              <Link to="/contact" className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium transition-colors">Contact</Link>

              {loggedUser && (
                <button
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="text-gray-700 hover:text-sky-600 block px-3 py-2 text-base font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
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