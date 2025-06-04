// frontend/components/Button.tsx
'use client'; // <--- IMPORTANT: Mark as Client Component
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className || ''}`}
      disabled={disabled} // Add disabled prop to handle button state
    >
      {children}
    </button>
  );
};

export default Button;