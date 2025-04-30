import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";

const CocoWorld = () => {
  const router = useRouter();

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        <div className="CocoWorldPage_profile">미니홈피</div>
        <div className="CocoWorldPage_store"></div>
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
