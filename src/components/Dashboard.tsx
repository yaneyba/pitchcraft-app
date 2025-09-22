import React from 'react';
import { DashboardProps } from '../types';

const Dashboard: React.FC<DashboardProps> = ({ user, credits, history, onBuyCredits, onViewPitch }) => (
  <div className="w-full max-w-6xl p-4 sm:p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome back, {user?.name}!</h2>

    {/* Stats and Buy Credits */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-4xl font-bold text-indigo-500">{credits}</p>
        <p className="text-gray-600 dark:text-gray-400">Credits Remaining</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-4xl font-bold text-teal-500">{history.length}</p>
        <p className="text-gray-600 dark:text-gray-400">Pitches Generated</p>
      </div>
      <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl border border-green-500/50 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Need more credits?</h3>
        <button onClick={() => onBuyCredits(10)} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-200 hover:scale-105">
          Buy 10 Credits
        </button>
      </div>
    </div>

    {/* Pitch History */}
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Pitch History</h3>
    <div className="bg-gray-100 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-2 p-4 max-h-[45vh] overflow-y-auto">
        {history.length > 0 ? history.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="w-full">
              <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.style}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm truncate mt-1">Input: {item.input}</p>
            </div>
            <button onClick={() => onViewPitch(item)} className="bg-gray-200 dark:bg-gray-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm mt-3 sm:mt-0 w-full sm:w-auto">
              View Pitch
            </button>
          </div>
        )) : (
          <p className="text-gray-500 dark:text-gray-500 text-center py-12">You haven't generated any pitches yet.</p>
        )}
      </div>
    </div>
  </div>
);

export default Dashboard;