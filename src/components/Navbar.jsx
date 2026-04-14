import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const saved = localStorage.getItem('softHubUser');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    // Listen for custom auth events from Login/Logout
    window.addEventListener('authChange', loadUser);
    return () => window.removeEventListener('authChange', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('softHubUser');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0B1121]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Custom 'S' Logo SVG */}
              <svg viewBox="0 0 40 40" className="w-10 h-10 text-primary-500 group-hover:scale-105 transition-transform">
                <path d="M12 28L20 20L12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M28 28L20 20L28 12" stroke="#00ff88" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-widest text-white">SOFT</span>
              <span className="text-xl font-bold tracking-widest text-white">HUB</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-2 bg-surface px-2 py-1 rounded-full border border-white/5 shadow-inner">
            <Link to="/" className="nav-pill hover:bg-white/10 text-white bg-white/5">HOME</Link>
            <Link to="/software?cat=mobile" className="nav-pill">MOBILE MOD APK</Link>
            <Link to="/software?cat=games" className="nav-pill">GAMES</Link>
            <Link to="/software?cat=pc" className="nav-pill">PC MOD APPS</Link>
            <Link to="/software" className="nav-pill flex items-center gap-2 text-text-secondary">
              <Search className="w-4 h-4" /> SEARCH
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-primary-500 transition-colors">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-white group-hover:text-primary-400">
                    {user.name}
                  </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-colors border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-surface items-center justify-center text-text-secondary border border-white/5 hover:text-white transition-colors cursor-pointer">
                  <User className="w-5 h-5" />
                </div>
                <Link 
                  to="/login"
                  className="px-6 py-2.5 rounded-full blue-glow text-sm font-bold tracking-wide"
                >
                  LOGIN/REGISTER
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
