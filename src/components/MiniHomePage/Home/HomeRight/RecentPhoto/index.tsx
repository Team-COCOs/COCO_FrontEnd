import { RecentPhotoStyled } from "./styled";
import { useEffect } from "react";
import { TAB_LABELS, TabKey } from "../../../../../constants/tabs";

const RecentPhoto = () => {
  const tabKeys = (Object.keys(TAB_LABELS) as TabKey[]).filter(
    (key) => key !== "Home" && key !== "Profile" && key !== "Setting"
  );

  return (
    <RecentPhotoStyled>
      <div className="RecentPhoto_wrap">
        <div className="RecentPhoto_title Gulim">최근 사진첩</div>
        <div className="RecentPhoto_new">
          <div className="RecentPhoto_new_photo"></div>
          <div className="RecentPhoto_new_alltab Gulim">
            {tabKeys.map((key) => (
              <div className="RecentPhoto_new_tabs">
                <div key={key} className="tab">
                  {TAB_LABELS[key]}
                </div>
                <span>0/10</span>
                <span>N</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RecentPhotoStyled>
  );
};
export default RecentPhoto;
