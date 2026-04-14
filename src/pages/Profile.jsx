import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', avatar: null });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('softHubUser');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary local URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('softHubUser', JSON.stringify(user));
      window.dispatchEvent(new Event('authChange'));
      setIsSaving(false);
      alert('Profile successfully updated!');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--panel)] border border-white/5 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-900 border-b border-white/10" />
        
        <div className="px-8 pb-8">
          <form onSubmit={handleSave}>
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-8 flex justify-between items-end">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-[var(--surface)] border-4 border-[var(--panel)] flex items-center justify-center overflow-hidden shadow-xl">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-text-secondary" />
                  )}
                </div>
                {/* Upload Overlay */}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-3xl cursor-pointer">
                  <Camera className="w-6 h-6 text-white mb-1" />
                  <span className="text-xs font-medium text-white">Change</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              
              <Button type="submit" isLoading={isSaving} className="blue-glow rounded-full px-6">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-text-secondary mb-2">Display Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={user.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 bg-[var(--surface)] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-text-secondary mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled // usually disabled in mockups unless explicitly changing it
                    value={user.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 bg-[var(--surface)]/50 border border-white/5 rounded-xl text-gray-400 cursor-not-allowed font-medium"
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">Email addresses cannot be changed directly.</p>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
