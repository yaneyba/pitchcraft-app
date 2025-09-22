import React from 'react';
import { HeaderProps } from '../types';
import ThemeToggle from './ThemeToggle';

const Header: React.FC<HeaderProps> = ({ user, credits, onLogin, onLogout, theme, toggleTheme }) => (
  <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 fixed top-0 left-0 right-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">PitchCraft</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {user ? (
          <>
            <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {credits} <span className="hidden sm:inline ml-1">Credits</span>
            </div>
            <button onClick={onLogout} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base">
              Logout
            </button>
          </>
        ) : (
          <button onClick={onLogin} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105 text-sm sm:text-base">
            Log In / Sign Up
          </button>
        )}
      </div>
    </div>
  </header>
);

export default Header;