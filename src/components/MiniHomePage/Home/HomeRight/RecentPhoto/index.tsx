import { RecentPhotoStyled } from "./styled";
import { useEffect } from "react";

const RecentPhoto = () => {
  return (
    <RecentPhotoStyled>
      <div className="RecentPhoto_wrap">
        <div className="RecentPhoto_number_title">최근 게시물</div>
      </div>
    </RecentPhotoStyled>
  );
};
export default RecentPhoto;
