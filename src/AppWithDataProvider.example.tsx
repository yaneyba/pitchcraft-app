/**
 * Example of how to integrate DataProviderFactory into the existing App component
 * This demonstrates how to refactor the current state management to use the data providers
 */

import { useState, useEffect } from 'react';
import { User, GeneratedPitch } from './types';
import { DataProviderFactory } from './providers';

// Import existing components
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PitchForm from './components/PitchForm';
import PitchResult from './components/PitchResult';
import PitchAnalysis from './components/PitchAnalysis';
import MarketingSuggestions from './components/MarketingSuggestions';
import Dashboard from './components/Dashboard';
import ViewPitchModal from './components/ViewPitchModal';
import ApiError from './components/ApiError';

export default function AppWithDataProvider() {
  // Initialize data provider
  const dataProvider = DataProviderFactory.getInstance();

  // State management (can be gradually migrated to providers)
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load user data
      const currentUser = await dataProvider.user.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        
        // Load user's credits
        const userCredits = await dataProvider.credits.getCredits(currentUser.name);
        setCredits(userCredits);
        
        // Load pitch history
        const history = await dataProvider.pitch.getPitchHistory(currentUser.name);
        setPitchHistory(history);
      }
    } catch (err: any) {
      console.error('Failed to load initial data:', err);
    }
  };

  // Theme management (unchanged)
  useEffect(() => {
    const savedTheme = localStorage.getItem('pitchcraft-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pitchcraft-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // User management using DataProvider
  const handleLogin = async () => {
    try {
      const user = await dataProvider.user.loginUser({ name: 'Demo User' });
      setUser(user);
      
      const userCredits = await dataProvider.credits.getCredits(user.name);
      setCredits(userCredits);
      
      const history = await dataProvider.pitch.getPitchHistory(user.name);
      setPitchHistory(history);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  const handleLogout = async () => {
    try {
      await dataProvider.user.logoutUser();
      setUser(null);
      setCredits(0);
      setPitchHistory([]);
      setGeneratedPitch(null);
      setPitchAnalysis(null);
      setMarketingSuggestions(null);
      setActiveView('generator');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    }
  };

  // Pitch generation using DataProvider
  const handleGeneratePitch = async (input: string, style: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    setGeneratedPitch(null);
    setPitchAnalysis(null);
    setMarketingSuggestions(null);

    try {
      // Generate pitch using AI provider
      const pitchText = await dataProvider.ai.generatePitch(input, style);
      
      // Create pitch object
      const newPitch: GeneratedPitch = { input, style, pitch: pitchText };
      
      // Save pitch using pitch provider
      const savedPitch = await dataProvider.pitch.savePitch(newPitch);
      
      // Update state
      setGeneratedPitch(savedPitch);
      setPitchHistory(prev => [savedPitch, ...prev]);
      
      // Deduct credits
      const newCredits = await dataProvider.credits.deductCredits(user.name!, 1);
      setCredits(newCredits);
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate pitch');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzePitch = async (pitchToAnalyze: string) => {
    if (!user || credits <= 0) return;
    
    setIsAnalyzing(true);
    setError(null);
    setPitchAnalysis(null);

    try {
      const analysisText = await dataProvider.ai.analyzePitch(pitchToAnalyze);
      setPitchAnalysis(analysisText);
      
      const newCredits = await dataProvider.credits.deductCredits(user.name!, 1);
      setCredits(newCredits);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze pitch');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSuggestMarketing = async (originalInput: string) => {
    if (!user || credits <= 0) return;
    
    setIsSuggestingMarketing(true);
    setError(null);
    setMarketingSuggestions(null);

    try {
      const suggestionsText = await dataProvider.ai.generateMarketingSuggestions(originalInput);
      setMarketingSuggestions(suggestionsText);
      
      const newCredits = await dataProvider.credits.deductCredits(user.name!, 1);
      setCredits(newCredits);
    } catch (err: any) {
      setError(err.message || 'Failed to generate marketing suggestions');
    } finally {
      setIsSuggestingMarketing(false);
    }
  };

  const addCredits = async (amount: number) => {
    if (!user) return;
    
    try {
      const newCredits = await dataProvider.credits.addCredits(user.name!, amount);
      setCredits(newCredits);
    } catch (err: any) {
      setError(err.message || 'Failed to add credits');
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white font-sans transition-colors duration-300 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
      
      <Header 
        user={user} 
        credits={credits} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="container mx-auto pt-24 pb-12 px-4 flex flex-col items-center justify-center flex-grow">
        {!user ? (
          <LandingPage onLogin={handleLogin} />
        ) : (
          <>
            <div className="flex space-x-4 mb-8 relative z-10">
              <button onClick={() => setActiveView('generator')} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeView === 'generator' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                Pitch Generator
              </button>
              <button onClick={() => setActiveView('dashboard')} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeView === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                Dashboard
              </button>
            </div>
            
            {error && <ApiError message={error} />}

            {activeView === 'generator' ? (
              <>
                <PitchForm credits={credits} onGenerate={handleGeneratePitch} isLoading={isLoading} />
                {generatedPitch && (
                  <PitchResult 
                    pitch={generatedPitch.pitch} 
                    style={generatedPitch.style} 
                    originalInput={generatedPitch.input}
                    onAnalyze={handleAnalyzePitch} 
                    isAnalyzing={isAnalyzing} 
                    onSuggestMarketing={handleSuggestMarketing}
                    isSuggestingMarketing={isSuggestingMarketing}
                    credits={credits}
                  />
                )}
                {pitchAnalysis && <PitchAnalysis analysis={pitchAnalysis} />}
                {marketingSuggestions && <MarketingSuggestions suggestions={marketingSuggestions} />}
              </>
            ) : (
              <Dashboard 
                user={user}
                credits={credits} 
                history={pitchHistory} 
                onBuyCredits={addCredits}
                onViewPitch={(pitch) => setSelectedPitch(pitch)}
              />
            )}
          </>
        )}
      </main>
      
      <ViewPitchModal pitch={selectedPitch} onClose={() => setSelectedPitch(null)} />
      <Footer />
    </div>
  );
}