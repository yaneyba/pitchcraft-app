import React, { useState, useEffect } from 'react';

// --- Type Definitions ---

interface User {
  name: string;
}

interface GeneratedPitch {
  input: string;
  style: string;
  pitch: string;
}

type Theme = 'light' | 'dark';

// --- Component Prop Types ---

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

interface HeaderProps {
  user: User | null;
  credits: number;
  onLogin: () => void;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

interface LandingPageProps {
  onLogin: () => void;
}

interface PitchFormProps {
  credits: number;
  onGenerate: (input: string, style: string) => void;
  isLoading: boolean;
}

interface PitchResultProps {
  pitch: string;
  style: string;
  originalInput: string;
  onAnalyze: (pitch: string) => void;
  isAnalyzing: boolean;
  onSuggestMarketing: (originalInput: string) => void;
  isSuggestingMarketing: boolean;
  credits: number;
}

interface PitchAnalysisProps {
  analysis: string;
}

interface MarketingSuggestionsProps {
  suggestions: string;
}

interface ViewPitchModalProps {
    pitch: GeneratedPitch | null;
    onClose: () => void;
}

interface DashboardProps {
    user: User | null;
    credits: number;
    history: GeneratedPitch[];
    onBuyCredits: (amount: number) => void;
    onViewPitch: (pitch: GeneratedPitch) => void;
}

interface ApiErrorProps {
    message: string;
}


// --- Database Schema Models (for planning purposes) ---
/*
* // User Model (e.g., in Prisma schema)
* model User {
* id            String    @id @default(cuid())
* email         String    @unique
* name          String?
* credits       Int       @default(5) // New users get 5 free credits
* createdAt     DateTime  @default(now())
* updatedAt     DateTime  @updatedAt
* pitches       GeneratedPitch[]
* transactions  Transaction[]
* }
*
* // Transaction Model (for Stripe payments)
* model Transaction {
* id            String    @id @default(cuid())
* userId        String
* user          User      @relation(fields: [userId], references: [id])
* amount        Float
* creditsPurchased Int
* stripeChargeId String   @unique
* createdAt     DateTime  @default(now())
* }
*
* // GeneratedPitch Model
* model GeneratedPitch {
* id            String    @id @default(cuid())
* userId        String
* user          User      @relation(fields: [userId], references: [id])
* inputUrl      String?
* inputDescription String?
* pitchStyle    String
* generatedText String    @db.Text
* createdAt     DateTime  @default(now())
* }
*/

// --- Helper Components ---

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        aria-label="Toggle theme"
    >
        {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
        )}
    </button>
);


const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700/50 mt-16">
        <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-0">
                &copy; 2025 PitchCraft. All rights reserved.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy Policy</a>
            </div>
        </div>
    </footer>
);


const Header: React.FC<HeaderProps> = ({ user, credits, onLogin, onLogout, theme, toggleTheme }) => (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">PitchCraft</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                 <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                {user ? (
                    <>
                        <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                             <svg className="w-4 h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            {credits} <span className="hidden sm:inline ml-1">Credits</span>
                        </div>
                        <button onClick={onLogout} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base">Logout</button>
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


const PitchForm: React.FC<PitchFormProps> = ({ credits, onGenerate, isLoading }) => {
    const [input, setInput] = useState('');
    const [style, setStyle] = useState('Elevator Pitch');
    const pitchStyles = ["Elevator Pitch", "Formal Investor Deck", "Casual Social Media Blurb", "Feature-Focused", "Benefit-Driven"];

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
                    <label htmlFor="app-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">App URL or Description</label>
                    <textarea
                        id="app-input"
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                        placeholder="e.g., https://myawesomeapp.com or 'A mobile app that connects local gardeners...'"
                        className="w-full h-28 p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pitch-style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pitch Style</label>
                    <select
                        id="pitch-style"
                        value={style}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value)}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                    >
                        {pitchStyles.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || credits === 0}
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
                {credits === 0 && <p className="text-center text-red-500 mt-2">You're out of credits! Please purchase more.</p>}
            </form>
        </div>
    );
};

const PitchResult: React.FC<PitchResultProps> = ({ pitch, style, originalInput, onAnalyze, isAnalyzing, onSuggestMarketing, isSuggestingMarketing, credits }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(pitch);
    };

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mt-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">Your <span className="text-indigo-500">{style}</span></h3>
                <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto sm:space-x-2 space-y-2 sm:space-y-0">
                    <button onClick={handleCopy} className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center" title="Copy Text">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
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
                         ) : "✨ Analyze Pitch" }
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
                         ) : "✨ Suggest Angles" }
                    </button>
                </div>
            </div>
            <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <p>{pitch}</p>
            </div>
        </div>
    );
};

const PitchAnalysis: React.FC<PitchAnalysisProps> = ({ analysis }) => {
    // A simple parser for the structured text from the AI
    const formattedAnalysis = analysis.split('\n').map((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            return <h4 key={index} className="text-lg font-semibold text-teal-600 dark:text-teal-400 mt-4 mb-2">{trimmedLine.replace(/\*\*/g, '')}</h4>;
        }
        if (trimmedLine.startsWith('* ')) {
            return <li key={index} className="text-gray-700 dark:text-gray-300 ml-4 list-disc">{trimmedLine.substring(2)}</li>;
        }
        return <p key={index} className="text-gray-700 dark:text-gray-300">{trimmedLine}</p>;
    });

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border-2 border-teal-500/50 w-full max-w-2xl mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔬 Pitch Analysis</h3>
            <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                {formattedAnalysis}
            </div>
        </div>
    );
};

const MarketingSuggestions: React.FC<MarketingSuggestionsProps> = ({ suggestions }) => {
    const formattedSuggestions = suggestions.split('\n').map((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            return <h4 key={index} className="text-lg font-semibold text-amber-600 dark:text-amber-400 mt-4 mb-2">{trimmedLine.replace(/\*\*/g, '')}</h4>;
        }
        if (trimmedLine.startsWith('* ')) {
             return <li key={index} className="text-gray-700 dark:text-gray-300 ml-4 list-disc">{trimmedLine.substring(2)}</li>;
        }
        return <p key={index} className="text-gray-700 dark:text-gray-300">{trimmedLine}</p>;
    });

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border-2 border-amber-500/50 w-full max-w-2xl mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Marketing Suggestions</h3>
             <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                {formattedSuggestions}
            </div>
        </div>
    )
};

const ViewPitchModal: React.FC<ViewPitchModalProps> = ({ pitch, onClose }) => {
    if (!pitch) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-8 m-4" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your <span className="text-indigo-500">{pitch.style}</span></h3>
                     <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                </div>
                <div className="prose dark:prose-invert max-w-none bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
                    <p>{pitch.pitch}</p>
                </div>
            </div>
        </div>
    );
};


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


const ApiError: React.FC<ApiErrorProps> = ({ message }) => (
    <div className="bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg w-full max-w-2xl mt-4 text-center">
        <p><strong>Oops! Something went wrong.</strong></p>
        <p className="text-sm">{message}</p>
    </div>
);


export default function App() {
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
    const [selectedPitch, setSelectedPitch] = useState<GeneratedPitch | null>(null); // For modal view
    const [theme, setTheme] = useState<Theme>('dark');

    // Effect to set theme from localStorage on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem('pitchcraft-theme') as Theme | null;
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
    };
    
    // --- Gemini API Call Logic ---
    const callGeminiApi = async (systemPrompt: string, userQuery: string): Promise<string> => {
        const apiKey = ""; // Canvas will provide the key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error("Failed to extract text from Gemini API response.");
            }
            return text;

        } catch (err: any) {
            console.error(err);
            setError(err.message);
            // Re-throw to be caught by the calling function
            throw err;
        }
    }

    const handleGeneratePitch = async (input: string, style: string) => {
        setIsLoading(true);
        setError(null);
        setGeneratedPitch(null);
        setPitchAnalysis(null);
        setMarketingSuggestions(null);
        
        const systemPrompt = "You are PitchCraft AI, a professional startup copywriter and marketing expert. Your goal is to generate a compelling, concise, and persuasive pitch based on the user's input. Adapt your tone and structure perfectly to the requested pitch style.";
        const userQuery = `Generate a "${style}" pitch for the following app: [${input}]. Focus on its unique value proposition, core features, and target audience.`;

        try {
            const pitchText = await callGeminiApi(systemPrompt, userQuery);
            const newPitchData = { input, style, pitch: pitchText };
            setGeneratedPitch(newPitchData);
            setPitchHistory(prev => [newPitchData, ...prev]);
            setCredits(prev => prev - 1);
        } catch (err) {
            // Error state is already set in callGeminiApi
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyzePitch = async (pitchToAnalyze: string) => {
        if (credits <= 0) return;
        setIsAnalyzing(true);
        setError(null);
        setPitchAnalysis(null);

        const systemPrompt = "You are a sharp, insightful venture capitalist with years of experience listening to startup pitches. Your feedback is constructive, direct, and incredibly valuable. Analyze the provided pitch and give feedback formatted with markdown.";
        const userQuery = `Please analyze the following startup pitch. Identify its strengths and weaknesses, and provide specific, actionable suggestions for improvement. Structure your response with the following markdown headers: **Strengths**, **Weaknesses**, and **Suggestions**.\n\n---\nPITCH:\n"${pitchToAnalyze}"`;

        try {
            const analysisText = await callGeminiApi(systemPrompt, userQuery);
            setPitchAnalysis(analysisText);
            setCredits(prev => prev -1);
        } catch (err) {
            // Error state is already set
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSuggestMarketing = async (originalInput: string) => {
        if (credits <= 0) return;
        setIsSuggestingMarketing(true);
        setError(null);
        setMarketingSuggestions(null);

        const systemPrompt = "You are a creative and strategic marketing expert specializing in tech startups. Your goal is to provide catchy slogans and innovative marketing angles based on the user's app idea.";
        const userQuery = `For the app described as '${originalInput}', generate the following:\n\n**Catchy Slogans:**\n* A list of 3-5 catchy and memorable slogans.\n\n**Marketing Angles:**\n* A list of 2-3 unique marketing angles, including the target platform (e.g., TikTok, LinkedIn, Content Marketing) and a brief strategy for each.`;

        try {
            const suggestionsText = await callGeminiApi(systemPrompt, userQuery);
            setMarketingSuggestions(suggestionsText);
            setCredits(prev => prev - 1);
        } catch (err) {
            // Error state is already set
        } finally {
            setIsSuggestingMarketing(false);
        }
    };

    const addCredits = (amount: number) => {
        setCredits(prev => prev + amount);
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white font-sans transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
            <Header user={user} credits={credits} onLogin={handleLogin} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            
            <main className="container mx-auto pt-24 pb-12 px-4 flex flex-col items-center justify-center">
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

