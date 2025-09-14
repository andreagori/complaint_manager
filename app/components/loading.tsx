import React from 'react';

interface LoadingProps {
  isVisible: boolean;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  isVisible, 
  message 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay con blur y fondo negro con opacidad */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Spinner centrado */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-8 border-gray-300 border-t-fuchsia-600 rounded-full animate-spin"></div>
        {message && (
          <p className="text-white font-medium mt-4 text-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;