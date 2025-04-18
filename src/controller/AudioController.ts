import type { AudioPlaybackStrategy } from '../types/audioPlaybackStrategy';

export class AudioController {
  constructor(private strategy: AudioPlaybackStrategy) {}

  play() {
    return this.strategy.play();
  }

  stop() {
    return this.strategy.stop();
  }

  getLatency() {
    return this.strategy.getLatency();
  }
}
