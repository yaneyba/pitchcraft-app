import React from 'react';
import { DashboardProps } from '../../domain/types';

const Dashboard: React.FC<DashboardProps> = ({ user, credits, history, onBuyCredits, onViewPitch, onDeletePitch }) => (
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
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Pitch History</h3>
      {history.length > 0 && (
        <button 
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "pitchcraft-history.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
          className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export History
        </button>
      )}
    </div>
    <div className="bg-gray-100 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-2 p-4 max-h-[45vh] overflow-y-auto">
        {history.length > 0 ? history.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="w-full">
              <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.style}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm truncate mt-1">Input: {item.input}</p>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
              <button onClick={() => onViewPitch(item)} className="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                View Pitch
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this pitch?')) {
                    onDeletePitch(item.id!);
                  }
                }}
                className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                title="Delete pitch"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        )) : (
          <p className="text-gray-500 dark:text-gray-500 text-center py-12">You haven't generated any pitches yet.</p>
        )}
      </div>
    </div>
  </div>
);

export default Dashboard;