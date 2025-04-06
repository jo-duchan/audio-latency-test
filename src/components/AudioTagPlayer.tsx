import { useRef, useState, useEffect } from 'react';
import Card from './ui/Card';

interface AudioTagPlayerProps {
  audioPath: string;
}

export default function AudioTagPlayer({ audioPath }: AudioTagPlayerProps) {
  const [latency, setLatency] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const lastPlayTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      const now = performance.now();
      if (lastPlayTimeRef.current !== null) {
        setLatency(now - lastPlayTimeRef.current);
      }
      lastPlayTimeRef.current = now;
    };

    const handleEnded = () => {
      if (isPlayingRef.current && audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

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
        latency={latency}
        bgColor="#337544"
        borderColor="#A3E1B3"
      />
    </>
  );
}
