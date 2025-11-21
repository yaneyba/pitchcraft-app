import { User } from '../types';
import { IUserProvider, IStorageProvider } from './types';

export class LocalStorageUserProvider implements IUserProvider {
  private storageKey = 'pitchcraft-user';

  constructor(private storage: IStorageProvider) {}

  async getCurrentUser(): Promise<User | null> {
    return await this.storage.getItem<User>(this.storageKey);
  }

  async loginUser(userData: Partial<User>): Promise<User> {
    const user: User = {
      name: userData.name || 'Demo User',
      ...userData
    };
    
    await this.storage.setItem(this.storageKey, user);
    return user;
  }

  async logoutUser(): Promise<void> {
    await this.storage.removeItem(this.storageKey);
  }

  async updateUser(user: User): Promise<User> {
    await this.storage.setItem(this.storageKey, user);
    return user;
  }
}

export class MemoryUserProvider implements IUserProvider {
  private currentUser: User | null = null;

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async loginUser(userData: Partial<User>): Promise<User> {
    const user: User = {
      name: userData.name || 'Demo User',
      ...userData
    };
    
    this.currentUser = user;
    return user;
  }

  async logoutUser(): Promise<void> {
    this.currentUser = null;
  }

  async updateUser(user: User): Promise<User> {
    this.currentUser = user;
    return user;
  }
}