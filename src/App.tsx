import { useState, useEffect } from 'react';
import { User, GeneratedPitch } from './types';
import { useDataProvider } from './providers/hooks/useDataProvider';

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

export default function App() {
  const provider = useDataProvider();
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

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      const currentUser = await provider.user.getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const userCredits = await provider.credits.getCredits(currentUser.name);
        setCredits(userCredits);
        const history = await provider.pitch.getPitchHistory(currentUser.name);
        setPitchHistory(history);
      }
    };
    loadData();
  }, [provider]);

  // Effect to set theme from localStorage on initial load
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

  // Effect to apply theme class and save to localStorage
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

  const handleLogin = async () => {
    const newUser = await provider.user.loginUser({ name: 'Demo User' });
    setUser(newUser);
    const userCredits = await provider.credits.getCredits(newUser.name);
    setCredits(userCredits);
    const history = await provider.pitch.getPitchHistory(newUser.name);
    setPitchHistory(history);
  };

  const handleLogout = async () => {
    await provider.user.logoutUser();
    setUser(null);
    setCredits(0);
    setGeneratedPitch(null);
    setPitchAnalysis(null);
    setMarketingSuggestions(null);
    setPitchHistory([]);
    setActiveView('generator');
  };

  const handleGeneratePitch = async (input: string, style: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    setGeneratedPitch(null);
    setPitchAnalysis(null);
    setMarketingSuggestions(null);

    try {
      // Check credits first
      const currentCredits = await provider.credits.getCredits(user.name);
      if (currentCredits < 1) {
        throw new Error('Insufficient credits');
      }

      const pitchText = await provider.ai.generatePitch(input, style);
      
      const newPitchData: GeneratedPitch = { 
        input, 
        style, 
        pitch: pitchText,
        userId: user.name,
        createdAt: new Date().toISOString()
      };
      
      const savedPitch = await provider.pitch.savePitch(newPitchData);
      setGeneratedPitch(savedPitch);
      
      // Update history
      const history = await provider.pitch.getPitchHistory(user.name);
      setPitchHistory(history);
      
      // Deduct credit
      const newCredits = await provider.credits.deductCredits(user.name, 1);
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
      const analysisText = await provider.ai.analyzePitch(pitchToAnalyze);
      setPitchAnalysis(analysisText);
      
      const newCredits = await provider.credits.deductCredits(user.name, 1);
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
      const suggestionsText = await provider.ai.generateMarketingSuggestions(originalInput);
      setMarketingSuggestions(suggestionsText);
      
      const newCredits = await provider.credits.deductCredits(user.name, 1);
      setCredits(newCredits);
    } catch (err: any) {
      setError(err.message || 'Failed to generate marketing suggestions');
    } finally {
      setIsSuggestingMarketing(false);
    }
  };

  const addCredits = async (amount: number) => {
    if (!user) return;
    const newCredits = await provider.credits.addCredits(user.name, amount);
    setCredits(newCredits);
  };

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