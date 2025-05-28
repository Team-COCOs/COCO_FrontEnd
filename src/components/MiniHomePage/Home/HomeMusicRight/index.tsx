import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { HomeMusicRightStyled } from "./styled";

type Track = {
  id: number;
  name: string;
  artist: string;
  file: string;
};

const HomeMusicRight = () => {
  const prevIdRef = useRef<string | string[] | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const {
    playlist,
    currentTrack,
    isPlaying,
    hasPlayedOnce,
    setHasPlayedOnce,
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

  // useEffect(() => {
  //   const fetchBuyBgm = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/useritems/bgm/${id}`
  //       );
  //       setPlaylist(res.data);
  //       if (!res.data || res.data.length === 0) {
  //         stop();
  //         setHasPlayedOnce(false);
  //       } else {
  //         if (!isPlaying) {
  //           setHasPlayedOnce(false);
  //           togglePlay();
  //         }
  //       }
  //     } catch (e) {
  //       console.error("BGM 가져오기 오류:", e);
  //       stop();
  //     }
  //   };

  //   if (id) fetchBuyBgm();
  // }, [id]);

  useEffect(() => {
    if (!id || String(prevIdRef.current) === String(id)) return;

    const fetchBuyBgm = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/bgm/${id}`
        );
        const newPlaylist = res.data;

        const isSamePlaylist =
          JSON.stringify((playlist ?? []).map((p: Track) => p.id)) ===
          JSON.stringify(newPlaylist.map((p: Track) => p.id));

        // 동일한 플레이리스트면 아무것도 하지 않음
        if (isSamePlaylist) {
          prevIdRef.current = id;
          return;
        }

        setPlaylist(newPlaylist);

        if (!newPlaylist || newPlaylist.length === 0) {
          stop();
          setHasPlayedOnce(false);
        } else {
          stop(); // 먼저 정지한 후
          setHasPlayedOnce(false);
          setTimeout(() => {
            togglePlay(); // 잠깐 기다렸다가 재생
          }, 50); // 50ms 딜레이로 끊김 방지
        }

        prevIdRef.current = id;
      } catch (e) {
        console.error("BGM 가져오기 오류:", e);
        stop();
      }
    };

    fetchBuyBgm();
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
              ) : !hasPlayedOnce || !isPlaying ? (
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
