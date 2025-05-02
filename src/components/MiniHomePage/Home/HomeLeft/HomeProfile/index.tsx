import { HomeProfileStyled } from "./styled";
import { useEffect } from "react";

const HomeProfile = () => {
  return (
    <HomeProfileStyled>
      <div className="HomeProfile_wrap">
        <div className="HomeProfile_todayis Gulim">
          <span className="pixelFont">TODAY IS...</span> 🌧️ 슬픔
        </div>
        <div className="HomeProfile_imgWrap">
          <img src="/sad.jpg" alt="Profile img" />
        </div>
        <div className="HomeProfile_textarea Gulim">
          난... ㄱ ㅏ끔... 눈물을 흘린 ㄷ r ....
          <br /> ㄱ r끔은 눈물을 참을 수 없는 내가 별루ㄷ ㅏ...
        </div>
        <span className="HomeProfile_history">
          <span>▶</span> HISTORY
        </span>
      </div>
    </HomeProfileStyled>
  );
};
export default HomeProfile;
