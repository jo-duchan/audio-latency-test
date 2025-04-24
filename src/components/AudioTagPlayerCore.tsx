import Card from './ui/Card';
import useAudioController from '../hooks/useAudioController';
import { RefObject } from 'react';

interface Props {
  audioPath: string;
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function AudioTagPlayerCore({ audioPath, audioRef }: Props) {
  const { play, stop, latency } = useAudioController({
    audioPath,
    type: 'tag',
    audioElement: audioRef.current,
  });

  return (
    <Card
      onPlay={play}
      onStop={stop}
      name="HTML Audio Tag"
      latency={latency}
      bgColor="#337544"
      borderColor="#A3E1B3"
    />
  );
}
