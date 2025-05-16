import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSkin } from "@/context/SkinContext";

interface HomeTabProps {
  activeTab: string;
  isOwner: boolean;
}

const DEFAULT_TABS = ["photo", "diary", "visitor", "coco"];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const HomeTab: React.FC<HomeTabProps> = ({ activeTab, isOwner }) => {
  const router = useRouter();

  // 쿼리 값으로 현재 페이지 탭 구분
  const { id } = router.query;
  const currentTab = router.pathname.split("/")[1];

  const [userTabs, setUserTabs] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("ko");

  // 탭 색깔
  const { tabBackgroundColor, fetchSkin } = useSkin();

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchSkin(id);
    }
  }, [id, fetchSkin]);

  // 메인 홈 탭 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchTabs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/tabs/${id}`
        );

        if (Array.isArray(data) && data.length === 0) {
          setUserTabs(DEFAULT_TABS);
        } else {
          setUserTabs(data);
        }
      } catch (error) {
        console.error("탭 불러오기 실패", error);
        setUserTabs(DEFAULT_TABS);
      }
    };

    fetchTabs();
  }, [id]);

  // 홈 탭 필터
  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    const isHomeTab = key === "home";
    const isOwnerTab = isOwner && (key === "setting" || key === "profile");
    const allowed = userTabs.includes(key);
    const isOtherVisibleTab = key !== "setting" && key !== "profile";
    return isHomeTab || isOwnerTab || (allowed && isOtherVisibleTab);
  });

  // 메인 홈 탭 언어 기본 설정 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchLanguageSettings = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/language/${id}`
        );
        setLanguage(data);
        console.log(data, "tab 데이터 오는지");
      } catch (error) {
        console.error("설정 불러오기 실패:", error);
      }
    };
    fetchLanguageSettings();
  }, [id]);

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
              router.push(`/${key}/${id}`);
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
