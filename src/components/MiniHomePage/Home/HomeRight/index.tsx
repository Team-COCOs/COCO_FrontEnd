import { HomeRightStyled } from "./styled";
import { useEffect } from "react";
import FriendComment from "./FriendComment";
import HomeMiniroom from "./HomeMiniroom";
import RecentPhoto from "./RecentPhoto";

const HomeRight = () => {
  return (
    <HomeRightStyled>
      <div className="HomeRight_wrap">
        <div className="HomeRight_component_wrap">
          {/* 최근 게시물 컴포넌트 */}
          <div className="HomeRight_RecentPhoto_component">
            <RecentPhoto />
          </div>
          <div className="HomeRight_HomeMiniroom_component">
            {/* 미니룸 컴포넌트 */}
            <HomeMiniroom />
          </div>
          <div className="HomeRight_FriendComment_component">
            {/* 일촌평 컴포넌트 */}
            <FriendComment />
          </div>
        </div>
      </div>
    </HomeRightStyled>
  );
};
export default HomeRight;
