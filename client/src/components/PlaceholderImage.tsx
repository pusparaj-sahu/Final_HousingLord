import React from 'react';
import { FaHome } from 'react-icons/fa';

interface PlaceholderImageProps {
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ className = '' }) => {
  return (
    <div 
      className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      <FaHome className="w-12 h-12 text-gray-400 dark:text-gray-500" />
    </div>
  );
};

export default PlaceholderImage; 