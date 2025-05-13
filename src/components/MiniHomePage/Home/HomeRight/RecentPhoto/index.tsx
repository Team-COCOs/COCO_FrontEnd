import { RecentPhotoStyled } from "./styled";
import { useEffect } from "react";
import { TAB_LABELS, TabKey } from "../../../../../constants/tabs";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/router";

interface HomeTabProps {
  activeTab: string;
}

const RecentPhoto: React.FC<HomeTabProps> = ({ activeTab }) => {
  const isMobile = useIsMobile();
  const tabKeys = Object.keys(TAB_LABELS) as TabKey[];
  const filteredTabKeys = tabKeys.filter(
    (key) => key !== "home" && key !== "profile" && key !== "setting"
  );
  const router = useRouter();
  const { id } = router.query;

  return (
    <RecentPhotoStyled>
      <div className="RecentPhoto_wrap">
        <div className="RecentPhoto_title Gulim">Updated Photo</div>
        <div className="RecentPhoto_new">
          <div className="RecentPhoto_new_photo">
            {/* <div>· 오늘의 사진</div> */}
          </div>
          <div className="RecentPhoto_new_alltab Gulim">
            {filteredTabKeys.map((key) => (
              <div
                key={key}
                className="RecentPhoto_new_tabs"
                onClick={() => router.push(`/${key}/${id}`)}
              >
                <div className="tab">{TAB_LABELS[key]}</div>
                <span>0/10</span>
                <span className="RecentPhoto_new_alert">N</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RecentPhotoStyled>
  );
};
export default RecentPhoto;
