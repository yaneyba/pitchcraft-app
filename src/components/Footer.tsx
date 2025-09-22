import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700/50 mt-16">
    <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-0">
        &copy; 2025 PitchCraft. All rights reserved.
      </p>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          Twitter
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          LinkedIn
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;