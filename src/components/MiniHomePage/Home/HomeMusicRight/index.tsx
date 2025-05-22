import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { HomeMusicRightStyled } from "./styled";

const HomeMusicRight = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    playlist,
    currentTrack,
    isPlaying,
    hasPlayedOnce,
    volume,
    setPlaylist,
    togglePlay,
    stop,
    nextTrack,
    prevTrack,
    setVolume,
  } = useMusicPlayer();

  const clickShop = () => router.push("/");
  const handleHomeClick = () => router.push("/");

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const getVolumeBackground = (value: number) => {
    const percentage = (value / 1) * 100;
    return `linear-gradient(to right, #ee6700 0%, #ee6700 ${percentage}%, #ececec ${percentage}%, #ececec 100%)`;
  };

  useEffect(() => {
    const fetchBuyBgm = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/bgm/${id}`
        );
        setPlaylist(res.data);
      } catch (e) {
        console.error("BGM 가져오기 오류:", e);
      }
    };

    if (id) fetchBuyBgm();
  }, [id]);

  return (
    <HomeMusicRightStyled>
      <div className="HomeMusicRight_wrap">
        <div className="HomeMusicRightPlayer_wrap">
          <div className="HomeMusicRight_number Gulim">
            <div className="HomeMusicRight_shop">
              <span>선물가게 / 추천 BGM</span>
              <div className="HomeMusicRight_shop_imgallwrap">
                <div>
                  <img src="/bgm/noon.jpg" onClick={clickShop} />
                </div>
                <div>
                  <img src="/bgm/12_32.jpg" onClick={clickShop} />
                </div>
              </div>
              <div
                className="HomeMusicRight_homebtn_wrap"
                onClick={handleHomeClick}
              >
                <div className="HomeMusicRight_homebtn_white_wrap">
                  <div className="HomeMusicRight_homebtn_imgwrap">
                    <img src="/cocoworld.png" />
                  </div>
                  &nbsp;홈으로 가기
                </div>
              </div>
            </div>
          </div>

          <div className="HomeMusicRight_player">
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
                  🎵 {playlist[currentTrack]?.name} -{" "}
                  {playlist[currentTrack]?.artist}
                </div>
              )}
            </div>

            <div className="HomeMusicRight_volume-control">
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
                  style={{ background: getVolumeBackground(volume) }}
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
