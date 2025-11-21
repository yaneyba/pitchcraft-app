import React, { createContext, useContext, ReactNode } from 'react';
import { DataProvider } from '../../domain/providers/DataProviderFactory';

const DataProviderContext = createContext<DataProvider | null>(null);

interface DataProviderProviderProps {
  provider: DataProvider;
  children: ReactNode;
}

export const DataProviderProvider: React.FC<DataProviderProviderProps> = ({ provider, children }) => {
  return (
    <DataProviderContext.Provider value={provider}>
      {children}
    </DataProviderContext.Provider>
  );
};

export const useDataProvider = (): DataProvider => {
  const context = useContext(DataProviderContext);
  if (!context) {
    throw new Error('useDataProvider must be used within a DataProviderProvider');
  }
  return context;
};
