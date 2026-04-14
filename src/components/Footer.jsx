import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Send, GripHorizontal } from 'lucide-react'; // Using Grip as discord placeholder

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[var(--surface)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {/* Deep dark container matching image */}
        <div className="bg-[var(--panel)] border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
             <svg viewBox="0 0 40 40" className="w-12 h-12 text-primary-500">
                <path d="M12 28L20 20L12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M28 28L20 20L28 12" stroke="#00ff88" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold tracking-widest text-white">SOFT</span>
              <span className="text-2xl font-bold tracking-widest text-white">HUB</span>
            </div>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col text-center md:text-left">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Sitemap</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-text-secondary">
              <Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
              <Link to="/dmca" className="hover:text-primary-400 transition-colors">DMCA</Link>
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Social icons & Copy */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex space-x-3">
              {[Facebook, Twitter, Send, GripHorizontal].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-600 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white transition-all shadow-lg hover:shadow-primary-500/50">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-text-secondary">
              Copyright {new Date().getFullYear()} Soft Hub
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
