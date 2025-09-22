export interface User {
  name: string;
}

export interface GeneratedPitch {
  input: string;
  style: string;
  pitch: string;
}

export type Theme = 'light' | 'dark';

// Component Props Types
export interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface HeaderProps {
  user: User | null;
  credits: number;
  onLogin: () => void;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

export interface LandingPageProps {
  onLogin: () => void;
}

export interface PitchFormProps {
  credits: number;
  onGenerate: (input: string, style: string) => void;
  isLoading: boolean;
}

export interface PitchResultProps {
  pitch: string;
  style: string;
  originalInput: string;
  onAnalyze: (pitch: string) => void;
  isAnalyzing: boolean;
  onSuggestMarketing: (originalInput: string) => void;
  isSuggestingMarketing: boolean;
  credits: number;
}

export interface PitchAnalysisProps {
  analysis: string;
}

export interface MarketingSuggestionsProps {
  suggestions: string;
}

export interface ViewPitchModalProps {
  pitch: GeneratedPitch | null;
  onClose: () => void;
}

export interface DashboardProps {
  user: User | null;
  credits: number;
  history: GeneratedPitch[];
  onBuyCredits: (amount: number) => void;
  onViewPitch: (pitch: GeneratedPitch) => void;
}

export interface ApiErrorProps {
  message: string;
}