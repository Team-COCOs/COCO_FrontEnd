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
  // 전체 내 bgm 넣기
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

  const handlePlay = () => {
    if (!selectedBgm) {
      alert("재생할 곡을 선택해주세요.");
      return;
    }

    // 재생 중인지 아닌지 확인
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.src = selectedBgm.storeItems.file;
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

  const saveBgm = async () => {
    if (!selectedBgm) {
      alert("등록할 곡을 선택해주세요.");
      return;
    }

    // 스토어에 저장된 아이디를 보내야 하나?
    console.log(selectedBgm.storeItems.id);

    // 내 bgm에 있는 bgm id 보냄
    // try {
    //   await axiosInstance.post("/bgm/saveBgm", {
    //     bgmId: selectedBgm.id,
    //   });
    //   alert("배경음악이 등록되었습니다.");
    // } catch (e) {
    //   console.error(e);
    //   alert("등록 중 오류가 발생했습니다.");
    // }
  };

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.get("/purchases");
      const bgmItems = res.data.filter(
        (item: any) => item.storeItems.category === "bgm"
      );

      const filtered = bgmItems.filter((item: any) => {
        const name = item.storeItems.name.toLowerCase();
        const artist = item.storeItems.artist?.toLowerCase() || "";
        const term = searchTerm.toLowerCase();

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
    } catch (e) {
      console.error(e);
    }
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
    </MiniBgmStyle>
  );
};

export default MiniBgm;
