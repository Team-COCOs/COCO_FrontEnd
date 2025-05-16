import { PhotoRightStyled } from "./styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EmptyPage from "@/components/EmptyPage";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Comment from "./Comment";
import DOMPurify from "dompurify";
import { formatKoreanDate } from "@/utils/KrDate/date";
import axios from "axios";
interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
  setWrite: Dispatch<SetStateAction<boolean>>;
}

interface AuthorData {
  id: number;
  name: string;
}

interface parentData {
  id: number;
}

interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  user: AuthorData; // 댓글 작성자
  created_at: string; // 날짜
  parentComment: parentData | null; // 대댓글
}

interface FolderData {
  id: number;
  title: string;
}

interface PhotoData {
  id: number; // PK
  title: string; // 제목
  photo_url: string; // 이미지
  content: string; // 내용
  writer: string; // 작성자
  writerId: number; // 작성자 아이디(FK)
  use_count: number; // 스크랩 수
  created_at: string; // 날짜
  visibility: string; // 전체 공개 / 일촌 공개 / 비공개
  isScripted: boolean; // 스크랩한 글인지 아닌지
  folder: FolderData; // 폴더
  view_count: number; // 조회수
  comments: CommentData[]; // 댓글
}

const PhotoRight = ({ selectedMenu, setWrite }: PhotoProps) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [queryId, setQueryId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPhotos = photoData
    ? photoData.slice(indexOfFirst, indexOfLast)
    : [];
  const totalPages = photoData ? Math.ceil(photoData.length / itemsPerPage) : 0;

  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const queryUserId = router.query.id;

  const getPhotoData = async () => {
    try {
      const res = await axiosInstance.get(`/photos/${queryUserId}`);

      console.log("사진첩 : ", res.data);

      const filtered =
        selectedMenu &&
        res.data.filter(
          (item: PhotoData) => item.folder.id === selectedMenu.id
        );

      setPhotoData(filtered);
    } catch (e: any) {
      if (e.response?.status === 401) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/photos/logout/${queryUserId}`
        );

        const filtered =
          selectedMenu &&
          res.data.filter(
            (item: PhotoData) => item.folder.id === selectedMenu.id
          );

        setPhotoData(filtered);
      } else {
        console.log("사진첩 불러오기 에러 : ", e);
      }
    }
  };

  const clipPhoto = async (photoId: number) => {
    try {
      const res = await axiosInstance.post(`/photos/${photoId}/clip`);

      console.log("스크랩 정보 : ", res.data);
      alert("스크랩 완료!");
      getPhotoData?.();
    } catch (e) {
      console.log("스크랩 실패: ", e);
    }
  };

  useEffect(() => {
    queryUserId && getPhotoData();
  }, [selectedMenu, queryUserId]);

  useEffect(() => {
    if (!queryUserId || !user) return;

    if (String(user?.id) === queryUserId) {
      setQueryId(true);
    }
  }, [queryUserId, user]);

  return (
    <PhotoRightStyled>
      <div className="PhotoRight_wrap">
        <div className="PhotoRight_header">
          {queryId && (
            <button
              className="PhotoRight_btn Gulim"
              onClick={() => setWrite(true)}
            >
              글 작성하기
            </button>
          )}
        </div>
        <div className="PhotoRight_content">
          {!photoData || photoData.length == 0 ? (
            <EmptyPage />
          ) : (
            currentPhotos.map((data) => (
              <div key={data.id}>
                <div className="PhotoRight_title Gulim">
                  {data.isScripted && <span>[스크랩]</span>}
                  {data.title}
                </div>

                <div className="PhotoRight_infos Gulim">
                  <p
                    className="PhotoRight_user"
                    onClick={() => router.push(`/home/${data.writerId}}`)}
                  >
                    {data.writer}
                  </p>
                  <div className="PhotoRight_info">
                    <p className="PhotoRight_font">
                      {formatKoreanDate(data.created_at)}
                    </p>
                    <p>스크랩 {data.use_count}</p>
                  </div>
                </div>

                <div className="PhotoRight_imgBox">
                  <div className="PhotoRight_img">
                    <img
                      src={`http://localhost:5001${data.photo_url}`}
                      alt="photo"
                    />
                  </div>
                </div>

                <div
                  className="PhotoRight_text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.content),
                  }}
                />

                <div className="PhotoRight_isPublic Gulim">
                  <div>
                    공개설정 <span className="PhotoRight_line">|</span>
                    {data.visibility === "public"
                      ? "모두공개"
                      : data.visibility === "private"
                      ? "비공개"
                      : "일촌공개"}
                  </div>
                  <div className="PhotoRight_clips">
                    <div>
                      조회수
                      {data.view_count ? data.view_count.toLocaleString() : 0}
                    </div>
                    {user?.id !== queryUserId && (
                      <button
                        className="PhotoRight_clipBtn Gulim"
                        onClick={() => clipPhoto(data.id)}
                      >
                        스크랩
                      </button>
                    )}
                  </div>
                </div>

                <Comment
                  comments={data.comments}
                  onSubmitSuccess={getPhotoData}
                  postId={data.id}
                />
              </div>
            ))
          )}
        </div>

        {photoData && photoData.length > 0 && (
          <div className="PhotoRight_footer">
            <div className="PhotoRight_pageNation">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "active" : ""}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </PhotoRightStyled>
  );
};
export default PhotoRight;
