import { DiaryTitleStyled } from "./styled";
import { useEffect } from "react";

const DiaryTitle = () => {
  return (
    <DiaryTitleStyled>
      <div>
        <div className="DiaryTitle_wrap">
          <div className="DiaryTitle_number_title">코코월드님의 미니홈피</div>
        </div>
      </div>
    </DiaryTitleStyled>
  );
};
export default DiaryTitle;
