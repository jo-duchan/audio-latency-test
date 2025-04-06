import { useCallback, useState } from 'react';

interface CardProps {
  onPlay: () => void;
  onStop: () => void;
  name: string;
  latency: number | null;
  bgColor: string;
  borderColor: string;
}

export default function Card({
  onPlay,
  onStop,
  name,
  latency,
  bgColor,
  borderColor,
}: CardProps) {
  const [play, setPlay] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (play) {
      onStop();
      setPlay(false);
    } else {
      onPlay();
      setPlay(true);
    }
  }, [play, onPlay, onStop]);

  return (
    <button
      className={`$w-full h-[200px] p-[20px] rounded-[16px] border-1 border-[#fff] flex flex-col justify-between text-start text-[#fff] leading-[1.15] font-bold cursor-pointer sm:w-[360px] sm:h-[360px] sm:p-[30px] sm:rounded-[24px]`}
      style={{ background: bgColor, borderColor: borderColor }}
      type="button"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <h4 className="w-[240px] text-[22px] font-bold sm:text-[32px] sm:w-[230px]">
          {name}
        </h4>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.4)] border-[1px] border-[#fff] text-[20px]">
          {play ? (
            <i className="ri-volume-up-fill"></i>
          ) : (
            <i className="ri-volume-mute-fill"></i>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[16px] sm:text-[24px]">Latency</span>
        <span className="text-[24px] sm:text-[40px]">
          {latency !== null ? `${latency.toFixed(2)} ms` : 'Pending'}
        </span>
      </div>
    </button>
  );
}
