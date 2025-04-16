import { useState } from 'react';
import AudioContextPlayer from './components/AudioContextPlayer';
import AudioObjectPlayer from './components/AudioObjectPlayer';
import AudioTagPlayer from './components/AudioTagPlayer';
import AudioFormatChip from './components/ui/AudioFormatChip';

const AUDIO_WAV_PATH = './pop-up-sound.wav';
const AUDIO_MP3_PATH = './pop-up-sound.mp3';

function App() {
  const [audioPath, setAudioPath] = useState(AUDIO_WAV_PATH);

  const handleChangeAudioPath = (path: string) => {
    setAudioPath(path);
  };
  return (
    <div className="flex justify-center items-center w-full h-auto py-[40px] px-[20px] sm:p-0 sm:h-full">
      <div>
        <div className="mb-[32px]">
          <h2 className="text-[32px] font-bold text-[#fff] leading-[1.15] mb-[12px] sm:text-[60px]">
            Web Audio 🎧
          </h2>
          <p className="text-[14px] text-[#fff] mb-[20px] sm:text-[16px]">
            Measure playback latency using HTMLAudioElement, Web Audio API, and
            JavaScript Audio objects.
          </p>
          <div className="flex gap-[8px]">
            <AudioFormatChip
              audioPath={AUDIO_MP3_PATH}
              isSelected={audioPath === AUDIO_MP3_PATH}
              label="mp3"
              onSelect={handleChangeAudioPath}
            />
            <AudioFormatChip
              audioPath={AUDIO_WAV_PATH}
              isSelected={audioPath === AUDIO_WAV_PATH}
              label="wav"
              onSelect={handleChangeAudioPath}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[20px] sm:flex-row sm:gap-[45px]">
          <AudioTagPlayer audioPath={audioPath} />
          <AudioObjectPlayer audioPath={audioPath} />
          <AudioContextPlayer audioPath={audioPath} />
        </div>
      </div>
    </div>
  );
}

export default App;
