import type { AudioPlaybackStrategy } from '../types/audioPlaybackStrategy';

export class AudioContextStrategy implements AudioPlaybackStrategy {
  private audioContext: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private source: AudioBufferSourceNode | null = null;
  private isPlaying = false;
  private lastPlayTime: number | null = null;
  private latency: number | null = null;
  private setLatencyCallback: (value: number) => void;
  private audioPath: string;

  constructor(audioPath: string, setLatency: (value: number) => void) {
    this.audioPath = audioPath;
    this.setLatencyCallback = setLatency;
  }

  private async fetchAndDecodeAudio() {
    if (!this.audioContext) return;
    const response = await fetch(this.audioPath);
    const arrayBuffer = await response.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  private playBuffer() {
    if (!this.audioContext || !this.buffer || !this.isPlaying) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.audioContext.destination);

    const now = performance.now();
    if (this.lastPlayTime !== null) {
      this.latency = now - this.lastPlayTime;
      this.setLatencyCallback(this.latency);
    }
    this.lastPlayTime = now;

    source.onended = () => {
      if (this.isPlaying) {
        this.playBuffer();
      }
    };

    source.start();
    this.source = source;
  }

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext!)();
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    if (!this.buffer) {
      await this.fetchAndDecodeAudio();
    }

    this.playBuffer();
  }

  stop() {
    this.isPlaying = false;
    this.lastPlayTime = null;

    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.buffer = null;
  }

  getLatency() {
    return this.latency;
  }
}
