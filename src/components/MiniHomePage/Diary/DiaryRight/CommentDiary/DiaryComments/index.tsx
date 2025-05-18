import { DiaryCommentsStyle } from "./styled";

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
