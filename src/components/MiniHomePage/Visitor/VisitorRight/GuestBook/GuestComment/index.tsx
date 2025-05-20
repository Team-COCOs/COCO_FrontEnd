import { useRouter } from "next/router";
import { GuestCommentStyle } from "./styled";
import { formatKoreanDate } from "@/utils/KrDate/date";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

interface commentVisit {
  id: number; // PK
  comment: string; // 댓글
  userId: number; // 댓글 작성자 아이디
  userName: string; // 댓글 작성자 이름
  created_at: string;
}

interface GuestCommentProps {
  comment: commentVisit[];
}

const GuestComment = ({ comment }: GuestCommentProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const [commentInput, setCommentInput] = useState("");

  const handleDeleteComment = (photoId: number) => {
    try {
      axiosInstance.delete(`/guestbooks/${photoId}`);
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

  const submitComment = ({ comment }: { comment: string }) => {};

  return (
    <GuestCommentStyle className="GuestComment_wrap">
      {comment?.length === 0 || !comment ? (
        <p className="handFont">
          아직 댓글이 없어요~ 당신의 한 마디로 이 공간을 채워주세요 💬
        </p>
      ) : (
        comment.map((c) => (
          <div className="GuestComment_parent">
            <div className="GuestComment_infos" key={c.id}>
              <span
                className="GuestComment_Author"
                onClick={() => router.push(`/home/${c.userId}`)}
              >
                {c.userName}
              </span>
              <span className="GuestComment_comment">: {c.comment}</span>
              <span className="GuestComment_date">
                {formatKoreanDate(c.created_at)}
              </span>

              {(Number(user?.id) === Number(id) ||
                Number(user?.id) === Number(c.userId)) && (
                <span
                  className="GuestComment_deleteBtn"
                  onClick={() => handleDeleteComment(c.id)}
                >
                  ☒
                </span>
              )}
            </div>
          </div>
        ))
      )}

      <div className="GuestComment_input">
        <p>댓글</p>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button onClick={() => submitComment({ comment: commentInput })}>
          확인
        </button>
      </div>
    </GuestCommentStyle>
  );
};

export default GuestComment;
