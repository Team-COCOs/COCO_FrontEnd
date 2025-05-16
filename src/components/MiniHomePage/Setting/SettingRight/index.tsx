import { SettingRightStyled } from "./styled";
import { useEffect } from "react";
import SettingTabs from "./SettingTabs";
import SettingBK from "./SettingBK";
import SettingMyInfo from "./SettingMyInfo";
import SettingFriend from "./SettingFriend";

interface SettingSelectedMenu {
  type?: string;
  title: string;
}

const SettingRight = ({
  settingSelectedMenu,
}: {
  settingSelectedMenu: SettingSelectedMenu | null;
}) => {
  const renderContent = () => {
    if (!settingSelectedMenu) {
      return <SettingFriend />;
    }

    switch (settingSelectedMenu.title) {
      case "일촌 관리":
        return <SettingFriend />;
      case "미니홈피 효과":
        return (
          <div>
            <SettingBK />
          </div>
        );
      case "메뉴":
        return (
          <div>
            <SettingTabs />
          </div>
        );
      case "내 정보 수정":
        return <SettingMyInfo />;
      default:
        return <SettingFriend />;
    }
  };
  return (
    <SettingRightStyled>
      <div className="SettingRight_wrap">
        <div className="SettingRight_component_wrap">{renderContent()}</div>
      </div>
    </SettingRightStyled>
  );
};
export default SettingRight;
