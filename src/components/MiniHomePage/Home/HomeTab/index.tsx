import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTabs } from "@/context/TabsContext";
import axios from "axios";
import { useSkin } from "@/context/SkinContext";
import { useLanguage } from "@/context/LanguageContext";
interface HomeTabProps {
  activeTab: string;
  isOwner: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const HomeTab: React.FC<HomeTabProps> = ({ activeTab, isOwner }) => {
  const router = useRouter();

  // 쿼리 값으로 현재 페이지 탭 구분
  const { id } = router.query;
  const currentTab = router.pathname.split("/")[1];
  const { userTabs } = useTabs();
  const { language } = useLanguage();
  // 탭 색깔
  const { tabBackgroundColor, fetchSkin } = useSkin();

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchSkin(id);
    }
  }, [id, fetchSkin]);

  // 홈 탭 필터
  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    const isHomeTab = key === "home";
    const isOwnerTab =
      isOwner && (key === "setting" || key === "profile" || key === "coco");
    const allowed = userTabs.includes(key);
    const isOtherVisibleTab =
      key !== "setting" && key !== "profile" && key !== "coco";
    return isHomeTab || isOwnerTab || (allowed && isOtherVisibleTab);
  });

  return (
    <HomeTabStyled>
      <div className="HomeTab_wrap">
        {filteredTabs.map(([key, label]) => (
          <div
            key={key}
            className={`HomeTab_item 
  ${currentTab === key ? "active" : ""} 
  dotumFont 
  HomeTab_number_title 
  ${currentTab === key && tabBackgroundColor === "black" ? "black" : ""}
`}
            onClick={() => {
              const targetPath = `/${key}/${id}`;

              if (router.asPath === targetPath) {
                router.reload();
              } else {
                router.push(targetPath);
              }
            }}
            style={
              currentTab === key
                ? { backgroundColor: "#ffffff", color: "black" } // 현재 탭: 흰 배경 + 검정 글씨
                : {
                    backgroundColor: tabBackgroundColor || "#2686a3",
                    color: "white",
                  }
            }
          >
            {language === "en" ? capitalize(key) : label}
          </div>
        ))}
      </div>
    </HomeTabStyled>
  );
};
export default HomeTab;
