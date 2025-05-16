import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [tabBackgroundColor, setTabBackgroundColor] = useState("");

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

  // 메인 홈 탭 배경 색 불러오기
  useEffect(() => {
    const fetchTabBackGround = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/tapcolor/${id}`
        );
        const data = response.data;
        const dataArray = Array.isArray(data) ? data : [data];
        // 배열로 만들기
        const matched = dataArray.find(
          (item: any) =>
            item.name &&
            (item.name.includes("pink") ||
              item.name.includes("black") ||
              item.name.includes("blue"))
        );

        if (matched) {
          // 색상 조건 분기
          if (matched.name.includes("blue")) {
            setTabBackgroundColor("#697dff"); // 파랑
          } else if (matched.name.includes("black")) {
            setTabBackgroundColor("black"); // 검정
          } else if (matched.name.includes("pink")) {
            setTabBackgroundColor("#ffadbf"); // 핑크
          }
        } else {
          setTabBackgroundColor("#2686a3");
        }
      } catch (e: any) {
        console.error("다이어리 배경 조회 실패:", e);
        setTabBackgroundColor("#2686a3");
      }
    };
    fetchTabBackGround();
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
