import { SettingLeftStyled } from "./styled";
import { useState } from "react";
import { settingLeftTabs } from "@/constants/SettingLeftTabs";
import MiniHomeProfileLeftMenu from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileLeft/MiniHomeProfileLeftMenu";

const SettingLeft = () => {
  const [language, setLanguage] = useState("ko"); // 초기 언어는 "ko"

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ko" ? "en" : "ko"));
  };

  return (
    <SettingLeftStyled>
      <div className="SettingLeft_wrap Gulim">
        <div className="SettingLeft_componentWrap">
          {" "}
          <MiniHomeProfileLeftMenu
            menuData={settingLeftTabs}
            language={language}
          />
        </div>
      </div>
    </SettingLeftStyled>
  );
};
export default SettingLeft;
