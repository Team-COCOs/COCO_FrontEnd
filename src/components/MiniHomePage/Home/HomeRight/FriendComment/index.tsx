import { FriendCommentStyled } from "./styled";
import { useEffect } from "react";

const FriendComment = () => {
  return (
    <FriendCommentStyled>
      <div className="FriendComment_wrap">
        <div className="FriendComment_number_title">일촌평</div>
      </div>
    </FriendCommentStyled>
  );
};
export default FriendComment;
