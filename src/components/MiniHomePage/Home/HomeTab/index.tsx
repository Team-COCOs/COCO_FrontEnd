import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";
import { useRouter } from "next/router";

interface HomeTabProps {
  activeTab: string;
  isOwner: boolean;
}

const HomeTab: React.FC<HomeTabProps> = ({ activeTab, isOwner }) => {
  const router = useRouter();

  // 쿼리 값으로 현재 페이지 탭 구분
  const { id } = router.query;
  const currentTab = router.pathname.split("/")[1];

  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    return !(key === "setting" || key === "profile") || isOwner;
  });

  console.log(filteredTabs, "filteredTabs?");
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
