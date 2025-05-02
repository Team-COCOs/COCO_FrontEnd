import { FriendCommentStyled } from "./styled";
import { useEffect, useState } from "react";

const FriendComment = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    console.log("제출:", comment);
    setComment("");
  };

  return (
    <FriendCommentStyled>
      <div className="FriendComment_wrap">
        <div className="FriendComment_title Gulim">
          What friends say
          <span className="FriendComment_son pixelFont">
            한마디로 표현해봐~
          </span>
        </div>
        <div className="FriendComment_commentWrap">
          <div className="FriendComment_inputWrap">
            <span className="pixelFont">friends say</span>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="일촌과 나누고 싶은 이야기를 남겨보세요~!"
            />
            <button disabled={!comment.trim()} onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      </div>
    </FriendCommentStyled>
  );
};
export default FriendComment;
