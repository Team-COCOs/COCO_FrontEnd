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
  useEffect(() => {
    if (!id) return;
    const updatedPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/photo/${id}`
        );
        setPhotoTitles(response.data.titles);
      } catch (e: any) {
        if (e.response.status === 401) {
        } else {
          console.log("Updated photos 업데이트 실패");
        }
      }
    };
    updatedPhotos();
  }, [id]);

  // 새로운 게시글 개수
  useEffect(() => {
    if (!id) return;
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
          visitor: {
            count: data.guestBookCount,
            total: data.guestBookTotalCount,
          },
          coco: {
            count: data.cocoCount,
            total: data.cocoTotalCount,
          },
        };

        setNewBoards(counts);
        console.log(response.data, "response.data : 홈, 전체 카운트");
        console.log(counts, "counts : 홈, 카운트 분리 데이터");
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
          {photoTitles.length > 0 ? (
            <div className="RecentPhoto_new_photo Gulim">
              <div className="RecentPhoto_new_phototitle">
                <span>사진첩</span> {photoTitles[0]}
              </div>
              <div className="RecentPhoto_new_phototitle">
                {photoTitles && (
                  <>
                    <span>사진첩</span> {photoTitles[1]}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="RecentPhoto_new_emptyphoto Dotum">
              <span>
                등록된 게시물이 없습니다.
                <br />
                소식이 뜸한 친구에게
                <br /> 마음의 한마디를 남겨보세요.
              </span>
            </div>
          )}
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
