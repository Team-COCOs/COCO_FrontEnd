import axiosInstance from "@/lib/axios";
import { DiaryCommentsStyle } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface CommentDiaryprops {
  diaryId: number;
}

const DiaryComments = ({ diaryId }: CommentDiaryprops) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

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

  const handleDeleteComment = () => {
    try {
      const response = axiosInstance.delete(`/diaryComments/${diaryId}`);
      alert("댓글이 삭제되었습니다.");
      window.location.reload();
    } catch (e: any) {
      if (e.response.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert("댓글 삭제 중 오류가 발생했습니다.");
        console.log(e, ": 댓글 삭제 중 오류");
      }
    }
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
            {Number(user?.id) === Number(id) && (
              <span className="DiaryComments_comment_deletebtn">☒</span>
            )}
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
            {Number(user?.id) === Number(id) && (
              <span className="DiaryComments_comment_deletebtn">☒</span>
            )}
          </div>
        </div>
      </div>
    </DiaryCommentsStyle>
  );
};

export default DiaryComments;
