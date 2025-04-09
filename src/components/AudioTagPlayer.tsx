import {
  useEffect,
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

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // console.log('🔕 백그라운드 상태입니다');

        audioRef?.current?.pause();
      } else {
        audioRef?.current?.play();
        // console.log('🔔 포그라운드 상태입니다');
      }
    });
  }, []);

  return (
    <>
      {/* <audio ref={audioRef} src={audioPath} preload="auto" autoPlay /> */}
      <audio ref={audioRef} src={audioPath} />
      <Card
        // onPlay={handlePlayAudioTag}
        onPlay={() => {
          audioRef?.current?.play();
        }}
        onStop={handleStopAudioTag}
        name="HTML Audio Tag"
        bgColor="#337544"
        borderColor="#A3E1B3"
      />
    </>
  );
}
