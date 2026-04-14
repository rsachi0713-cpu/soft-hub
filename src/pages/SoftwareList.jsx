import React, { useState, useEffect } from 'react';
import SoftwareCard from '../components/SoftwareCard';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { getSoftware } from '../services/softwareService';

const categories = ['All', 'Mobile', 'Games', 'PC', 'Developer Tools', 'Design', 'Utilities', 'Security'];

const SoftwareList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSoftware();
        setSoftware(data);
      } catch (error) {
        console.error("Error fetching software list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = activeCategory === 'All' 
    ? software 
    : software.filter(app => app.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Software</h1>
          <p className="text-text-secondary">Explore modded applications and games</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary bg-surface px-4 py-2 rounded-xl">
            <Filter className="w-4 h-4" />
            <span>Sort by:</span>
            <select className="bg-transparent font-medium text-text-primary focus:outline-none">
              <option>Newest</option>
              <option>Popularity</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass-card p-6 rounded-2xl sticky top-28">
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary-600 font-medium text-white shadow-md' 
                        : 'text-text-secondary hover:bg-surface hover:text-primary-500'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map(app => (
                  <SoftwareCard key={app.id} software={app} />
                ))}
              </div>
              
              {filteredData.length === 0 && (
                <div className="text-center py-20 text-text-secondary">
                  No software found in this category.
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SoftwareList;

