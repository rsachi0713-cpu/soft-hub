import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const SoftwareCard = ({ software }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--panel)] border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] group flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* App Icon Square */}
        <div className={`w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center flex-shrink-0 relative overflow-hidden ${
          software.category === 'Games' ? 'bg-gradient-to-br from-purple-500 to-primary-600' :
          software.category === 'Mobile' ? 'bg-gradient-to-br from-green-400 to-green-600' :
          'bg-gradient-to-br from-primary-400 to-primary-700'
        }`}>
          {software.icon ? (
            <img src={software.icon} alt={software.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-white shadow-sm">
              {software.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-white leading-tight mb-1 group-hover:text-primary-400 transition-colors">
            {software.name}
          </h3>
          <div className="text-[11px] text-text-secondary leading-snug">
            <p>- {software.descLine1 || 'No Ads, Unlocked'}</p>
            <p>- {software.descLine2 || 'Free Download'}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-bold text-white">{software.rating || '4.5'}</span>
        </div>
        
        <Link 
          to={`/software/${software.id}`} 
          className="px-4 py-1.5 rounded-full bg-primary-600 text-white text-xs font-bold hover:bg-primary-500 transition-colors shadow-[0_0_10px_rgba(0,170,255,0.2)]"
        >
          Download
        </Link>
      </div>
    </motion.div>
  );
};

export default SoftwareCard;
