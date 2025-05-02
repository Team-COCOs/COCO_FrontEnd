import { HomeMusicRightStyled } from "./styled";
import { useEffect, useRef, useState } from "react";

const playlist = [
  { title: "Y - 프리스타일", url: "/bgm/y-freestyle.mp3" },
  { title: "12월 32일 - 별", url: "/bgm/12-32.mp3" },
];

const HomeMusicRight = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1); // 볼륨 상태 (1은 최대 볼륨)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
        setHasPlayedOnce(true);
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <HomeMusicRightStyled>
      <div className="HomeMusicRight_wrap">
        <div className="HomeMusicRightPlayer_wrap">
          <div className="HomeMusicRight_number Gulim">MusicRight</div>
          <div className="HomeMusicRight_player">
            <audio
              ref={audioRef}
              src={playlist[currentTrack].url}
              onEnded={nextTrack}
              autoPlay
            />
            <div className="HomeMusicRight_title">
              {playlist.length === 0 ? (
                <div className="scroll-text no-music">
                  🎵 음악을 등록하세요.
                </div>
              ) : !hasPlayedOnce ? (
                <div className="scroll-text paused">⏸ 재생 중이지 않음</div>
              ) : (
                <div
                  className={`scroll-text ${isPlaying ? "playing" : "paused"}`}
                >
                  🎵 {playlist[currentTrack].title}
                </div>
              )}
            </div>

            {/* 버튼들 */}
            <div className="control-buttons">
              <button onClick={prevTrack}>⏮</button>
              <button onClick={() => setIsPlaying((p) => !p)}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={nextTrack}>⏭</button>
            </div>
            {/* 볼륨 조절 */}
            <div className="volume-control">
              <label htmlFor="volume">Volume:</label>
              <input
                type="range"
                id="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </HomeMusicRightStyled>
  );
};

export default HomeMusicRight;
