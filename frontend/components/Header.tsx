// frontend/components/Header.tsx 
'use client'; //  we marked as Client Component just in case we decide it will contain interactive elements

import React from 'react';
import Link from 'next/link'; // For client-side navigation

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
          VisionaryAI
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
          {/* Placeholder We'll add a login/signup link here later */}
        </div>
      </nav>
    </header>
  );
};

export default Header;