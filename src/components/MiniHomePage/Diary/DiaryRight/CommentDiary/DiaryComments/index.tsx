import { DiaryCommentsStyle } from "./styled";
import { useState } from "react";

const DiaryComments = () => {
  const [replying, setReplying] = useState(false);

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleSubmitReply = () => {
    // if (!replyText.trim()) {
    //   alert("답글을 입력하세요");
    //   return;
    // }
    // alert(`답글 등록: ${replyText}`);
    // setReplyText("");
    setReplying(false);
  };
  return (
    <DiaryCommentsStyle>
      <div className="DiaryComments_wrap Gulim">
        <div className="DiaryComments_mapwrap Gulim">
          <div className="DiaryComments_parentComment">
            <span className="DiaryComments_author">김하나 : </span>
            <span className="DiaryComments_content">내용</span>
            <span className="DiaryComments_date">(2025.01.01)</span>
            <img
              src="/arrowIcon.png"
              alt="arrow-icon"
              className="DiaryComments_arrowicon"
            />
            <span className="DiaryComments_comment_deletebtn">☒</span>
          </div>

          <div className="DiaryComments_childrenComment">
            <div className="DiaryComments_inputWrap">
              <label
                className="DiaryComments_commentLabel"
                htmlFor="DiaryComments_comment-input"
              >
                답글
              </label>
              <input
                className="DiaryComments_commentInput"
                id="DiaryComments_comment-input"
                type="text"
              ></input>
              <button className="DiaryComments_commentBtn">확인</button>
            </div>
            <span className="DiaryComments_childarrow">⤷ </span>
            <span className="DiaryComments_author">김하나 : </span>
            <span className="DiaryComments_content">내용</span>
            <span className="DiaryComments_date">(2025.01.01)</span>
            <span className="DiaryComments_comment_deletebtn">☒</span>
          </div>
        </div>
      </div>
    </DiaryCommentsStyle>
  );
};

export default DiaryComments;
