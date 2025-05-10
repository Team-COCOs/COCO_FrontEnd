import { MiniHomeProfileLeftStyled } from "./styled";
import { useState } from "react";
import MiniHomeProfileLeftMenu from "./MiniHomeProfileLeftMenu";
import { profileLeftTabs } from "@/constants/profileLeftTabs";

const MiniHomeProfileLeft = ({
  setProfileSelectedMenu,
  fixMiniroom,
  setfixMiniroom,
}: {
  setProfileSelectedMenu: (menu: { type?: string; title: string }) => void;
  fixMiniroom: boolean;
  setfixMiniroom: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [language, setLanguage] = useState("ko");

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
            onMenuSelect={setProfileSelectedMenu}
            setfixMiniroom={setfixMiniroom}
          />
        </div>
      </div>
    </MiniHomeProfileLeftStyled>
  );
};
export default MiniHomeProfileLeft;
