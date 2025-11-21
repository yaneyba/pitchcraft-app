import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DataProviderFactory } from '../domain/providers/DataProviderFactory'
import { DataProviderProvider } from '../application/hooks/useDataProvider'
import { ProviderType } from '../domain/providers/types'

// Initialize the DataProvider with real API and LocalStorage
const dataProvider = DataProviderFactory.createProvider({
  userProvider: ProviderType.LOCAL_STORAGE,
  pitchProvider: ProviderType.LOCAL_STORAGE,
  creditsProvider: ProviderType.LOCAL_STORAGE,
  aiProvider: ProviderType.API,
  storageProvider: ProviderType.LOCAL_STORAGE
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProviderProvider provider={dataProvider}>
      <App />
    </DataProviderProvider>
  </React.StrictMode>,
)