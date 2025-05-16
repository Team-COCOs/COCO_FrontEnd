import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface SkinContextType {
  backgroundUrl: string;
  backgroundColor: string;
  diaryBackgroundColor: string;
  tabBackgroundColor: string;
  fetchSkin: (id: string) => Promise<void>;
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export const SkinProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundUrl, setBackgroundUrl] = useState<string>(
    "/images/default_bg.jpg"
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [diaryBackgroundColor, setDiaryBackgroundColor] =
    useState<string>("#a6cfdb");
  const [tabBackgroundColor, setTabBackgroundColor] =
    useState<string>("#2686a3");

  const fetchSkin = async (id: string) => {
    try {
      // 🖼️ 미니홈 배경
      const bgRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/useritems/minihomepis/${id}`
      );
      const bgData = Array.isArray(bgRes.data) ? bgRes.data : [bgRes.data];
      const bgMatched = bgData.find((item) =>
        item?.name?.match(/pink|black|green|blue/)
      );

      if (bgMatched) {
        setBackgroundUrl(""); // 이미지 없이 배경색만 사용
        if (bgMatched.name.includes("pink")) setBackgroundColor("#e5c7dc");
        else if (bgMatched.name.includes("black")) setBackgroundColor("black");
        else if (bgMatched.name.includes("green"))
          setBackgroundColor("#395f4a");
        else if (bgMatched.name.includes("blue")) setBackgroundColor("#697dff"); // blue 추가
      } else {
        setBackgroundUrl("/images/default_bg.jpg");
        setBackgroundColor("");
      }

      // 📖 다이어리 배경
      const diaryRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/useritems/bk/${id}`
      );
      const diaryData = Array.isArray(diaryRes.data)
        ? diaryRes.data
        : [diaryRes.data];
      const diaryMatched = diaryData.find((item) =>
        item?.name?.match(/pink|black|green/)
      );

      if (diaryMatched) {
        if (diaryMatched.name.includes("pink"))
          setDiaryBackgroundColor("#cfa2be");
        else if (diaryMatched.name.includes("black"))
          setDiaryBackgroundColor("black");
        else if (diaryMatched.name.includes("green"))
          setDiaryBackgroundColor("#4a5245");
      } else {
        setDiaryBackgroundColor("#a6cfdb");
      }

      // 탭 배경색
      const tabRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/useritems/tapcolor/${id}`
      );
      const tabData = Array.isArray(tabRes.data) ? tabRes.data : [tabRes.data];
      const tabMatched = tabData.find(
        (item) =>
          item?.name &&
          (item.name.includes("pink") ||
            item.name.includes("black") ||
            item.name.includes("blue"))
      );

      if (tabMatched) {
        if (tabMatched.name.includes("blue")) setTabBackgroundColor("#697dff");
        else if (tabMatched.name.includes("black"))
          setTabBackgroundColor("black");
        else if (tabMatched.name.includes("pink"))
          setTabBackgroundColor("#ffadbf");
      } else {
        setTabBackgroundColor("#2686a3");
      }
    } catch (error) {
      console.error("스킨 정보 로드 실패:", error);
      setBackgroundUrl("/images/default_bg.jpg");
      setBackgroundColor("");
      setDiaryBackgroundColor("#a6cfdb");
      setTabBackgroundColor("#2686a3");
    }
  };

  return (
    <SkinContext.Provider
      value={{
        backgroundUrl,
        backgroundColor,
        diaryBackgroundColor,
        tabBackgroundColor,
        fetchSkin,
      }}
    >
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = (): SkinContextType => {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error("useSkin must be used within a SkinProvider");
  }
  return context;
};
