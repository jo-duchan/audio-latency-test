import type { AudioPlaybackStrategy } from '../types/audioPlaybackStrategy';

export class AudioObjectStrategy implements AudioPlaybackStrategy {
  private audio: HTMLAudioElement;
  private isPlaying = false;
  private lastPlayTime: number | null = null;
  private latency: number | null = null;
  private setLatencyCallback: (value: number) => void;

  constructor(audioPath: string, setLatency: (value: number) => void) {
    this.audio = new Audio(audioPath);
    this.setLatencyCallback = setLatency;
  }

  private handlePlay = () => {
    const now = performance.now();
    if (this.lastPlayTime !== null) {
      this.latency = now - this.lastPlayTime;
      this.setLatencyCallback(this.latency);
    }
    this.lastPlayTime = now;
  };

  private handleEnded = () => {
    if (this.isPlaying) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  };

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.audio.onplay = this.handlePlay;
    this.audio.onended = this.handleEnded;

    await this.audio.play();
  }

  stop() {
    this.isPlaying = false;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.onplay = null;
    this.audio.onended = null;
    this.lastPlayTime = null;
  }

  getLatency() {
    return this.latency;
  }
}
