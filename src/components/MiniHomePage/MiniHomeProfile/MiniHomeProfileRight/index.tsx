import { MiniHomeProfileRightStyled } from "./styled";
import { useEffect, useState } from "react";
import MiniroomSet from "./MiniroomSet";
import MinimiSet from "./MinimiSet";
import MiniStatus from "./MiniStatus";
import MiniBgm from "./MiniBgm";

interface ProfileSelectedMenu {
  type?: string;
  title: string;
}

const MiniHomeProfileRight = ({
  profileSelectedMenu,
  fixMiniroom,
  setfixMiniroom,
}: {
  profileSelectedMenu: ProfileSelectedMenu | null;
  fixMiniroom: boolean;
  setfixMiniroom: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const renderContent = () => {
    if (!profileSelectedMenu) {
      return <MiniStatus />;
    }

    switch (profileSelectedMenu.title) {
      case "내 상태 관리":
        return <MiniStatus />;
      case "BGM":
        return <MiniBgm />;
      case "미니미":
        return <MinimiSet />;
      case "미니룸":
        return (
          <MiniroomSet
            fixMiniroom={fixMiniroom}
            setfixMiniroom={setfixMiniroom}
          />
        );
      default:
        return <div>기본 프로필 내용</div>;
    }
  };
  return (
    <MiniHomeProfileRightStyled>
      <div className="MiniHomeProfileRight_wrap">
        <div className="MiniHomeProfileRight_component_wrap">
          {renderContent()}
        </div>
      </div>
    </MiniHomeProfileRightStyled>
  );
};
export default MiniHomeProfileRight;
