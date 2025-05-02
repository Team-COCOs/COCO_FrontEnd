import { HomeFriendsStyled } from "./styled";
import { useEffect } from "react";

const HomeFriends = () => {
  return (
    <HomeFriendsStyled>
      <div className="HomeFriends_wrap">
        <div className="HomeFriends_namebox Gulim">
          <div className="HomeFriends_name">김영희</div>
          <div className="HomeFriends_gender">(&#9792;)</div>
          <div className="HomeFriends_gender">(&#9794;)</div>
        </div>
        <div className="HomeFriends_email">cocoworld@cocoworld.com</div>
        <select>
          <option>파도타기</option>
          {/* 다른 사람 홈피일 때만 보이게 하기 */}
          <option>내 홈피 가기</option>
          <option>김철수(친한 사이)</option>
        </select>
      </div>
    </HomeFriendsStyled>
  );
};
export default HomeFriends;
