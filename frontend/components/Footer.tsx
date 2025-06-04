// frontend/components/Footer.tsx
'use client'; // we marked as Client Component in case we decide it will contain interactive elements

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} VisionaryAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;