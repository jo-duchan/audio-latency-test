import { useEffect, useRef, useState } from 'react';
import type { AudioPlaybackStrategy } from '../types/audioPlaybackStrategy';
import { HTMLAudioTagStrategy } from '../strategies/HTMLAudioTagStrategy';
import { AudioObjectStrategy } from '../strategies/AudioObjectStrategy';
import { AudioContextStrategy } from '../strategies/AudioContextStrategy';
import { AudioController } from '../controller/AudioController';

type AudioType = 'object' | 'tag' | 'context';

interface UseAudioControllerOptions {
  audioPath: string;
  type: AudioType;
  audioElement?: HTMLAudioElement | null;
}

export default function useAudioController({
  audioPath,
  type,
  audioElement,
}: UseAudioControllerOptions) {
  const [latency, setLatency] = useState<number | null>(null);
  const controllerRef = useRef<AudioController | null>(null);

  useEffect(() => {
    let strategy: AudioPlaybackStrategy | null = null;

    switch (type) {
      case 'tag':
        if (!audioElement) return;
        strategy = new HTMLAudioTagStrategy(audioElement, setLatency);
        break;

      case 'object':
        strategy = new AudioObjectStrategy(audioPath, setLatency);
        break;

      case 'context':
        strategy = new AudioContextStrategy(audioPath, setLatency);
        break;

      default:
        throw new Error(`Unknown audio strategy type: ${type}`);
    }

    if (strategy) {
      controllerRef.current = new AudioController(strategy);
    }
  }, [audioPath, type, audioElement]);

  return {
    play: () => controllerRef.current?.play(),
    stop: () => controllerRef.current?.stop(),
    latency,
  };
}
