// contexts/MusicPlayerContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Track {
  id: number;
  name: string;
  url: string;
  artist: string;
  file: string;
}

interface MusicPlayerContextType {
  playlist: Track[];
  currentTrack: number;
  isPlaying: boolean;
  volume: number;
  hasPlayedOnce: boolean;
  setHasPlayedOnce: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  setPlaylist: (tracks: Track[]) => void;
  togglePlay: () => void;
  stop: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (value: number) => void;
  setCurrentTrack: (index: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null!);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [volume, setVolume] = useState(1);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    if (isPlaying) {
      audio
        .play()
        .then(() => setHasPlayedOnce(true))
        .catch((err) => {
          console.warn("자동 재생 실패:", err);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const onFirstUserInteraction = () => {
      if (!hasPlayedOnce && playlist.length > 0) {
        setIsPlaying(true);
      }
      window.removeEventListener("click", onFirstUserInteraction);
      window.removeEventListener("keydown", onFirstUserInteraction);
      window.removeEventListener("touchstart", onFirstUserInteraction);
    };

    window.addEventListener("click", onFirstUserInteraction);
    window.addEventListener("keydown", onFirstUserInteraction);
    window.addEventListener("touchstart", onFirstUserInteraction);

    return () => {
      window.removeEventListener("click", onFirstUserInteraction);
      window.removeEventListener("keydown", onFirstUserInteraction);
      window.removeEventListener("touchstart", onFirstUserInteraction);
    };
  }, [hasPlayedOnce, playlist]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.warn("자동 재생 실패:", e));
    }

    // 안전하게 토글
    setIsPlaying((prev) => !prev);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      // setHasPlayedOnce(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () =>
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));

  // 🎯 오디오 이벤트 리스너로 상태 동기화
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);
  // 🎯 오디오 이벤트 리스너로 상태 동기화
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        playlist,
        currentTrack,
        isPlaying,
        volume,
        hasPlayedOnce,
        setHasPlayedOnce,
        audioRef,
        setPlaylist,
        togglePlay,
        stop,
        nextTrack,
        prevTrack,
        setVolume,
        setCurrentTrack,
      }}
    >
      <audio
        ref={audioRef}
        src={playlist[currentTrack]?.file || ""}
        onEnded={nextTrack}
      />
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
