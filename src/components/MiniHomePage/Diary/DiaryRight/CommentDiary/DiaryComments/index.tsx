import { DiaryCommentsStyle } from "./styled";

const DiaryComments = () => {
  return (
    <DiaryCommentsStyle>
      <div className="DiaryComments_wrap Gulim">
        <div className="DiaryComments_mapwrap Gulim">
          <span className="DiaryComments_author">김하나 : </span>
          <span className="DiaryComments_content">내용</span>
          <span className="DiaryComments_date">(2025.01.01)</span>
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
