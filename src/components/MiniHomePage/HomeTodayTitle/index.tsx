import { HomeTodayTitleStyled } from "./styled";
import { useEffect } from "react";

const HomeTodayTitle = () => {
  return (
    <HomeTodayTitleStyled>
      <div>
        <div className="HomeTodayTitle_wrap">
          <div className="HomeTodayTitle_number_title pixelFont">
            TODAY <span>0</span> | TOTAL 0
          </div>
        </div>
      </div>
    </HomeTodayTitleStyled>
  );
};
export default HomeTodayTitle;
