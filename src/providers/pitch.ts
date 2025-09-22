import { GeneratedPitch } from '../types';
import { IPitchProvider, IStorageProvider } from './types';

export class LocalStoragePitchProvider implements IPitchProvider {
  private storageKey = 'pitchcraft-pitches';

  constructor(private storage: IStorageProvider) {}

  async savePitch(pitch: GeneratedPitch): Promise<GeneratedPitch> {
    const pitchWithId = {
      ...pitch,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    const existingPitches = await this.getPitchHistory();
    const updatedPitches = [pitchWithId, ...existingPitches];
    
    await this.storage.setItem(this.storageKey, updatedPitches);
    return pitchWithId;
  }

  async getPitchHistory(userId?: string): Promise<GeneratedPitch[]> {
    const pitches = await this.storage.getItem<GeneratedPitch[]>(this.storageKey) || [];
    
    // If userId is provided, filter by user (for future multi-user support)
    if (userId) {
      return pitches.filter(pitch => (pitch as any).userId === userId);
    }
    
    return pitches;
  }

  async deletePitch(pitchId: string): Promise<void> {
    const pitches = await this.getPitchHistory();
    const updatedPitches = pitches.filter(pitch => (pitch as any).id !== pitchId);
    await this.storage.setItem(this.storageKey, updatedPitches);
  }

  async getPitchById(pitchId: string): Promise<GeneratedPitch | null> {
    const pitches = await this.getPitchHistory();
    return pitches.find(pitch => (pitch as any).id === pitchId) || null;
  }

  private generateId(): string {
    return `pitch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export class MemoryPitchProvider implements IPitchProvider {
  private pitches: GeneratedPitch[] = [];

  async savePitch(pitch: GeneratedPitch): Promise<GeneratedPitch> {
    const pitchWithId = {
      ...pitch,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.pitches = [pitchWithId, ...this.pitches];
    return pitchWithId;
  }

  async getPitchHistory(userId?: string): Promise<GeneratedPitch[]> {
    if (userId) {
      return this.pitches.filter(pitch => (pitch as any).userId === userId);
    }
    return [...this.pitches];
  }

  async deletePitch(pitchId: string): Promise<void> {
    this.pitches = this.pitches.filter(pitch => (pitch as any).id !== pitchId);
  }

  async getPitchById(pitchId: string): Promise<GeneratedPitch | null> {
    return this.pitches.find(pitch => (pitch as any).id === pitchId) || null;
  }

  private generateId(): string {
    return `pitch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}