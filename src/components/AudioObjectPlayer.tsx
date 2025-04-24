import Card from './ui/Card';
import useAudioController from '../hooks/useAudioController';

interface Props {
  audioPath: string;
}

export default function AudioObjectPlayer({ audioPath }: Props) {
  const { play, stop, latency } = useAudioController({
    audioPath,
    type: 'object',
  });

  return (
    <Card
      onPlay={play}
      onStop={stop}
      name="Audio Object"
      latency={latency}
      bgColor="#7256AB"
      borderColor="#EFE7FF"
    />
  );
}
