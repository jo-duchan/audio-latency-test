export interface AudioPlaybackStrategy {
  play(): Promise<void>;
  stop(): void;
  getLatency(): number | null;
}
