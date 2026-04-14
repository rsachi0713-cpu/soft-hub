import React, { useState } from 'react';
import { Plus, Edit2, Trash2, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const mockData = [
  { id: '1', name: 'CodeAssist Pro', category: 'Developer Tools', downloads: 1420 },
  { id: '2', name: 'DesignFlow', category: 'Design', downloads: 890 },
  { id: '3', name: 'DataSync', category: 'Utilities', downloads: 350 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('software');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="glass-card rounded-2xl p-6 sticky top-28">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h3 className="font-bold">Admin User</h3>
              <p className="text-xs text-text-secondary">admin@softhub.com</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('software')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'software' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 font-medium' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Manage Software</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 font-medium' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Software List</h2>
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="pb-4 font-semibold text-text-secondary">Name</th>
                  <th className="pb-4 font-semibold text-text-secondary">Category</th>
                  <th className="pb-4 font-semibold text-text-secondary">Downloads</th>
                  <th className="pb-4 font-semibold text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="py-4">
                      <div className="font-medium text-text-primary">{item.name}</div>
                    </td>
                    <td className="py-4 text-text-secondary">{item.category}</td>
                    <td className="py-4 text-text-secondary">{item.downloads}</td>
                    <td className="py-4 text-right space-x-2">
                      <button className="p-2 text-text-secondary hover:text-primary-500 transition-colors rounded-lg hover:bg-surface">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-text-secondary hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
