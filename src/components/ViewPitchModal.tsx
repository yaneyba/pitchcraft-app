import React from 'react';
import { ViewPitchModalProps } from '../types';

const ViewPitchModal: React.FC<ViewPitchModalProps> = ({ pitch, onClose }) => {
  if (!pitch) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-8 m-4" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your <span className="text-indigo-500">{pitch.style}</span></h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
          <p>{pitch.pitch}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPitchModal;