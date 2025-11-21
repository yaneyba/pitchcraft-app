import { ICreditsProvider, IStorageProvider } from './types';

export class LocalStorageCreditsProvider implements ICreditsProvider {
  private storageKey = 'pitchcraft-credits';

  constructor(private storage: IStorageProvider) {}

  async getCredits(userId?: string): Promise<number> {
    if (userId) {
      const userCredits = await this.storage.getItem<number>(`${this.storageKey}-${userId}`);
      return userCredits || 5; // Default 5 credits for new users
    }
    
    return await this.storage.getItem<number>(this.storageKey) || 5;
  }

  async updateCredits(userId: string, credits: number): Promise<number> {
    const key = userId ? `${this.storageKey}-${userId}` : this.storageKey;
    await this.storage.setItem(key, credits);
    return credits;
  }

  async addCredits(userId: string, amount: number): Promise<number> {
    const currentCredits = await this.getCredits(userId);
    const newCredits = currentCredits + amount;
    return await this.updateCredits(userId, newCredits);
  }

  async deductCredits(userId: string, amount: number): Promise<number> {
    const currentCredits = await this.getCredits(userId);
    const newCredits = Math.max(0, currentCredits - amount);
    return await this.updateCredits(userId, newCredits);
  }
}

export class MemoryCreditsProvider implements ICreditsProvider {
  private credits: Record<string, number> = {};
  private defaultCredits = 5;

  async getCredits(userId?: string): Promise<number> {
    const key = userId || 'default';
    return this.credits[key] || this.defaultCredits;
  }

  async updateCredits(userId: string, credits: number): Promise<number> {
    const key = userId || 'default';
    this.credits[key] = credits;
    return credits;
  }

  async addCredits(userId: string, amount: number): Promise<number> {
    const currentCredits = await this.getCredits(userId);
    const newCredits = currentCredits + amount;
    return await this.updateCredits(userId, newCredits);
  }

  async deductCredits(userId: string, amount: number): Promise<number> {
    const currentCredits = await this.getCredits(userId);
    const newCredits = Math.max(0, currentCredits - amount);
    return await this.updateCredits(userId, newCredits);
  }
}