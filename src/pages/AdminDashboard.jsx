import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LayoutDashboard, Settings, LogOut, X, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { getSoftware, addSoftware, updateSoftware, deleteSoftware } from '../services/softwareService';

const categories = ['Mobile', 'Games', 'PC', 'Developer Tools', 'Design', 'Utilities', 'Security'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('software');
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile',
    description: '',
    descLine1: '',
    descLine2: '',
    rating: '4.5',
    reviews: '0',
    developer: '',
    version: '1.0.0',
    size: '',
    os: '',
    icon: '',
    downloadUrl: '',
    downloads: 0
  });

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    setLoading(true);
    try {
      const data = await getSoftware();
      setSoftwareList(data);
    } catch (error) {
      console.error("Error fetching software:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (software = null) => {
    if (software) {
      setEditingId(software.id);
      setFormData({
        name: software.name || '',
        category: software.category || 'Mobile',
        description: software.description || '',
        descLine1: software.descLine1 || '',
        descLine2: software.descLine2 || '',
        rating: software.rating || '4.5',
        reviews: software.reviews || '0',
        developer: software.developer || '',
        version: software.version || '1.0.0',
        size: software.size || '',
        os: software.os || '',
        icon: software.icon || '',
        downloadUrl: software.downloadUrl || '',
        downloads: software.downloads || 0
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: 'Mobile',
        description: '',
        descLine1: '',
        descLine2: '',
        rating: '4.5',
        reviews: '0',
        developer: '',
        version: '1.0.0',
        size: '',
        os: '',
        icon: '',
        downloadUrl: '',
        downloads: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-api-key';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      alert("Firebase is not configured. Please add your credentials to a .env file.");
      return;
    }

    setIsSubmitting(true);
    
    // Create a timeout promise
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timed out. Check your internet connection or Firebase rules.")), 10000)
    );

    try {
      if (editingId) {
        await Promise.race([updateSoftware(editingId, formData), timeout]);
      } else {
        await Promise.race([addSoftware(formData), timeout]);
      }
      await fetchSoftware();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving software:", error);
      alert(error.message || "Failed to save software. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this software?")) {
      try {
        await deleteSoftware(id);
        await fetchSoftware();
      } catch (error) {
        console.error("Error deleting software:", error);
        alert("Failed to delete software.");
      }
    }
  };

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
              <h3 className="font-bold text-text-primary">Admin User</h3>
              <p className="text-xs text-text-secondary">admin@softhub.com</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('software')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'software' ? 'bg-primary-900/50 text-white font-medium' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Manage Software</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary-900/50 text-white font-medium' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <div className="pt-4 mt-4 border-t border-gray-800">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-900/20 transition-colors cursor-pointer">
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
          {!isConfigured && (
            <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-2xl text-red-200">
              <p className="font-bold mb-1">Firebase Configuration Missing!</p>
              <p className="text-sm">Please create a <strong>.env</strong> file in the project root and add your VITE_FIREBASE_API_KEY and other credentials from your Firebase Console.</p>
            </div>
          )}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Software List</h2>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </Button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="pb-4 font-semibold text-text-secondary">Name</th>
                    <th className="pb-4 font-semibold text-text-secondary">Category</th>
                    <th className="pb-4 font-semibold text-text-secondary">Downloads</th>
                    <th className="pb-4 font-semibold text-text-secondary text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {softwareList.length > 0 ? (
                    softwareList.map((item) => (
                      <tr key={item.id} className="border-b border-gray-800 last:border-0 hover:bg-surface/50 transition-colors">
                        <td className="py-4">
                          <div className="font-medium text-text-primary">{item.name}</div>
                        </td>
                        <td className="py-4 text-text-secondary">{item.category}</td>
                        <td className="py-4 text-text-secondary">{item.downloads || 0}</td>
                        <td className="py-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenModal(item)}
                            className="p-2 text-text-secondary hover:text-primary-500 transition-colors rounded-lg hover:bg-surface"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-text-secondary hover:text-red-500 transition-colors rounded-lg hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-20 text-center text-text-secondary">
                        No software added yet. Click "Add New" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Modal Backdrop and Content */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#151C2C] border border-white/10 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editingId ? 'Edit Software' : 'Add New Software'}</h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                  <textarea 
                    required
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Desc Line 1 (List View)</label>
                    <input 
                      name="descLine1"
                      value={formData.descLine1}
                      onChange={handleInputChange}
                      placeholder="e.g. No Ads, Unlocked"
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Desc Line 2 (List View)</label>
                    <input 
                      name="descLine2"
                      value={formData.descLine2}
                      onChange={handleInputChange}
                      placeholder="e.g. Free Download"
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Rating (0-5)</label>
                    <input 
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Developer</label>
                    <input 
                      name="developer"
                      value={formData.developer}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Version</label>
                    <input 
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Size (e.g. 420 MB)</label>
                    <input 
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">OS (e.g. Android 8+)</label>
                    <input 
                      name="os"
                      value={formData.os}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Icon URL</label>
                  <input 
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="https://example.com/icon.png"
                    className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Download URL</label>
                  <input 
                    name="downloadUrl"
                    required
                    value={formData.downloadUrl}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C2438] border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button type="submit" isLoading={isSubmitting}>
                    {editingId ? 'Update Software' : 'Add Software'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
