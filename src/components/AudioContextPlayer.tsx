// import { useRef, useState } from 'react';
// import Card from './ui/Card';

// declare global {
//   interface Window {
//     webkitAudioContext?: typeof AudioContext;
//   }
// }

// interface AudioContextPlayerProps {
//   audioPath: string;
// }

// export default function AudioContextPlayer({
//   audioPath,
// }: AudioContextPlayerProps) {
//   const [latency, setLatency] = useState<number | null>(null);

//   const audioContextRef = useRef<AudioContext | null>(null);
//   const audioBufferRef = useRef<AudioBuffer | null>(null);
//   const isPlayingRef = useRef<boolean>(false);
//   const lastPlayTimeRef = useRef<number | null>(null);
//   const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

//   const fetchAndDecodeAudio = async () => {
//     if (!audioContextRef.current) return;

//     const response = await fetch(audioPath);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioContextRef.current.decodeAudioData(
//       arrayBuffer
//     );
//     audioBufferRef.current = audioBuffer;
//   };

//   const playSound = () => {
//     const context = audioContextRef.current;
//     const buffer = audioBufferRef.current;
//     if (!context || !buffer || !isPlayingRef.current) return;

//     const source = context.createBufferSource();
//     source.buffer = buffer;
//     source.connect(context.destination);
//     source.start();

//     const now = performance.now();
//     if (lastPlayTimeRef.current !== null) {
//       setLatency(now - lastPlayTimeRef.current);
//     }
//     lastPlayTimeRef.current = now;

//     source.onended = () => {
//       if (isPlayingRef.current) {
//         playSound(); // 반복 재생
//       }
//     };

//     sourceNodeRef.current = source;
//   };

//   const handlePlayAudioContext = async () => {
//     if (isPlayingRef.current) return;
//     isPlayingRef.current = true;

//     // AudioContext 생성
//     if (!audioContextRef.current) {
//       audioContextRef.current = new (window.AudioContext ||
//         window.webkitAudioContext!)();
//     }

//     // 중단된 경우 resume
//     if (audioContextRef.current.state === 'suspended') {
//       await audioContextRef.current.resume();
//     }

//     // 버퍼 없으면 fetch
//     if (!audioBufferRef.current) {
//       await fetchAndDecodeAudio();
//     }

//     playSound();
//   };

//   const handleStopAudioContext = async () => {
//     isPlayingRef.current = false;
//     lastPlayTimeRef.current = null;

//     if (sourceNodeRef.current) {
//       sourceNodeRef.current.stop();
//       sourceNodeRef.current.disconnect();
//       sourceNodeRef.current = null;
//     }

//     // 오디오 버퍼 삭제
//     audioBufferRef.current = null;

//     // 오디오 컨텍스트 닫고 초기화
//     if (audioContextRef.current) {
//       if (audioContextRef.current.state !== 'closed') {
//         await audioContextRef.current.close();
//       }
//       audioContextRef.current = null;
//     }
//   };

//   return (
//     <Card
//       onPlay={handlePlayAudioContext}
//       onStop={handleStopAudioContext}
//       name="Web Audio Context API"
//       latency={latency}
//       bgColor="#AA472E"
//       borderColor="#FFA891"
//     />
//   );
// }
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
