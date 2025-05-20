import axios from "axios";
import { CommentStyle } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { formatKoreanDate } from "@/utils/KrDate/date";
import { handleDeleteComment } from "@/utils/Comment/management";

interface AuthorData {
  id: number;
  name: string;
}
interface parentData {
  id: number;
}
interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  user: AuthorData; // 댓글 작성자
  created_at: string; // 날짜
  parentComment: parentData | null; // 대댓글
}
interface CommentProps {
  comments?: CommentData[];
  onSubmitSuccess?: () => void;
  postId: number;
}
interface CommentSubmit {
  comment: string;
  parentId?: number | null;
}

const Comment = ({ comments, onSubmitSuccess, postId }: CommentProps) => {
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [childCommentInput, setChildCommentInput] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const submitComment = async ({ comment, parentId }: CommentSubmit) => {
    if (!comment.trim()) {
      alert("댓글을 작성해주세요~");
      return;
    }

    if (!user?.id) {
      alert("로그인 후 작성해주세요~");
      return;
    }

    console.log("대댓글일 때 부모 아이디 : ", parentId);

    // parentId 는 null일 수 있음. (대댓글이 아닌 경우)
    try {
      const res = await axiosInstance.post(`/photos-comments/${postId}`, {
        comment,
        parentId,
        authorId: user?.id,
      });

      if (parentId) {
        setChildCommentInput("");
        setReplyTargetId(null);
      } else {
        setCommentInput("");
      }

      // 옵셔널 체이닝 : 정의된 함수일 시 실행
      onSubmitSuccess?.();
      console.log("댓글 등록 : ", res.data);
    } catch (e) {
      console.log("댓글 등록 실패 : ", e);
    }
  };

  return (
    <CommentStyle className="Comment_wrap Gulim">
      {comments?.length === 0 || !comments ? (
        <p className="handFont">
          아직 댓글이 없어요~ 당신의 한 마디로 이 공간을 채워주세요 💬
        </p>
      ) : (
        comments
          ?.filter((comment) => !comment.parentComment)
          .map((comment) => (
            <div key={comment.id} className="Comment_parent">
              <div className="Comment_infos">
                <span
                  className="Comment_Author"
                  onClick={() => router.push(`/home/${comment.user.id}`)}
                >
                  {comment.user.name}
                </span>
                <span className="Comment_comment">: {comment.comment}</span>
                <span className="Comment_date">
                  {formatKoreanDate(comment.created_at)}
                </span>
                <div
                  className="Comment_icon"
                  onClick={() => setReplyTargetId(comment.id)}
                >
                  <Image src="/arrowIcon.png" alt="icon" fill />
                </div>
                {(Number(user?.id) === Number(id) ||
                  Number(user?.id) === Number(comment.user.id)) && (
                  <span
                    className="Comment_deleteBtn"
                    onClick={() =>
                      handleDeleteComment("photos-comments", comment.id)
                    }
                  >
                    ☒
                  </span>
                )}
              </div>

              {replyTargetId === comment.id && (
                <div className="Comment_childInput">
                  <div
                    className="Comment_closeIcon"
                    onClick={() => setReplyTargetId(null)}
                  >
                    ×
                  </div>
                  <p>댓글</p>
                  <input
                    type="text"
                    value={childCommentInput}
                    onChange={(e) => setChildCommentInput(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      submitComment({
                        comment: childCommentInput,
                        parentId: replyTargetId,
                      })
                    }
                  >
                    답글
                  </button>
                </div>
              )}

              {comments
                .filter(
                  (child) =>
                    child.parentComment && child.parentComment.id === comment.id
                )
                .map((child) => (
                  <div key={child.id} className="Comment_child">
                    <span className="Comment_childarrow">⤷ </span>
                    <span
                      className="Comment_Author"
                      onClick={() => router.push(`/home/${child.user.id}`)}
                    >
                      {child.user.name}
                    </span>
                    <span className="Comment_comment">: {child.comment}</span>
                    <span className="Comment_date">
                      ({formatKoreanDate(child.created_at)})
                    </span>

                    {(Number(user?.id) === Number(id) ||
                      Number(user?.id) === Number(child.user.id)) && (
                      <span
                        className="Comment_deleteBtn"
                        onClick={() =>
                          handleDeleteComment("photos-comments", child.id)
                        }
                      >
                        ☒
                      </span>
                    )}
                  </div>
                ))}
            </div>
          ))
      )}

      <div className="Comment_input">
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
    </CommentStyle>
  );
};

export default Comment;
