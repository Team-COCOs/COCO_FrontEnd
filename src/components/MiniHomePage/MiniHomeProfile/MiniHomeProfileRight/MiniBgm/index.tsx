import { useAuth } from "@/context/AuthContext";
import { MiniBgmStyle } from "./styled";
import Image from "next/image";
import Bgm from "./Bgm";
import { useEffect, useState } from "react";
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

  const searchBgm = () => {};

  return (
    <MiniBgmStyle className="MiniBgm_wrap">
      <span className="MiniBgm_title Gulim">배경음악 설정하기</span>
      <div className="MiniBgm_btn">
        <button>듣기</button>
        <button>배경음악 등록</button>
      </div>

      <Bgm bgm={bgm} />

      <div className="MiniBgm_btn">
        <button>듣기</button>
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
    </MiniBgmStyle>
  );
};

export default MiniBgm;
