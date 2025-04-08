import AudioContextPlayer from './components/AudioContextPlayer';
import AudioObjectPlayer from './components/AudioObjectPlayer';
import AudioTagPlayer from './components/AudioTagPlayer';

// const AUDIO_PATH = './ping.mp3';
// const AUDIO_PATH = './bad-guys.mp3';
const AUDIO_PATH = './pop-up-sound.wav';

function App() {
  return (
    <div className="flex justify-center items-center w-full h-auto py-[40px] px-[20px] sm:p-0 sm:h-full">
      <div>
        <div className="mb-[32px]">
          <h2 className="text-[32px] font-bold text-[#fff] leading-[1.15] mb-[12px] sm:text-[60px]">
            Web Audio 🎧
          </h2>
          <p className="text-[14px] text-[#fff] sm:text-[16px]">
            Measure playback latency using HTMLAudioElement, Web Audio API, and
            JavaScript Audio objects.
          </p>
        </div>
        <div className="flex flex-col gap-[20px] sm:flex-row sm:gap-[45px]">
          <AudioTagPlayer audioPath={AUDIO_PATH} />
          <AudioObjectPlayer audioPath={AUDIO_PATH} />
          <AudioContextPlayer audioPath={AUDIO_PATH} />
        </div>
      </div>
    </div>
  );
}

export default App;
