import { CommentStyle } from "./styled";
import Image from "next/image";

interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  author: string; // 댓글 작성자
  date: string; // 날짜
  children: CommentData[]; // 대댓글
}

interface CommentProps {
  comments: CommentData[];
}

const Comment = ({ comments }: CommentProps) => {
  return (
    <CommentStyle className="Comment_wrap Gulim">
      <div className="Comment_parent">
        <span className="Comment_Author">어쩌구</span>
        <span className="Comment_comment">: 하이하이~</span>
        <span className="Comment_date">(2005.11.11 04:01)</span>
        <div className="Comment_icon">
          <Image src="/arrowIcon.png" alt="icon" fill />
        </div>
      </div>

      <div className="Comment_child">
        <span className="Comment_Author">저쩌구</span>
        <span className="Comment_comment">: 방가방가~</span>
        <span className="Comment_date">(2005.11.11 04:01)</span>
      </div>

      <div className="Comment_input">
        <p>댓글</p>
        <input type="text" />
        <button>확인</button>
      </div>
    </CommentStyle>
  );
};

export default Comment;
