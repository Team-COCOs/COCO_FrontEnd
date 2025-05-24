import { useAuth } from "@/context/AuthContext";
import { MiniBgmStyle } from "./styled";
import Image from "next/image";
import Bgm from "./Bgm";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import ShadowModal from "@/components/ShadowModal";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

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

  const { stop: stopGlobalMusic } = useMusicPlayer();

  // 전체 내 bgm 넣기
  const [allBgm, setAllBgm] = useState<BgmInfo[]>([]);
  const [bgm, setBgm] = useState<BgmInfo[]>([]);

  // 재생 중인 bgm
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedBgm, setSelectedBgm] = useState<BgmInfo | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // bgm 검색
  const [searchType, setSearchType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  useEffect(() => {
    const bgm = async () => {
      try {
        const res = await axiosInstance.get("/purchases");

        const bgmItems = res.data.filter(
          (item: any) => item.storeItems.category === "bgm"
        );

        setAllBgm(bgmItems);
        setBgm(bgmItems);
      } catch (e: any) {
        if (e.response?.status === 401) {
          setType("error");
          setIsOpen(true);
          setMessage("로그인이 필요합니다.");
        }
        console.log(e);
      }
    };

    bgm();
  }, []);

  const handlePlay = () => {
    if (!selectedBgm) {
      setType("error");
      setIsOpen(true);
      setMessage("재생할 곡을 선택해주세요.");
      return;
    }

    // 전역 BGM 정지
    stopGlobalMusic();

    // 재생 중인지 아닌지 확인
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.src = selectedBgm.storeItems.file;
        audioRef.current?.play().catch((err) => {
          console.warn("재생 실패:", err);
        });

        setTimeout(() => {
          setIsPlaying(true);
        }, 500);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const saveBgm = async () => {
    if (!selectedBgm) {
      setType("error");
      setIsOpen(true);
      setMessage("등록할 곡을 선택해주세요.");
      return;
    }

    const bgmFile = selectedBgm.storeItems.file;

    try {
      await axiosInstance.patch("/useritems/set-bgm", {
        bgmId: selectedBgm.storeItems.id,
        file: bgmFile,
      });

      setType("success");
      setIsOpen(true);
      setMessage("배경음악이 등록되었습니다.");
    } catch (e) {
      setType("error");
      setIsOpen(true);
      setMessage("등록 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();

    const filtered = allBgm.filter((item) => {
      const name = item.storeItems.name.toLowerCase();
      const artist = item.storeItems.artist?.toLowerCase() || "";

      if (searchType === "all") {
        return name.includes(term) || artist.includes(term);
      } else if (searchType === "artist") {
        return artist.includes(term);
      } else if (searchType === "title") {
        return name.includes(term);
      }
      return true;
    });

    setBgm(filtered);
    setCurrentPage(1);
  };

  return (
    <MiniBgmStyle className="MiniBgm_wrap">
      <span className="MiniBgm_title Gulim">배경음악 설정하기</span>
      <div className="MiniBgm_btn">
        <button onClick={handlePlay}>{isPlaying ? "정지" : "듣기"}</button>
        <button onClick={saveBgm}>배경음악 등록</button>
      </div>

      <Bgm
        bgm={bgm}
        onSelectBgm={setSelectedBgm}
        selectedBgm={selectedBgm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="MiniBgm_footDiv">
        <div className="MiniBgm_btn">
          <button onClick={handlePlay}>{isPlaying ? "정지" : "듣기"}</button>
          <button onClick={saveBgm}>배경음악 등록</button>
        </div>

        <div className="MiniBgm_footer">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="artist">가수</option>
            <option value="title">제목</option>
          </select>

          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>

      <audio ref={audioRef} hidden />

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);

          if (message === "로그인이 필요합니다.") {
            router.push(`/home/${user?.id}`);
          } else if (message === "배경음악이 등록되었습니다.") {
            window.location.reload();
          }
        }}
        message={message}
      />
    </MiniBgmStyle>
  );
};

export default MiniBgm;
