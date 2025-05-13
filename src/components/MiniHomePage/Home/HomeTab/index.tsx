import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";
import { useRouter } from "next/router";

interface HomeTabProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  isOwner: boolean;
}

const HomeTab: React.FC<HomeTabProps> = ({
  activeTab,
  onTabClick,
  isOwner,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    return !(key === "Setting" || key === "Profile") || isOwner;
  });

  console.log(filteredTabs, "filteredTabs?");
  return (
    <HomeTabStyled>
      <div className="HomeTab_wrap">
        {filteredTabs.map(([key, label]) => (
          <div
            key={key}
            className={`HomeTab_item ${
              activeTab === key ? "active" : ""
            } dotumFont HomeTab_number_title`}
            onClick={() => {
              onTabClick(key); // 탭 상태 변경
              router.push(`/${key}/${id}`); // 페이지 이동
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
