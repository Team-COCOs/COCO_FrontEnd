import { SettingLeftStyled } from "./styled";
import { useState } from "react";
import { settingLeftTabs } from "@/constants/settingLeftTabs";
import MiniHomeProfileLeftMenu from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileLeft/MiniHomeProfileLeftMenu";

const SettingLeft = ({
  setSettingSelectedMenu,
}: {
  setSettingSelectedMenu: (menu: { type?: string; title: string }) => void;
}) => {
  const [language, setLanguage] = useState("ko"); // 초기 언어는 "ko"

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ko" ? "en" : "ko"));
  };

  return (
    <SettingLeftStyled>
      <div className="SettingLeft_wrap Gulim">
        <div className="SettingLeft_componentWrap">
          <MiniHomeProfileLeftMenu
            onMenuSelect={setSettingSelectedMenu}
            menuData={settingLeftTabs}
            language={language}
          />
        </div>
      </div>
    </SettingLeftStyled>
  );
};
export default SettingLeft;
