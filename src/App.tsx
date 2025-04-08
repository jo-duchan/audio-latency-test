import AudioContextPlayer from './components/AudioContextPlayer';
import AudioObjectPlayer from './components/AudioObjectPlayer';
import AudioTagPlayer from './components/AudioTagPlayer';

// const AUDIO_PATH = './ping.mp3';
// const AUDIO_PATH = './bad-guys.mp3';
const AUDIO_PATH = './pop-up-sound.wav';

function App() {
  return (
    <div className="flex justify-center items-center w-full h-full px-[20px] sm:p-0 sm:h-full">
      <div className="flex flex-col gap-[20px] sm:flex-row sm:gap-[45px]">
        <AudioTagPlayer audioPath={AUDIO_PATH} />
        <AudioObjectPlayer audioPath={AUDIO_PATH} />
        <AudioContextPlayer audioPath={AUDIO_PATH} />
      </div>
    </div>
  );
}

export default App;
