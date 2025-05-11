import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";

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
  const filteredTabs = Object.entries(TAB_LABELS).filter(([key]) => {
    return !(key === "Setting" || key === "Profile") || isOwner;
  });

  return (
    <HomeTabStyled>
      <div className="HomeTab_wrap">
        {filteredTabs.map(([key, label]) => (
          <div
            key={key}
            className={`HomeTab_item ${
              activeTab === key ? "active" : ""
            } dotumFont HomeTab_number_title`}
            onClick={() => onTabClick(key)}
          >
            {label}
          </div>
        ))}
      </div>
    </HomeTabStyled>
  );
};
export default HomeTab;
