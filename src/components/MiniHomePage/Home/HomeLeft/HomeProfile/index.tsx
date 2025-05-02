import { HomeProfileStyled } from "./styled";
import { useEffect } from "react";

const HomeProfile = () => {
  return (
    <HomeProfileStyled>
      <div className="HomeProfile_wrap">
        <div className="HomeProfile_todayis Gulim">
          <span className="pixelFont">TODAY IS...</span> 행복❤️
        </div>
        <div className="HomeProfile_imgWrap">
          <img src="/avatarImg/minimi_firework.gif" alt="Profile img" />
        </div>
      </div>
    </HomeProfileStyled>
  );
};
export default HomeProfile;
