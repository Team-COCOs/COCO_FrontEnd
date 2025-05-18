import { DiaryCommentsStyle } from "./styled";

// 댓글과 대댓글 구분
interface Comment {
  id: number;
  conment: string;
  name: string; // 작성자
  parentId: number | null; // null이면 댓글, 숫자면 대댓글
  createdAt: string;
}

const DiaryComments = () => {
  return (
    <DiaryCommentsStyle>
      <div className="DiaryComments_wrap Gulim">
        <div className="DiaryComments_mapwrap">
          댓글?
          <img
            src="/arrowIcon.png"
            alt="arrow-icon"
            className="DiaryComments_arrowicon"
          />
        </div>
      </div>
    </DiaryCommentsStyle>
  );
};

export default DiaryComments;
