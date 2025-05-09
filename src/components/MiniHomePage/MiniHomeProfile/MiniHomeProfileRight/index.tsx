import { MiniHomeProfileRightStyled } from "./styled";
import { useEffect } from "react";

interface ProfileSelectedMenu {
  type?: string;
  title: string;
}

const MiniHomeProfileRight = ({
  profileSelectedMenu,
}: {
  profileSelectedMenu: ProfileSelectedMenu | null;
}) => {
  useEffect(() => {
    console.log("Selected menu:", profileSelectedMenu);
  }, [profileSelectedMenu]);

  const renderContent = () => {
    if (!profileSelectedMenu) {
      return <div>기본 내용</div>;
    }

    switch (profileSelectedMenu.title) {
      case "내 상태 관리":
        return <div>내 상태 관리 내용</div>;
      case "BGM":
        return <div>BGM 관련 내용</div>;
      case "미니미":
        return <div>미니미 내용</div>;
      case "미니룸":
        return <div>미니룸 내용</div>;
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
