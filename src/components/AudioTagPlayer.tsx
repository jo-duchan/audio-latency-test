import {
  useRef,
  // useState, useEffect
} from 'react';
import Card from './ui/Card';

interface AudioTagPlayerProps {
  audioPath: string;
}

export default function AudioTagPlayer({ audioPath }: AudioTagPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const lastPlayTimeRef = useRef<number | null>(null);

  const handlePlayAudioTag = () => {
    if (isPlayingRef.current || !audioRef.current) return;
    isPlayingRef.current = true;
    audioRef.current.play();
  };

  const handleStopAudioTag = () => {
    if (!audioRef.current) return;
    isPlayingRef.current = false;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    lastPlayTimeRef.current = null;
  };

  return (
    <>
      <audio ref={audioRef} src={audioPath} preload="auto" />
      <Card
        onPlay={handlePlayAudioTag}
        onStop={handleStopAudioTag}
        name="HTML Audio Tag"
        bgColor="#337544"
        borderColor="#A3E1B3"
      />
    </>
  );
}
