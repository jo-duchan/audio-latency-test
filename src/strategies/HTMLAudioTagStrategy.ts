import type { AudioPlaybackStrategy } from '../types/audioPlaybackStrategy';

export class HTMLAudioTagStrategy implements AudioPlaybackStrategy {
  private audio: HTMLAudioElement;
  private isPlaying = false;
  private lastPlayTime: number | null = null;
  private latency: number | null = null;
  private setLatencyCallback: (value: number) => void;

  constructor(
    audioElement: HTMLAudioElement,
    setLatency: (value: number) => void
  ) {
    this.audio = audioElement;
    this.setLatencyCallback = setLatency;

    // 🎯 초기화 시 이벤트 리스너 등록
    this.audio.addEventListener('play', this.handlePlay);
    this.audio.addEventListener('ended', this.handleEnded);
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
    await this.audio.play();
  }

  stop() {
    this.isPlaying = false;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.lastPlayTime = null;
  }

  getLatency() {
    return this.latency;
  }
}
