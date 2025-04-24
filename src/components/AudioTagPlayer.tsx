import { useEffect, useRef, useState } from 'react';
import AudioTagPlayerCore from './AudioTagPlayerCore';

interface Props {
  audioPath: string;
}

export default function AudioTagPlayer({ audioPath }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      setReady(true);
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src={audioPath} preload="auto" />
      {ready && (
        <AudioTagPlayerCore audioRef={audioRef} audioPath={audioPath} />
      )}
    </>
  );
}
