import { HomeMusicRightStyled } from "./styled";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const playlist = [
  { title: "Y - 프리스타일", url: "/bgm/y-freestyle.mp3" },
  { title: "12월 32일 - 별", url: "/bgm/12-32.mp3" },
];

const HomeMusicRight = () => {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [volume, setVolume] = useState(1);

  const clickShop = () => {
    router.push("/");
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio
          .play()
          .then(() => {
            setHasPlayedOnce(true);
          })
          .catch((err) => {
            console.warn("자동 재생 실패:", err);
            setIsPlaying(false);
            setHasPlayedOnce(false);
          });
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
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume; // 오디오 볼륨을 변경
    }
  };
  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setHasPlayedOnce(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => {
        console.warn("자동 재생이 차단되었습니다.", e);
      });
    }
    setIsPlaying((prev) => !prev);
  };

  const getVolumeBackground = (value: number) => {
    const percentage = (value / 1) * 100; // max volume is 1
    return `linear-gradient(to right, #ee6700 0%, #ee6700 ${percentage}%, #ececec ${percentage}%, #ececec 100%)`;
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <HomeMusicRightStyled>
      <div className="HomeMusicRight_wrap">
        <div className="HomeMusicRightPlayer_wrap">
          <div className="HomeMusicRight_number Gulim">
            <div className="HomeMusicRight_shop">
              <span>선물가게 / 추천 BGM</span>
              <div className="HomeMusicRight_shop_imgallwrap">
                <div>
                  <img
                    src="/bgm/noon.jpg"
                    onClick={clickShop}
                    alt="click minimishop"
                  ></img>
                </div>
                <div>
                  <img
                    src="/bgm/12_32.jpg"
                    onClick={clickShop}
                    alt="click minimishop"
                  ></img>
                </div>
              </div>
              <div
                className="HomeMusicRight_homebtn_wrap"
                onClick={handleHomeClick}
              >
                <div className="HomeMusicRight_homebtn_white_wrap">
                  <div className="HomeMusicRight_homebtn_imgwrap">
                    <img src="/cocoworld.png"></img>
                  </div>
                  &nbsp;홈으로 가기
                </div>
              </div>
            </div>
          </div>
          <div className="HomeMusicRight_player">
            <audio
              ref={audioRef}
              src={playlist[currentTrack].url}
              onEnded={nextTrack}
            />
            <div className="HomeMusicRight_title">
              <span className="HomeMusicRight_cd-icon">💿</span>
              {playlist.length === 0 ? (
                <div className="scroll-text no-music">음악을 등록하세요.</div>
              ) : !hasPlayedOnce && !isPlaying ? (
                <div className="scroll-text no-music">음악을 재생해보세요.</div>
              ) : (
                <div
                  className={`scroll-text ${isPlaying ? "playing" : "paused"}`}
                >
                  🎵 {playlist[currentTrack].title}
                </div>
              )}
            </div>

            {/* 볼륨 조절 */}
            <div className="HomeMusicRight_volume-control">
              {/* 버튼들 */}
              <div className="control-buttons">
                <button
                  className="HomeMusicRight_startbtn"
                  onClick={togglePlay}
                >
                  {isPlaying ? "⏸" : "⯈"}
                </button>
                <button onClick={stop}>◼</button>
                <button onClick={prevTrack}>⏮</button>
                <button onClick={nextTrack}>⏭</button>
              </div>
              <div className="HomeMusicRight_volBtn">
                <label htmlFor="volume">🔊</label>
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    background: getVolumeBackground(volume),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeMusicRightStyled>
  );
};

export default HomeMusicRight;
