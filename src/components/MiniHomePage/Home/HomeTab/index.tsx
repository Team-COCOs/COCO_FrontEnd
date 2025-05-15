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

const HomeTab: React.FC<HomeTabProps> = ({ activeTab, isOwner }) => {
  const router = useRouter();

  // 쿼리 값으로 현재 페이지 탭 구분
  const { id } = router.query;
  const currentTab = router.pathname.split("/")[1];

  const [userTabs, setUserTabs] = useState<string[]>([]);

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

  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    const isHomeTab = key === "home";
    const isOwnerTab = isOwner && (key === "setting" || key === "profile");
    const allowed = userTabs.includes(key);
    const isOtherVisibleTab = key !== "setting" && key !== "profile";
    return isHomeTab || isOwnerTab || (allowed && isOtherVisibleTab);
  });

  return (
    <HomeTabStyled>
      <div className="HomeTab_wrap">
        {filteredTabs.map(([key, label]) => (
          <div
            key={key}
            className={`HomeTab_item ${
              currentTab === key ? "active" : ""
            } dotumFont HomeTab_number_title`}
            onClick={() => {
              router.push(`/${key}/${id}`);
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </HomeTabStyled>
  );
};
export default HomeTab;
