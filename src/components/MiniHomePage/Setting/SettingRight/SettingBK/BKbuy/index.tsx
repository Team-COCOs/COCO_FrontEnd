import React, { useEffect, useState } from "react";
import { BKbuyStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import axios from "axios";
const BKbuy = () => {
  const router = useRouter();
  const { id } = router.query;
  const [homepiBkData, setHomepiBkData] = useState<any[]>([]);
  const [selectedMinihomepis, setSelectedMinihomepis] = useState(
    "default-minihomepis"
  );
  const [selectedDiary, setSelectedDiary] = useState("default-bk");
  const [selectedTab, setSelectedTab] = useState("default-tapcolor");

  useEffect(() => {
    if (!id) return;

    const fetchPurchasedItems = async () => {
      try {
        const response = await axiosInstance.get("/purchases");
        setHomepiBkData(response.data);
        console.log(response.data, "전체 구매 배경 데이터?");
      } catch (e: any) {
        if (e.response?.status === 401) {
          alert("로그인이 필요합니다.");
          router.push(`/home/${id}`);
        } else {
          console.error("구매 목록 불러오기 실패", e);
        }
      }
    };

    const fetchCurrentTheme = async () => {
      try {
        const [minihomepisRes, diaryRes, tabRes] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/useritems/minihomepis/${id}`
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/useritems/bk/${id}`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/useritems/tapcolor/${id}`
          ),
        ]);
        setSelectedMinihomepis(
          minihomepisRes.data?.id || "default-minihomepis"
        );
        setSelectedDiary(diaryRes.data?.id || "default-bk");
        setSelectedTab(tabRes.data?.id || "default-tapcolor");
      } catch (e) {
        console.error("초기 설정값 불러오기 실패", e);
      }
    };

    fetchPurchasedItems();
    fetchCurrentTheme();
  }, [id]);
  // 기본 항목 정의
  const defaultMinihomepis = {
    id: "default-minihomepis",
    storeItems: {
      file: "/background/default_bk.jpg",
      name: "기본 배경",
      category: "minihomepis",
    },
  };

  const defaultBK = {
    id: "default-bk",
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
  const onlyMinihomepis = [
    defaultMinihomepis,
    ...homepiBkData.filter((x) => x.storeItems.category === "minihomepis"),
  ];

  const onlySkin = [
    defaultBK,
    ...homepiBkData.filter((x) => x.storeItems.category === "diary_background"),
  ];

  const onlytab = [
    defaultTab,
    ...homepiBkData.filter((x) => x.storeItems.category === "tapcolor"),
  ];

  const saveUserThemes = async () => {
    try {
      await Promise.all([
        axiosInstance.patch("/useritems/set-tapcolor", {
          purchaseId: selectedTab,
        }),
        axiosInstance.patch("/useritems/set-BK", {
          purchaseId: selectedDiary,
        }),
        axiosInstance.patch("/useritems/set-minihomepis", {
          purchaseId: selectedMinihomepis,
        }),
      ]);

      alert("미니홈피 효과 저장 완료!");
      router.push(`/home/${id}`);
    } catch (error) {
      console.error("테마 저장 중 오류 발생:", error);
    }
  };

  return (
    <BKbuyStyled>
      <div className="BKbuy_wrap">
        <div className="BKbuy_titleWrap">
          <div className="BKbuy_setBox">
            {/* minihomepis */}
            <div className="BKbuy_miniTitle Gulim">🔸미니홈피 배경 변경</div>
            <div className="BKbuy_grid">
              {onlyMinihomepis.map((x) => (
                <div key={x.id} className="BKbuy_bk_allwrap Gulim">
                  <div className="BKbuy_bk_grid Gulim">
                    <input
                      type="radio"
                      value={String(x.id)}
                      name="minihomepis"
                      checked={String(selectedMinihomepis) === String(x.id)}
                      onChange={(e) => setSelectedMinihomepis(e.target.value)}
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
                      value={String(x.id)}
                      name="diary_background"
                      checked={String(selectedDiary) === String(x.id)}
                      onChange={(e) => setSelectedDiary(e.target.value)}
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
                      value={String(x.id)}
                      name="tapcolor"
                      checked={String(selectedTab) === String(x.id)}
                      onChange={(e) => setSelectedTab(e.target.value)}
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
            <button className="BKbuy_savebtn" onClick={saveUserThemes}>
              저장
            </button>
          </div>
        </div>
      </div>
    </BKbuyStyled>
  );
};

export default BKbuy;
