import Card from './ui/Card';
import useAudioController from '../hooks/useAudioController';

interface Props {
  audioPath: string;
}

export default function AudioContextPlayer({ audioPath }: Props) {
  const { play, stop, latency } = useAudioController({
    audioPath,
    type: 'context',
  });

  return (
    <Card
      onPlay={play}
      onStop={stop}
      name="Web Audio Context API"
      latency={latency}
      bgColor="#AA472E"
      borderColor="#FFA891"
    />
  );
}
