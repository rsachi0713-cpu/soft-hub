import React from 'react';
import { useParams } from 'react-router-dom';
import { Download, Star, Info, HardDrive, LayoutGrid, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const SoftwareDetails = () => {
  const { id } = useParams();

  // Mock data for the view
  const software = {
    id,
    name: 'CodeAssist Pro',
    description: 'Advanced IDE with AI completions based on machine learning models. Built for modern web development, it supports all major frameworks and provides out-of-the-box debugging for serverless environments. Supercharge your workflow with 100+ native plugins.',
    rating: 4.9,
    reviews: 1240,
    developer: 'Acme Software',
    version: '2.4.1',
    size: '420 MB',
    os: 'Windows 10/11, macOS',
    category: 'Developer Tools',
    screenshots: [1, 2, 3]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-start gap-8"
      >
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl flex-shrink-0">
          {software.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 rounded-full">
              {software.category}
            </span>
            <div className="flex items-center text-yellow-500 text-sm font-medium">
              <Star className="w-4 h-4 fill-current mr-1" />
              {software.rating} ({software.reviews} ratings)
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{software.name}</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            {software.description}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              <Download className="w-5 h-5 mr-2" />
              Download Free ({software.size})
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Official Website
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
              Gallery
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {software.screenshots.map(num => (
                <div key={num} className="snap-center flex-shrink-0 w-80 h-48 bg-surface rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center text-text-secondary">
                  Screenshot {num}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {['AI Powered completely offline', 'Real-time collaborative editing', 'Integrated remote debugging tools', 'Customizable themes and extensions'].map((feat, i) => (
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
                <span className="font-medium">{software.developer}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <span className="text-text-secondary">Version</span>
                <span className="font-medium">{software.version}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <span className="text-text-secondary">Last Updated</span>
                <span className="font-medium">2 days ago</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-text-secondary">License</span>
                <span className="font-medium text-green-500">Free to use</span>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-lg flex items-center mb-6">
              <HardDrive className="w-5 h-5 mr-2 text-primary-500" />
              System Requirements
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><strong className="text-text-primary block">OS:</strong> {software.os}</li>
              <li><strong className="text-text-primary block">Storage:</strong> {software.size} available space</li>
              <li><strong className="text-text-primary block">Memory:</strong> 4 GB RAM minimum</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SoftwareDetails;
