import axios from "axios";
import { CommentStyle } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  author: string; // 댓글 작성자
  authorId: number; // 댓글 작성자 id
  date: string; // 날짜
  children: CommentData[]; // 대댓글
}

interface CommentProps {
  comments?: CommentData[];
  onSubmitSuccess?: () => void;
}

interface CommentSubmit {
  comment: string;
  parentId?: number | null;
}

const Comment = ({ comments, onSubmitSuccess }: CommentProps) => {
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [childCommentInput, setChildCommentInput] = useState("");
  const [childComment, setChildComment] = useState(false); // 데이터 가져올 때 지워도 됨
  const router = useRouter();
  const { user } = useAuth();

  const submitComment = async ({ comment, parentId }: CommentSubmit) => {
    if (!comment.trim()) return;

    console.log("대댓글일 때 부모 아이디 : ", parentId);

    // parentId 는 null일 수 있음. (대댓글이 아닌 경우)
    try {
      const res = await axios.post("/photos/comments", {
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
      <p className="handFont">
        아직 댓글이 없어요~ 당신의 한 마디로 이 공간을 채워주세요 💬
      </p>
      <div className="Comment_parent">
        <div className="Comment_infos">
          <span
            className="Comment_Author"
            // onClick={() => router.push(`/home/${authorId}`)}
          >
            어쩌구
          </span>
          <span className="Comment_comment">: 하이하이~</span>
          <span className="Comment_date">(2005.11.11 04:01)</span>
          <div className="Comment_icon" onClick={() => setChildComment(true)}>
            <Image src="/arrowIcon.png" alt="icon" fill />
          </div>
        </div>

        {childComment && (
          <div className="Comment_childInput">
            <div
              className="Comment_closeIcon"
              onClick={() => setChildComment(false)}
            >
              ×
            </div>
            <p>댓글</p>
            <input type="text" />
            <button>확인</button>
          </div>
        )}
      </div>

      <div className="Comment_child">
        <span
          className="Comment_Author"
          // onClick={() => router.push(`/home/${authorId}`)}
        >
          저쩌구
        </span>
        <span className="Comment_comment">: 방가방가~</span>
        <span className="Comment_date">(2005.11.11 04:01)</span>
      </div>

      {comments?.length === 0 ? (
        <p>첫번째 댓글의 주인공이 되어주세요~</p>
      ) : (
        comments?.map((comment) => (
          <div key={comment.id} className="Comment_parent">
            <div className="Comment_infos">
              <span
                className="Comment_Author"
                onClick={() => router.push(`/home/${comment.authorId}`)}
              >
                {comment.author}
              </span>
              <span className="Comment_comment">: {comment.comment}</span>
              <span className="Comment_date">({comment.date})</span>
              <div
                className="Comment_icon"
                onClick={() => setReplyTargetId(comment.id)}
              >
                <Image src="/arrowIcon.png" alt="icon" fill />
              </div>
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
                  확인
                </button>
              </div>
            )}

            {comment.children.map((child) => (
              <div key={child.id} className="Comment_child">
                <span
                  className="Comment_Author"
                  onClick={() => router.push(`/home/${child.authorId}`)}
                >
                  {child.author}
                </span>
                <span className="Comment_comment">: {child.comment}</span>
                <span className="Comment_date">({child.date})</span>
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
