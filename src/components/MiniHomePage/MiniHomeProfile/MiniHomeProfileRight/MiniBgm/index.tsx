import { useAuth } from "@/context/AuthContext";
import { MiniBgmStyle } from "./styled";
import Image from "next/image";
import Bgm from "./Bgm";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axios";

interface BgmInfo {
  id: number;
  acquired_at: string;
  storeItems: {
    id: number;
    name: string;
    artist: string | null;
    category: string;
    created_at: string;
    duration: number | null;
    file: string;
    price: number;
  };
}

const MiniBgm = () => {
  const { user } = useAuth();
  const [bgm, setBgm] = useState<BgmInfo[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 재생 상태 관리
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bgm = async () => {
      try {
        const res = await axiosInstance.get("/purchases");

        const bgmItems = res.data.filter(
          (item: any) => item.storeItems.category === "bgm"
        );

        setBgm(bgmItems);
      } catch (e) {
        console.log(e);
      }
    };

    bgm();
  }, []);

  const handlePlay = (file: string) => {
    if (audioRef.current) {
      // 이미 재생 중인 파일을 클릭하면 멈춤
      if (audioRef.current.paused) {
        audioRef.current.src = file; // 새로운 파일로 설정
        audioRef.current.play().catch((err) => {
          console.warn("재생 실패:", err);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <MiniBgmStyle className="MiniBgm_wrap">
      <span className="MiniBgm_title Gulim">배경음악 설정하기</span>
      <div className="MiniBgm_btn">
        <button onClick={() => handlePlay(bgm[0]?.storeItems.file)}>
          {isPlaying ? "정지" : "듣기"}
        </button>
        <button>배경음악 등록</button>
      </div>

      <Bgm bgm={bgm} />

      <div className="MiniBgm_btn">
        <button onClick={() => handlePlay(bgm[0]?.storeItems.file)}>
          {isPlaying ? "정지" : "듣기"}
        </button>
        <button>배경음악 등록</button>
      </div>

      <div className="MiniBgm_footer">
        <select defaultValue="all">
          <option value="all">전체</option>
          <option value="artist">가수</option>
          <option value="title">제목</option>
        </select>
        <input type="text" placeholder="검색" />
        <button>검색</button>
      </div>

      <audio ref={audioRef} hidden />
    </MiniBgmStyle>
  );
};

export default MiniBgm;
