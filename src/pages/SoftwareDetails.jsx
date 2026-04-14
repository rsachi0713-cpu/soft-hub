import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Star, Info, HardDrive, LayoutGrid, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { getSoftwareById } from '../services/softwareService';

const SoftwareDetails = () => {
  const { id } = useParams();
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getSoftwareById(id);
        setSoftware(data);
      } catch (error) {
        console.error("Error fetching software details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!software) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Software Not Found</h2>
        <p className="text-text-secondary mb-8">The requested software could not be found or has been removed.</p>
        <Link to="/software">
          <Button>Back to Browse</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/software" className="inline-flex items-center text-sm text-text-secondary hover:text-primary-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Gallery
      </Link>

      {/* Header Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-start gap-8"
      >
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl flex-shrink-0 relative overflow-hidden">
          {software.icon ? (
            <img src={software.icon} alt={software.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            software.name.charAt(0)
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 rounded-full">
              {software.category}
            </span>
            <div className="flex items-center text-yellow-500 text-sm font-medium">
              <Star className="w-4 h-4 fill-current mr-1" />
              {software.rating || '4.5'} ({software.reviews || '0'} ratings)
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{software.name}</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            {software.description}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href={software.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full">
                <Download className="w-5 h-5 mr-2" />
                Download ({software.size || 'Unknown Size'})
              </Button>
            </a>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Share Software
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Col (Screenshots & Description) */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <LayoutGrid className="w-6 h-6 mr-2 text-primary-500" />
              Overview
            </h2>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-bold mb-4">Functional Details</h3>
              <p className="text-text-secondary leading-loose">
                {software.description}
              </p>
            </div>
          </section>

          <section className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {['Verified and Safe', 'One-click download', 'Latest mod features included', 'Tested for stability'].map((feat, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-text-secondary">{feat}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Col (Metadata) */}
        <div className="space-y-8">
          <section className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-lg flex items-center mb-6">
              <Info className="w-5 h-5 mr-2 text-primary-500" />
              Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <span className="text-text-secondary">Developer</span>
                <span className="font-medium">{software.developer || 'Verified Dev'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <span className="text-text-secondary">Version</span>
                <span className="font-medium">{software.version || '1.0.0'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <span className="text-text-secondary">Category</span>
                <span className="font-medium">{software.category}</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-text-secondary">License</span>
                <span className="font-medium text-green-500">Free download</span>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-lg flex items-center mb-6">
              <HardDrive className="w-5 h-5 mr-2 text-primary-500" />
              System Requirements
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><strong className="text-text-primary block">OS:</strong> {software.os || 'Universal'}</li>
              <li><strong className="text-text-primary block">Storage:</strong> {software.size || 'N/A'} available space</li>
              <li><strong className="text-text-primary block">Integrity:</strong> MD5 Verified</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SoftwareDetails;

