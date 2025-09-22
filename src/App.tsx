import React, { useState } from 'react';
import { User, GeneratedPitch } from './types';
import { useTheme } from './hooks/useTheme';
import { generatePitch, analyzePitch, generateMarketingSuggestions } from './utils/api';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
// Note: Other components will be added as they're created

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSuggestingMarketing, setIsSuggestingMarketing] = useState<boolean>(false);
  const [generatedPitch, setGeneratedPitch] = useState<GeneratedPitch | null>(null);
  const [pitchAnalysis, setPitchAnalysis] = useState<string | null>(null);
  const [marketingSuggestions, setMarketingSuggestions] = useState<string | null>(null);
  const [pitchHistory, setPitchHistory] = useState<GeneratedPitch[]>([]);
  const [activeView, setActiveView] = useState<string>('generator');
  const [error, setError] = useState<string | null>(null);
  const [selectedPitch, setSelectedPitch] = useState<GeneratedPitch | null>(null);
  
  const { theme, toggleTheme } = useTheme();

  const handleLogin = () => {
    setUser({ name: 'Demo User' });
    setCredits(5);
  };

  const handleLogout = () => {
    setUser(null);
    setCredits(0);
    setGeneratedPitch(null);
    setPitchAnalysis(null);
    setMarketingSuggestions(null);
    setActiveView('generator');
    setPitchHistory([]);
  };

  const handleGeneratePitch = async (input: string, style: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPitch(null);
    setPitchAnalysis(null);
    setMarketingSuggestions(null);

    try {
      const pitchText = await generatePitch(input, style);
      const newPitchData = { input, style, pitch: pitchText };
      setGeneratedPitch(newPitchData);
      setPitchHistory(prev => [newPitchData, ...prev]);
      setCredits(prev => prev - 1);
    } catch (err: any) {
      setError(err.message || 'Failed to generate pitch');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzePitch = async (pitchToAnalyze: string) => {
    if (credits <= 0) return;
    setIsAnalyzing(true);
    setError(null);
    setPitchAnalysis(null);

    try {
      const analysisText = await analyzePitch(pitchToAnalyze);
      setPitchAnalysis(analysisText);
      setCredits(prev => prev - 1);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze pitch');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSuggestMarketing = async (originalInput: string) => {
    if (credits <= 0) return;
    setIsSuggestingMarketing(true);
    setError(null);
    setMarketingSuggestions(null);

    try {
      const suggestionsText = await generateMarketingSuggestions(originalInput);
      setMarketingSuggestions(suggestionsText);
      setCredits(prev => prev - 1);
    } catch (err: any) {
      setError(err.message || 'Failed to generate marketing suggestions');
    } finally {
      setIsSuggestingMarketing(false);
    }
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white font-sans transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
      
      <Header 
        user={user} 
        credits={credits} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="container mx-auto pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        {!user ? (
          <LandingPage onLogin={handleLogin} />
        ) : (
          <div>
            {/* Navigation tabs would go here */}
            <div className="flex space-x-4 mb-8 relative z-10">
              <button 
                onClick={() => setActiveView('generator')} 
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  activeView === 'generator' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Pitch Generator
              </button>
              <button 
                onClick={() => setActiveView('dashboard')} 
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  activeView === 'dashboard' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Dashboard
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg w-full max-w-2xl mt-4 text-center">
                <p><strong>Oops! Something went wrong.</strong></p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {activeView === 'generator' ? (
              <div>
                {/* PitchForm component would go here */}
                <div className="text-center">
                  <p>Pitch Generator will be implemented with remaining components</p>
                </div>
              </div>
            ) : (
              <div>
                {/* Dashboard component would go here */}
                <div className="text-center">
                  <p>Dashboard will be implemented with remaining components</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;