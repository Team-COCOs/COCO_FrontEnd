import { HomeLeftStyled } from "./styled";
import { useEffect } from "react";
import HomeFriends from "./HomeFriends";
import HomeProfile from "../../Home/HomeLeft/HomeProfile";
import { useRouter } from "next/router";

const HomeLeft = () => {
  return (
    <HomeLeftStyled>
      <div className="HomeLeft_wrap">
        <div className="HomeLeft_componentWrap">
          <div className="HomeLeft_HomeProfile">
            <HomeProfile />
          </div>

          <div className="HomeLeft_HomeFriends">
            <HomeFriends />
          </div>
        </div>
      </div>
    </HomeLeftStyled>
  );
};
export default HomeLeft;
