import React, { useState } from 'react';
import { PitchFormProps } from '../types';
import { PITCH_STYLES, PitchStyle } from '../utils/helpers';

const PitchForm: React.FC<PitchFormProps> = ({ credits, onGenerate, isLoading }) => {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState<PitchStyle>(PITCH_STYLES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credits > 0 && input.trim()) {
      onGenerate(input, style);
    }
  };

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Generate Your Pitch</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Enter a URL or describe your app to get started.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="app-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            App URL or Description
          </label>
          <textarea
            id="app-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., https://myawesomeapp.com or 'A mobile app that connects local gardeners...'"
            className="w-full h-28 p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
            required
          />
        </div>
        
        <div>
          <label htmlFor="pitch-style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pitch Style
          </label>
          <select
            id="pitch-style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          >
            {PITCH_STYLES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || credits === 0 || !input.trim()}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 group"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "✨ Generate Pitch (1 Credit)"
          )}
        </button>
        
        {credits === 0 && (
          <p className="text-center text-red-500 mt-2">
            You're out of credits! Please purchase more to continue.
          </p>
        )}
      </form>
    </div>
  );
};

export default PitchForm;