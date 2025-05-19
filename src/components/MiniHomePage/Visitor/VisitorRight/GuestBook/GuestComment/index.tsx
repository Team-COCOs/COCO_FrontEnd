import { GuestCommentStyle } from "./styled";

interface commentVisit {
  id: number; // PK
  comment: string; // 댓글
  userId: number; // 댓글 작성자 아이디
  userName: string; // 댓글 작성자 이름
}

interface GuestCommentProps {
  comment: commentVisit[]; // comment 배열을 props로 받는다
}

const GuestComment = ({ comment }: GuestCommentProps) => {
  return (
    <GuestCommentStyle className="GuestComment_wrap">
      {/* 예시 출력 */}
      {comment.map((c) => (
        <div key={c.id}>
          <p>
            <strong>{c.userName}</strong>: {c.comment}
          </p>
        </div>
      ))}
    </GuestCommentStyle>
  );
};

export default GuestComment;
