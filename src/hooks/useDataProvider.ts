import React, { createContext, useContext, ReactNode } from 'react';
import { DataProviderFactory, IDataProvider } from '../providers';

// Create context for DataProvider
const DataProviderContext = createContext<IDataProvider | null>(null);

// Props for the provider component
interface DataProviderContextProps {
  children: ReactNode;
  provider?: IDataProvider;
}

/**
 * Provider component that makes DataProvider available throughout the app
 */
export const DataProviderContextProvider: React.FC<DataProviderContextProps> = ({ 
  children, 
  provider 
}) => {
  // Use provided instance or create default instance
  const dataProvider = provider || DataProviderFactory.getInstance();

  return React.createElement(
    DataProviderContext.Provider,
    { value: dataProvider },
    children
  );
};

/**
 * Hook to access the DataProvider in components
 */
export const useDataProvider = (): IDataProvider => {
  const context = useContext(DataProviderContext);
  
  if (!context) {
    throw new Error('useDataProvider must be used within a DataProviderContextProvider');
  }
  
  return context;
};

/**
 * Individual hooks for specific providers (convenience hooks)
 */
export const useUserProvider = () => {
  const { user } = useDataProvider();
  return user;
};

export const usePitchProvider = () => {
  const { pitch } = useDataProvider();
  return pitch;
};

export const useCreditsProvider = () => {
  const { credits } = useDataProvider();
  return credits;
};

export const useAIProvider = () => {
  const { ai } = useDataProvider();
  return ai;
};

export const useStorageProvider = () => {
  const { storage } = useDataProvider();
  return storage;
};