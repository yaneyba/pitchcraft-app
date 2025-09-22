import React from 'react';
import { PitchResultProps } from '../types';

const PitchResult: React.FC<PitchResultProps> = ({ 
  pitch, 
  style, 
  originalInput, 
  onAnalyze, 
  isAnalyzing, 
  onSuggestMarketing, 
  isSuggestingMarketing, 
  credits 
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mt-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">
          Your <span className="text-indigo-500">{style}</span>
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto sm:space-x-2 space-y-2 sm:space-y-0">
          <button 
            onClick={handleCopy} 
            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center" 
            title="Copy Text"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="sm:hidden ml-2 text-gray-800 dark:text-gray-200">Copy Pitch</span>
          </button>
          
          <button 
            onClick={() => onAnalyze(pitch)} 
            disabled={isAnalyzing || credits === 0}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors text-white text-sm font-semibold flex items-center disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "✨ Analyze Pitch"}
          </button>
          
          <button 
            onClick={() => onSuggestMarketing(originalInput)} 
            disabled={isSuggestingMarketing || credits === 0}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors text-white text-sm font-semibold flex items-center disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSuggestingMarketing ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "✨ Suggest Angles"}
          </button>
        </div>
      </div>
      
      <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">{pitch}</p>
      </div>
      
      {credits === 0 && (
        <p className="text-center text-red-500 mt-4 text-sm">
          You're out of credits! Purchase more to analyze pitches or get marketing suggestions.
        </p>
      )}
    </div>
  );
};

export default PitchResult;