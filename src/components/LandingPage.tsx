import React from 'react';
import { LandingPageProps } from '../types';

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => (
  <div className="w-full animate-fade-in">
    {/* Hero Section */}
    <section className="text-center pt-8 md:pt-10 pb-16 md:pb-20">
      <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        Craft the Perfect Pitch, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Instantly</span>.
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
        Stop guessing what investors want to hear. PitchCraft uses AI to analyze your app and generate compelling pitches that get results.
      </p>
      <button 
        onClick={onLogin} 
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-200 hover:scale-105 shadow-lg shadow-indigo-600/30"
      >
        Get Your Free Pitch
      </button>
      <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">5 free credits upon signup!</p>
    </section>

    {/* Features Section */}
    <section className="py-20">
      <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a3.375 3.375 0 00-2.455-2.456L12.75 18l1.126-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.126a3.375 3.375 0 002.456 2.456L20.25 18l-1.126.398a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Generation</h3>
          <p className="text-gray-600 dark:text-gray-400">Simply provide a URL or a description, and our AI generates a tailored pitch in seconds.</p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multiple Pitch Styles</h3>
          <p className="text-gray-600 dark:text-gray-400">From elevator pitches to investor decks, choose the perfect format for any audience.</p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Instant VC Feedback</h3>
          <p className="text-gray-600 dark:text-gray-400">Get your pitch analyzed by an AI Venture Capitalist to identify strengths and weaknesses.</p>
        </div>
      </div>
    </section>
  </div>
);

export default LandingPage;