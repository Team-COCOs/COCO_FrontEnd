import { HomeMiniroomStyled } from "./styled";
import { useEffect } from "react";

const HomeMiniroom = () => {
  return (
    <HomeMiniroomStyled>
      <div className="HomeMiniroom_wrap">
        <div className="HomeMiniroom_number Gulim">Miniroom</div>
        <div className="HomeMiniroom_imgWrap">
          <img src="/miniroom/miniroom17.png" alt="miniroom img" />
        </div>
      </div>
    </HomeMiniroomStyled>
  );
};
export default HomeMiniroom;
