import { useRouter } from "next/router";
import { GuestCommentStyle } from "./styled";
import { formatKoreanDate } from "@/utils/KrDate/date";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import ShadowModal from "@/components/ShadowModal";

interface commentVisit {
  id: number; // PK
  content: string; // 댓글
  authorId: number; // 댓글 작성자 아이디
  authorName: string; // 댓글 작성자 이름
  created_at: string;
}

interface GuestCommentProps {
  comment: commentVisit[];
  onRefresh: () => void;
  postId: number;
}

const GuestComment = ({ comment, onRefresh, postId }: GuestCommentProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const [commentInput, setCommentInput] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [photoId, setPhotoId] = useState<number | null>(null);

  const confirm = (id: number) => {
    setPhotoId(id);
    setIsOpen(true);
    setMessage("정말 댓글 삭제하시겠습니까?");
    setType("confirm");
  };

  const handleDeleteComment = () => {
    try {
      axiosInstance.delete(`/guestbooks-comments/${photoId}`);

      setIsOpen(true);
      setMessage("댓글이 삭제되었습니다.");
      setType("success");
    } catch (e: any) {
      if (e.response.status === 401) {
        setIsOpen(true);
        setMessage("로그인이 필요합니다.");
        setType("error");
      } else {
        setIsOpen(true);
        setMessage("댓글 삭제 중 오류가 발생했습니다.");
        setType("error");
        console.log(e, ": 댓글 삭제 중 오류");
      }
    }
  };

  const submitComment = async ({
    comment,
    postId,
  }: {
    comment: string;
    postId: number;
  }) => {
    if (!comment.trim()) {
      setIsOpen(true);
      setMessage("댓글을 작성해주세요~");
      setType("error");
      return;
    }

    if (!user?.id) {
      setIsOpen(true);
      setMessage("로그인 후 작성해주세요~");
      setType("error");
      setCommentInput("");
      return;
    }

    // parentId 는 null일 수 있음. (대댓글이 아닌 경우)
    try {
      const res = await axiosInstance.post(`/guestbooks-comments/${postId}`, {
        content: comment,
        authorId: user?.id,
      });

      setCommentInput("");
      onRefresh();
    } catch (e) {
      console.log("댓글 등록 실패 : ", e);
    }
  };

  return (
    <GuestCommentStyle className="GuestComment_wrap">
      {comment?.length === 0 || !comment ? (
        <p className="handFont">
          아직 댓글이 없어요~ 당신의 한 마디로 이 공간을 채워주세요 💬
        </p>
      ) : (
        comment.map((c) => (
          <>
            <div key={c.id} className="GuestComment_parent">
              <div className="GuestComment_infos">
                <span
                  className="GuestComment_Author"
                  onClick={() => router.push(`/home/${c.authorId}`)}
                >
                  {c.authorName}
                </span>
                <span className="GuestComment_comment">: {c.content}</span>
                <span className="GuestComment_date">
                  {formatKoreanDate(c.created_at)}
                </span>

                {(Number(user?.id) === Number(id) ||
                  Number(user?.id) === Number(c.authorId)) && (
                  <span
                    className="GuestComment_deleteBtn"
                    onClick={() => confirm(c.id)}
                  >
                    ☒
                  </span>
                )}
              </div>
            </div>
          </>
        ))
      )}

      <div className="GuestComment_input">
        <p>댓글</p>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          onClick={() => submitComment({ comment: commentInput, postId })}
        >
          확인
        </button>
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);

          if (message === "댓글이 삭제되었습니다.") {
            window.location.reload();
          } else if (message === "로그인이 필요합니다.") {
            window.location.reload();
          }
        }}
        message={message}
        onConfirm={handleDeleteComment}
      />
    </GuestCommentStyle>
  );
};

export default GuestComment;
