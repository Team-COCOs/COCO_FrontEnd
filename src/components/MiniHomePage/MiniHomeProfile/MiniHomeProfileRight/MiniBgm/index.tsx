import { useAuth } from "@/context/AuthContext";
import { MiniBgmStyle } from "./styled";
import Image from "next/image";
import Bgm from "./Bgm";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const MiniBgm = () => {
  const { user } = useAuth();
  const [bgm, setBgm] = useState([]);

  useEffect(() => {
    const bgm = async () => {
      try {
        const res = await axiosInstance.get("/bgm/getMyBgm");

        setBgm(res.data);

        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    // bgm();
  }, []);

  const searchBgm = () => {};

  return (
    <MiniBgmStyle className="MiniBgm_wrap">
      <span className="MiniBgm_title Gulim">배경음악 설정하기</span>
      <div className="MiniBgm_btn">
        <button>듣기</button>
        <button>배경음악 등록</button>
      </div>

      <Bgm />

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
