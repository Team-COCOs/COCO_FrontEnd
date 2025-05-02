import { HomeTodayTitleStyled } from "./styled";
import { useEffect } from "react";

const HomeTodayTitle = () => {
  return (
    <HomeTodayTitleStyled>
      <div>
        <div className="HomeTodayTitle_wrap">
          <div className="HomeTodayTitle_number_title dotumFont">
            TODAY &nbsp;<span>0</span> &nbsp;&nbsp;|&nbsp;&nbsp;TOTAL &nbsp;0
          </div>
        </div>
      </div>
    </HomeTodayTitleStyled>
  );
};
export default HomeTodayTitle;
