import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Monitor, Code2, Loader2 } from 'lucide-react';
import SoftwareCard from '../components/SoftwareCard';
import { getSoftware } from '../services/softwareService';

// Helper to render sections
const Section = ({ icon: Icon, title, data, catLink }) => (
  <section className="mb-14">
    <div className="flex justify-between items-center mb-6 px-4">
      <div className="flex items-center space-x-3 text-white font-bold text-lg md:text-xl tracking-wide">
        <Icon className="w-6 h-6 text-primary-500" />
        <span>{title}</span>
      </div>
      <Link 
        to={`/software?cat=${catLink}`} 
        className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
      >
        View All
      </Link>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {data.map(app => (
        <SoftwareCard key={app.id} software={app} />
      ))}
    </div>
    {data.length === 0 && (
      <p className="px-4 text-text-secondary italic text-sm">No items added to this category yet.</p>
    )}
  </section>
);

const Home = () => {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSoftware();
        setSoftware(data);
      } catch (error) {
        console.error("Error fetching software:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mobileMods = software.filter(app => app.category === 'Mobile').slice(0, 4);
  const games = software.filter(app => app.category === 'Games').slice(0, 4);
  const pcApps = software.filter(app => app.category === 'PC').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      {/* Hero Banner matched exactly to screenshot */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-14 relative overflow-hidden rounded-3xl border border-white/5 shadow-2xl min-h-[380px] md:min-h-[420px] flex items-center bg-[var(--panel)]"
      >
        {/* Background Image injected via CSS variable - loaded from public/hero.png */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        
        {/* Content Wrapper */}
        <div className="relative z-10 px-8 md:px-16 py-12 w-full lg:w-3/5">
          <h3 className="text-[#00ff88] font-bold text-xs md:text-sm tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]">
            UNLEASH THE POWER!
          </h3>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-4">
            Download Your Favorite Modded Apps & Games
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-sm">
            Safe, Verified, and Always Updated Mods for Mobile and PC.
          </p>
          <button className="btn-glow px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase text-black">
            DOWNLOAD NOW
          </button>
        </div>
        
        {/* Carousel indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          <div className="w-6 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.6)]"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>
      </motion.div>

      {/* Structured Layout corresponding to the image logic */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <Section icon={Code2} title="MOBILE MOD APK" data={mobileMods} catLink="mobile" />
          <Section icon={Gamepad2} title="GAMES" data={games} catLink="games" />
          
          {/* PC Section mapped below or aside - responsive layout wraps perfectly */}
          <Section icon={Monitor} title="PC MOD APPS" data={pcApps} catLink="pc" />
        </div>
      )}

    </div>
  );
};

export default Home;

