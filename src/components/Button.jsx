import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', isLoading = false, className = '', ...props }) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg hover:shadow-primary-500/30',
    secondary: 'bg-surface hover:bg-gray-200 dark:hover:bg-gray-800 text-text-primary',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600/10',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-text-primary'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const sizeClass = props.size ? sizes[props.size] : sizes.md;

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizeClass} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={isLoading || props.disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
