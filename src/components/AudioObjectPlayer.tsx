import {
  useRef,
  //  useState
} from 'react';
import Card from './ui/Card';

interface AudioObjectPlayerProps {
  audioPath: string;
}

export default function AudioObjectPlayer({
  audioPath,
}: AudioObjectPlayerProps) {
  // const [latency, setLatency] = useState<number | null>(null);
  const audioInstanceRef = useRef(new Audio(audioPath));
  const lastPlayTimeRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  const handlePlayAudioObject = () => {
    if (isPlayingRef.current || !audioInstanceRef.current) return;
    isPlayingRef.current = true;

    const audio = audioInstanceRef.current;

    // audio.onplay = () => {
    //   const now = performance.now();
    //   if (lastPlayTimeRef.current !== null) {
    //     setLatency(now - lastPlayTimeRef.current);
    //   }
    //   lastPlayTimeRef.current = now;
    // };

    // audio.onended = () => {
    //   if (isPlayingRef.current) {
    //     audio.currentTime = 0;
    //     audio.play();
    //   }
    // };

    audio.play();
  };

  const handleStopAudioObject = () => {
    if (!audioInstanceRef.current) return;
    const audio = audioInstanceRef.current;

    isPlayingRef.current = false;
    audio.pause();
    audio.currentTime = 0;
    audio.onplay = null;
    audio.onended = null;
    lastPlayTimeRef.current = null;
  };

  return (
    <Card
      onPlay={handlePlayAudioObject}
      onStop={handleStopAudioObject}
      name="Audio Object"
      // latency={latency}
      bgColor="#7256AB"
      borderColor="#EFE7FF"
    />
  );
}
