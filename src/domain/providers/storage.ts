import { IStorageProvider } from './types';

export class LocalStorageProvider implements IStorageProvider {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('LocalStorage setItem error:', error);
      throw new Error(`Failed to save to localStorage: ${error}`);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('LocalStorage getItem error:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage removeItem error:', error);
      throw new Error(`Failed to remove from localStorage: ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('LocalStorage clear error:', error);
      throw new Error(`Failed to clear localStorage: ${error}`);
    }
  }
}

export class MemoryStorageProvider implements IStorageProvider {
  private storage: Map<string, any> = new Map();

  async setItem(key: string, value: any): Promise<void> {
    this.storage.set(key, value);
  }

  async getItem<T>(key: string): Promise<T | null> {
    return this.storage.get(key) || null;
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}