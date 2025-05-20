import { RecentPhotoStyled } from "./styled";
import { useEffect } from "react";
import { TAB_LABELS, TabKey } from "../../../../../constants/tabs";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

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
  const [photoTitles, setPhotoTitles] = useState("");
  const [newBoards, setNewBoards] = useState<{
    [key: string]: { count: number; total: number };
  }>({});

  // 최근 올린 사진첩 제목 2개
  // get minihomepis/photo/:userId
  useEffect(() => {
    const updatedPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/photo/${id}`
        );
        setPhotoTitles(response.data.titles);
        console.log(response.data.titles, "PhotoTitles");
      } catch (e: any) {
        if (e.response.status === 401) {
        } else {
          console.log("Updated photos 업데이트 실패");
        }
      }
    };
    updatedPhotos();
  }, [id]);

  // 개수
  // get minihomepis/postCount/:userId

  // cocoCount
  // cocoTotalCount
  // diaryCount
  // diaryTotalCount
  // guestBookCount
  // guestBookTotalCount
  // photoCount
  // photoTotalCount

  useEffect(() => {
    const updatedNewBoards = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/postCount/${id}`
        );

        const data = response.data;

        const counts = {
          photo: {
            count: data.photoCount,
            total: data.photoTotalCount,
          },
          diary: {
            count: data.diaryCount,
            total: data.diaryTotalCount,
          },
          guestBook: {
            count: data.guestBookCount,
            total: data.guestBookTotalCount,
          },
          coco: {
            count: data.cocoCount,
            total: data.cocoTotalCount,
          },
        };

        setNewBoards(counts);

        console.log(counts, "NewBoards");
      } catch (e: any) {
        if (e.response.status === 401) {
        } else {
          console.log("Updated photos 업데이트 실패");
        }
      }
    };
    updatedNewBoards();
  }, [id]);

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
                <span>
                  {newBoards[key]?.count ?? 0}/{newBoards[key]?.total ?? 0}
                </span>
                {newBoards[key]?.count > 0 && (
                  <span className="RecentPhoto_new_alert">N</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </RecentPhotoStyled>
  );
};
export default RecentPhoto;
