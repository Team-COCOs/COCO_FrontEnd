import { CommentDiaryStyle } from "./styled";
import DiaryComments from "./DiaryComments";

const CommentDiary = () => {
  return (
    <CommentDiaryStyle>
      <div className="CommentDiary_wrap Gulim">
        <div>
          <DiaryComments />
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
          />
          <button className="CommentDiary_commentBtn">확인</button>
        </div>
      </div>
    </CommentDiaryStyle>
  );
};

export default CommentDiary;
