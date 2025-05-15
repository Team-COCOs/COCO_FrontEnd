import React, { useEffect, useState } from "react";
import { BKbuyStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const BKbuy = () => {
  const router = useRouter();
  const { id } = router.query;
  const [homepiBkData, setHomepiBkData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMinimiData = async () => {
      try {
        const response = await axiosInstance.get(`/purchases`);
        setHomepiBkData(response.data);
        console.log(response.data, "??");
      } catch (e: any) {
        if (e.response && e.response.status === 401) {
          alert("로그인이 필요합니다.");
          router.push(`/home/${id}`);
        } else {
          console.log(e, "구매 목록 불러오기 실패");
        }
      }
    };
    fetchMinimiData();
  }, []);

  // 기본 항목 정의
  const defaultBK = {
    id: "default-bk",
    storeItems: {
      file: "/background/default_bk.jpg",
      name: "기본 배경",
      category: "minihomepis",
    },
  };

  const defaultSkin = {
    id: "default-minihomepis",
    storeItems: {
      file: "/background/default_diarybk.jpg",
      name: "기본 다이어리",
      category: "diary_background",
    },
  };

  const defaultTab = {
    id: "default-tapcolor",
    storeItems: {
      file: "/background/default_tabcolor.jpg",
      name: "기본 탭색",
      category: "tapcolor",
    },
  };

  // 기존 필터에 기본값 추가
  const onlyBK = [
    defaultBK,
    ...homepiBkData.filter((x) => x.storeItems.category === "minihomepis"),
  ];

  const onlySkin = [
    defaultSkin,
    ...homepiBkData.filter((x) => x.storeItems.category === "diary_background"),
  ];

  const onlytab = [
    defaultTab,
    ...homepiBkData.filter((x) => x.storeItems.category === "tapcolor"),
  ];

  return (
    <BKbuyStyled>
      <div className="BKbuy_wrap">
        <div className="BKbuy_titleWrap">
          <div className="BKbuy_setBox">
            {/* minihomepis */}
            <div className="BKbuy_miniTitle Gulim">🔸미니홈피 배경 변경</div>
            <div className="BKbuy_grid">
              {onlyBK.map((x) => (
                <div key={x.id} className="BKbuy_bk_allwrap Gulim">
                  <div className="BKbuy_bk_grid Gulim">
                    <input
                      type="radio"
                      value={`${x.id}`}
                      name="minihomepis"
                    ></input>
                    <div className="BKbuy_bk_imgwrap">
                      <img src={x.storeItems.file} />
                    </div>
                    <div className="BKbuy_bk_name">{x.storeItems.name}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* diary_background */}
            <div className="BKbuy_miniTitle Gulim">🔸다이어리 배경 변경</div>
            <div className="BKbuy_grid">
              {onlySkin.map((x) => (
                <div key={x.id} className="BKbuy_bk_allwrap Gulim">
                  <div className="BKbuy_bk_grid Gulim">
                    <input
                      type="radio"
                      value={`${x.id}`}
                      name={"diary_background"}
                    ></input>
                    <div className="BKbuy_bk_imgwrap">
                      <img src={x.storeItems.file} />
                    </div>
                    <div className="BKbuy_bk_name">{x.storeItems.name}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* tapcolor */}
            <div className="BKbuy_miniTitle Gulim">🔸탭 색 변경</div>
            <div className="BKbuy_grid">
              {onlytab.map((x) => (
                <div key={x.id} className="BKbuy_bk_allwrap Gulim">
                  <div className="BKbuy_bk_grid Gulim">
                    <input
                      type="radio"
                      value={`${x.id}`}
                      name="tapcolor"
                    ></input>
                    <div className="BKbuy_bk_imgwrap">
                      <img src={x.storeItems.file} />
                    </div>
                    <div className="BKbuy_bk_name">{x.storeItems.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="BKbuy_btnWrap">
            <button className="BKbuy_savebtn">저장</button>
          </div>
        </div>
      </div>
    </BKbuyStyled>
  );
};

export default BKbuy;
