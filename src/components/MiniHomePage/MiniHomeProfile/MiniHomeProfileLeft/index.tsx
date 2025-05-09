import { MiniHomeProfileLeftStyled } from "./styled";
import { useState } from "react";
import MiniHomeProfileLeftMenu from "./MiniHomeProfileLeftMenu";
import { profileLeftTabs } from "@/constants/profileLeftTabs";

const MiniHomeProfileLeft = () => {
  const [language, setLanguage] = useState("ko"); // 초기 언어는 "ko"

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ko" ? "en" : "ko"));
  };

  return (
    <MiniHomeProfileLeftStyled>
      <div className="MiniHomeProfileLeft_wrap Gulim">
        <div className="MiniHomeProfileLeft_componentWrap">
          <MiniHomeProfileLeftMenu
            menuData={profileLeftTabs}
            language={language}
          />
        </div>
      </div>
    </MiniHomeProfileLeftStyled>
  );
};
export default MiniHomeProfileLeft;
