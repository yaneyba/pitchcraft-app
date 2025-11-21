import { User, GeneratedPitch } from '../types';

// Base interfaces for data operations
export interface IUserProvider {
  getCurrentUser(): Promise<User | null>;
  loginUser(userData: Partial<User>): Promise<User>;
  logoutUser(): Promise<void>;
  updateUser(user: User): Promise<User>;
}

export interface IPitchProvider {
  savePitch(pitch: GeneratedPitch): Promise<GeneratedPitch>;
  getPitchHistory(userId?: string): Promise<GeneratedPitch[]>;
  deletePitch(pitchId: string): Promise<void>;
  getPitchById(pitchId: string): Promise<GeneratedPitch | null>;
}

export interface ICreditsProvider {
  getCredits(userId?: string): Promise<number>;
  updateCredits(userId: string, credits: number): Promise<number>;
  addCredits(userId: string, amount: number): Promise<number>;
  deductCredits(userId: string, amount: number): Promise<number>;
}

export interface IAIProvider {
  generatePitch(input: string, style: string): Promise<string>;
  analyzePitch(pitch: string): Promise<string>;
  generateMarketingSuggestions(input: string): Promise<string>;
}

export interface IStorageProvider {
  setItem(key: string, value: any): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Main data provider interface
export interface IDataProvider {
  user: IUserProvider;
  pitch: IPitchProvider;
  credits: ICreditsProvider;
  ai: IAIProvider;
  storage: IStorageProvider;
}

// Provider types
export enum ProviderType {
  LOCAL_STORAGE = 'localStorage',
  MEMORY = 'memory',
  API = 'api'
}

// Configuration interface
export interface DataProviderConfig {
  userProvider: ProviderType;
  pitchProvider: ProviderType;
  creditsProvider: ProviderType;
  aiProvider: ProviderType;
  storageProvider: ProviderType;
}