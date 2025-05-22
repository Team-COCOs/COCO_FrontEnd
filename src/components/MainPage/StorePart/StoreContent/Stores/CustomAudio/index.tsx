import { useEffect, useRef, useState } from "react";
import { CustomAudioStyle } from "./styled";

interface AudioProps {
  src: string;
  isPlayingGlobal: boolean;
  handlePlay: (isPlaying: boolean) => void;
}

const CustomAudio = ({ src, isPlayingGlobal, handlePlay }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // 오디오가 로드됐을 때 duration 설정
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // duration 값을 설정
    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0); // 처음으로 되돌림
      handlePlay(false);
    };

    audio.addEventListener("loadeddata", handleLoadedData); // 오디오가 로드되었을 때 duration 설정
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 시간 업데이트
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const interval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlayingGlobal && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isPlayingGlobal]);

  // 슬라이더로 재생 위치 변경
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        handlePlay(false); // 부모 이미지 움직여야 해서
      } else {
        audioRef.current.play().catch((e) => console.log("재생 실패:", e));
        setIsPlaying(true);
        handlePlay(true);
      }
    }
  };

  return (
    <CustomAudioStyle className="custom-audio-player">
      <audio ref={audioRef} src={src} preload="auto" />
      <div className={`controls ${isPlaying ? "pause-controls" : ""}`}>
        <button
          onClick={togglePlayPause}
          className={isPlaying ? "" : "pause-btn"}
        >
          {isPlaying ? "▌▌" : "▶"}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          style={
            {
              "--progress": `${(currentTime / duration) * 100}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </CustomAudioStyle>
  );
};

export default CustomAudio;
