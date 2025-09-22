import { 
  IDataProvider, 
  ProviderType, 
  DataProviderConfig,
  IUserProvider,
  IPitchProvider,
  ICreditsProvider,
  IAIProvider,
  IStorageProvider
} from './types';

import { LocalStorageProvider, MemoryStorageProvider } from './storage';
import { LocalStorageUserProvider, MemoryUserProvider } from './user';
import { LocalStoragePitchProvider, MemoryPitchProvider } from './pitch';
import { LocalStorageCreditsProvider, MemoryCreditsProvider } from './credits';
import { GeminiAIProvider, MockAIProvider } from './ai';

export class DataProvider implements IDataProvider {
  constructor(
    public user: IUserProvider,
    public pitch: IPitchProvider,
    public credits: ICreditsProvider,
    public ai: IAIProvider,
    public storage: IStorageProvider
  ) {}
}

export class DataProviderFactory {
  private static instance: DataProvider | null = null;

  /**
   * Get the singleton instance of DataProvider
   */
  static getInstance(config?: DataProviderConfig): DataProvider {
    if (!DataProviderFactory.instance) {
      DataProviderFactory.instance = DataProviderFactory.createProvider(config);
    }
    return DataProviderFactory.instance;
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  static resetInstance(): void {
    DataProviderFactory.instance = null;
  }

  /**
   * Create a new DataProvider instance with the specified configuration
   */
  static createProvider(config?: DataProviderConfig): DataProvider {
    const defaultConfig: DataProviderConfig = {
      userProvider: ProviderType.LOCAL_STORAGE,
      pitchProvider: ProviderType.LOCAL_STORAGE,
      creditsProvider: ProviderType.LOCAL_STORAGE,
      aiProvider: ProviderType.API, // Use real Gemini API
      storageProvider: ProviderType.LOCAL_STORAGE
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Create storage provider
    const storage = DataProviderFactory.createStorageProvider(finalConfig.storageProvider);

    // Create individual providers
    const user = DataProviderFactory.createUserProvider(finalConfig.userProvider, storage);
    const pitch = DataProviderFactory.createPitchProvider(finalConfig.pitchProvider, storage);
    const credits = DataProviderFactory.createCreditsProvider(finalConfig.creditsProvider, storage);
    const ai = DataProviderFactory.createAIProvider(finalConfig.aiProvider);

    return new DataProvider(user, pitch, credits, ai, storage);
  }

  /**
   * Create development/testing provider with in-memory storage
   */
  static createDevelopmentProvider(): DataProvider {
    return DataProviderFactory.createProvider({
      userProvider: ProviderType.MEMORY,
      pitchProvider: ProviderType.MEMORY,
      creditsProvider: ProviderType.MEMORY,
      aiProvider: ProviderType.API, // Can switch to MEMORY for testing
      storageProvider: ProviderType.MEMORY
    });
  }

  /**
   * Create testing provider with mock AI
   */
  static createTestingProvider(): DataProvider {
    return DataProviderFactory.createProvider({
      userProvider: ProviderType.MEMORY,
      pitchProvider: ProviderType.MEMORY,
      creditsProvider: ProviderType.MEMORY,
      aiProvider: ProviderType.MEMORY, // Uses MockAIProvider
      storageProvider: ProviderType.MEMORY
    });
  }

  // Private factory methods
  private static createStorageProvider(type: ProviderType): IStorageProvider {
    switch (type) {
      case ProviderType.LOCAL_STORAGE:
        return new LocalStorageProvider();
      case ProviderType.MEMORY:
        return new MemoryStorageProvider();
      default:
        throw new Error(`Unsupported storage provider type: ${type}`);
    }
  }

  private static createUserProvider(type: ProviderType, storage: IStorageProvider): IUserProvider {
    switch (type) {
      case ProviderType.LOCAL_STORAGE:
        return new LocalStorageUserProvider(storage);
      case ProviderType.MEMORY:
        return new MemoryUserProvider();
      default:
        throw new Error(`Unsupported user provider type: ${type}`);
    }
  }

  private static createPitchProvider(type: ProviderType, storage: IStorageProvider): IPitchProvider {
    switch (type) {
      case ProviderType.LOCAL_STORAGE:
        return new LocalStoragePitchProvider(storage);
      case ProviderType.MEMORY:
        return new MemoryPitchProvider();
      default:
        throw new Error(`Unsupported pitch provider type: ${type}`);
    }
  }

  private static createCreditsProvider(type: ProviderType, storage: IStorageProvider): ICreditsProvider {
    switch (type) {
      case ProviderType.LOCAL_STORAGE:
        return new LocalStorageCreditsProvider(storage);
      case ProviderType.MEMORY:
        return new MemoryCreditsProvider();
      default:
        throw new Error(`Unsupported credits provider type: ${type}`);
    }
  }

  private static createAIProvider(type: ProviderType): IAIProvider {
    switch (type) {
      case ProviderType.API:
        return new GeminiAIProvider();
      case ProviderType.MEMORY:
        return new MockAIProvider();
      default:
        throw new Error(`Unsupported AI provider type: ${type}`);
    }
  }
}