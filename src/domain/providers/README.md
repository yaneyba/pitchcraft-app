# DataProvider Architecture

This document explains the DataProvider architecture implemented in PitchCraft, which provides a clean abstraction layer for data management and flow control.

## 🏗️ Architecture Overview

The DataProvider architecture follows the **Factory Pattern** and **Provider Pattern** to create a flexible, testable, and maintainable data layer.

```
┌─────────────────────────────────────────────────────────────┐
│                    DataProviderFactory                      │
├─────────────────────────────────────────────────────────────┤
│  Creates and manages different provider implementations     │
│  • LocalStorage providers (persistent)                     │
│  • Memory providers (temporary)                            │
│  • API providers (external services)                       │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                      DataProvider                           │
├─────────────────────────────────────────────────────────────┤
│  Unified interface containing:                              │
│  • UserProvider      - User authentication & management    │
│  • PitchProvider     - Pitch CRUD operations              │
│  • CreditsProvider   - Credits management                  │
│  • AIProvider        - AI service integration             │
│  • StorageProvider   - Data persistence                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Core Components

### 1. DataProviderFactory

The main factory class that creates and manages provider instances.

```typescript
// Get default instance (localStorage + Gemini AI)
const dataProvider = DataProviderFactory.getInstance();

// Create custom configuration
const devProvider = DataProviderFactory.createDevelopmentProvider();
const testProvider = DataProviderFactory.createTestingProvider();

// Custom configuration
const customProvider = DataProviderFactory.createProvider({
  userProvider: ProviderType.MEMORY,
  pitchProvider: ProviderType.LOCAL_STORAGE,
  aiProvider: ProviderType.API
});
```

### 2. Provider Interfaces

#### IUserProvider
```typescript
interface IUserProvider {
  getCurrentUser(): Promise<User | null>;
  loginUser(userData: Partial<User>): Promise<User>;
  logoutUser(): Promise<void>;
  updateUser(user: User): Promise<User>;
}
```

#### IPitchProvider
```typescript
interface IPitchProvider {
  savePitch(pitch: GeneratedPitch): Promise<GeneratedPitch>;
  getPitchHistory(userId?: string): Promise<GeneratedPitch[]>;
  deletePitch(pitchId: string): Promise<void>;
  getPitchById(pitchId: string): Promise<GeneratedPitch | null>;
}
```

#### ICreditsProvider
```typescript
interface ICreditsProvider {
  getCredits(userId?: string): Promise<number>;
  updateCredits(userId: string, credits: number): Promise<number>;
  addCredits(userId: string, amount: number): Promise<number>;
  deductCredits(userId: string, amount: number): Promise<number>;
}
```

#### IAIProvider
```typescript
interface IAIProvider {
  generatePitch(input: string, style: string): Promise<string>;
  analyzePitch(pitch: string): Promise<string>;
  generateMarketingSuggestions(input: string): Promise<string>;
}
```

## 🚀 Usage Examples

### Basic Usage

```typescript
import { DataProviderFactory } from './providers';

// Initialize the data provider
const dataProvider = DataProviderFactory.getInstance();

// Use individual providers
const user = await dataProvider.user.loginUser({ name: 'John Doe' });
const credits = await dataProvider.credits.getCredits(user.name);
const pitch = await dataProvider.ai.generatePitch('My app idea', 'Elevator Pitch');
```

### React Integration

```typescript
import { useDataProvider, DataProviderContextProvider } from './hooks/useDataProvider';

// Wrap your app with the provider
function App() {
  return (
    <DataProviderContextProvider>
      <MyComponent />
    </DataProviderContextProvider>
  );
}

// Use in components
function MyComponent() {
  const dataProvider = useDataProvider();
  
  const handleGeneratePitch = async () => {
    const pitch = await dataProvider.ai.generatePitch(input, style);
    const savedPitch = await dataProvider.pitch.savePitch({
      input,
      style,
      pitch
    });
  };
}
```

### Testing

```typescript
import { DataProviderFactory } from './providers';

// Create test provider with mock AI
const testProvider = DataProviderFactory.createTestingProvider();

// Use in tests
test('should generate pitch', async () => {
  const result = await testProvider.ai.generatePitch('test input', 'Elevator Pitch');
  expect(result).toContain('[MOCK]');
});
```

## 🔄 Provider Types

### ProviderType.LOCAL_STORAGE
- **Data Persistence**: Stored in browser localStorage
- **Use Case**: Production, user data persistence
- **Benefits**: Data survives browser restarts

### ProviderType.MEMORY
- **Data Persistence**: Stored in JavaScript memory
- **Use Case**: Development, testing, temporary sessions
- **Benefits**: Fast, no side effects, easy to reset

### ProviderType.API
- **Data Persistence**: External service (Gemini AI)
- **Use Case**: Production AI features
- **Benefits**: Real AI capabilities, up-to-date models

## 🏃‍♀️ Migration Guide

### Current App.tsx → DataProvider Integration

**Before:**
```typescript
const [user, setUser] = useState<User | null>(null);
const [credits, setCredits] = useState<number>(0);

const handleLogin = () => {
  setUser({ name: 'Demo User' });
  setCredits(5);
};
```

**After:**
```typescript
const dataProvider = DataProviderFactory.getInstance();
const [user, setUser] = useState<User | null>(null);
const [credits, setCredits] = useState<number>(0);

const handleLogin = async () => {
  const user = await dataProvider.user.loginUser({ name: 'Demo User' });
  setUser(user);
  
  const userCredits = await dataProvider.credits.getCredits(user.name);
  setCredits(userCredits);
};
```

## 🧪 Benefits

### 1. **Separation of Concerns**
- Business logic separated from UI components
- Clean interfaces for each data domain
- Easy to understand and maintain

### 2. **Testability**
- Mock providers for unit testing
- No dependencies on external services in tests
- Isolated testing of individual providers

### 3. **Flexibility**
- Switch between different storage mechanisms
- Easy to add new provider implementations
- Configuration-driven provider selection

### 4. **Scalability**
- Ready for multi-user support
- Database integration preparation
- API service abstraction

### 5. **Development Experience**
- Mock AI responses for development
- Fast development with memory providers
- Easy debugging and testing

## 🔧 Configuration Options

### Development Configuration
```typescript
const devProvider = DataProviderFactory.createProvider({
  userProvider: ProviderType.MEMORY,        // Fast, no persistence
  pitchProvider: ProviderType.MEMORY,       // No localStorage pollution
  creditsProvider: ProviderType.MEMORY,     // Reset credits easily
  aiProvider: ProviderType.MEMORY,          // Mock AI for speed
  storageProvider: ProviderType.MEMORY      // No side effects
});
```

### Production Configuration
```typescript
const prodProvider = DataProviderFactory.createProvider({
  userProvider: ProviderType.LOCAL_STORAGE,    // Persistent sessions
  pitchProvider: ProviderType.LOCAL_STORAGE,   // Save user pitches
  creditsProvider: ProviderType.LOCAL_STORAGE, // Persistent credits
  aiProvider: ProviderType.API,                // Real Gemini AI
  storageProvider: ProviderType.LOCAL_STORAGE  // Browser storage
});
```

## 🚀 Future Enhancements

### 1. Database Integration
```typescript
// Future: Add database providers
enum ProviderType {
  LOCAL_STORAGE = 'localStorage',
  MEMORY = 'memory',
  API = 'api',
  DATABASE = 'database',        // New
  FIREBASE = 'firebase',        // New
  SUPABASE = 'supabase'        // New
}
```

### 2. Caching Layer
```typescript
// Future: Add caching capabilities
interface ICacheProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  invalidate(pattern: string): Promise<void>;
}
```

### 3. Offline Support
```typescript
// Future: Add offline/sync capabilities  
interface ISyncProvider {
  syncToCloud(): Promise<void>;
  syncFromCloud(): Promise<void>;
  getOfflineChanges(): Promise<any[]>;
}
```

This architecture provides a solid foundation for the PitchCraft application while maintaining flexibility for future growth and requirements changes.