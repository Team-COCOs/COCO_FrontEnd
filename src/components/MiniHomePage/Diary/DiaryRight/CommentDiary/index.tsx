import { CommentDiaryStyle } from "./styled";
import DiaryComments from "./DiaryComments";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface CommentDiaryprops {
  diaryId: number;
}

const CommentDiary = ({ diaryId }: CommentDiaryprops) => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");

  const handleCommentSave = async () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/diaryComments/${diaryId}`, {
        content: comment,
        parentCommentId: null,
      });
      alert("댓글이 등록되었습니다.");
      setComment(""); // 입력창 초기화
      router.replace(router.asPath);
      // router.push(`/diary/${id}`);
    } catch (e: any) {
      if (e.response?.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert("댓글 등록 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <CommentDiaryStyle>
      <div className="CommentDiary_wrap Gulim">
        <div>
          <DiaryComments diaryId={diaryId} />
        </div>
        <div className="CommentDiary_inputWrap Gulim">
          <label
            className="CommentDiary_commentLabel"
            htmlFor="CommentDiary_comment-input"
          >
            댓글
          </label>
          <input
            className="CommentDiary_commentInput"
            id="CommentDiary_comment-input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="CommentDiary_commentBtn"
            onClick={handleCommentSave}
          >
            확인
          </button>
        </div>
      </div>
    </CommentDiaryStyle>
  );
};

export default CommentDiary;
