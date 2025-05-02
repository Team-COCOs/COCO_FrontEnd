import { HomeTabStyled } from "./styled";
import { TAB_LABELS } from "@/constants/tabs";

interface HomeTabProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ activeTab, onTabClick }) => {
  return (
    <HomeTabStyled>
      <div className="HomeTab_wrap">
        {Object.entries(TAB_LABELS).map(([key, label]) => (
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
