import { PhotoRightStyled } from "./styled";
import { useEffect, useState } from "react";
import EmptyPage from "@/components/EmptyPage";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Comment from "./Comment";
import createDOMPurify from "dompurify";
import { formatKoreanDate } from "@/utils/KrDate/date";
import axios from "axios";
import { PhotoData, PhotoProps } from "@/utils/Write/interface";
import Skeleton from "@mui/material/Skeleton";
import ShadowModal from "@/components/ShadowModal";

const PhotoRight = ({ selectedMenu, setWrite, setEditData }: PhotoProps) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [photoId, setPhotoId] = useState<number | null>(null);

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
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const queryUserId = router.query.id;

  // 사진첩 데이터 가져오기
  const getPhotoData = async () => {
    try {
      let res;

      if (!userId) {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/photos/logout/${queryUserId}`
        );
      } else {
        res = await axiosInstance.get(`/photos/${queryUserId}`);
      }

      console.log("사진첩 : ", res.data);

      res.data.filter((i: PhotoData) =>
        console.log("폴더 아이디:", i.folder.id)
      );

      console.log(selectedMenu);

      const filtered =
        selectedMenu &&
        res.data.filter(
          (item: PhotoData) => item.folder.id === selectedMenu.id
        );

      setPhotoData(filtered);
    } catch (e: any) {
      console.log("사진첩 불러오기 에러 : ", e);
    }
  };

  // 스크랩
  const clipPhoto = async (photoId: number) => {
    try {
      const res = await axiosInstance.patch(`/photos/${photoId}/clip`);

      console.log("스크랩 정보 : ", res.data);

      setType("success");
      setIsOpen(true);
      setMessage("스크랩 완료!");
      getPhotoData?.();
    } catch (e) {
      console.log("스크랩 실패: ", e);
    }
  };

  // delete

  const confirm = (id: number) => {
    setPhotoId(id);

    setType("confirm");
    setIsOpen(true);
    setMessage("해당 게시글을 삭제하시겠습니까?");
  };

  const deletePhoto = async () => {
    try {
      await axiosInstance.delete(`/photos/${photoId}`);

      setType("success");
      setIsOpen(true);
      setMessage("삭제 완료!");
      getPhotoData();
    } catch (err) {
      console.error("삭제 실패: ", err);
    }
  };

  useEffect(() => {
    queryUserId && getPhotoData();
  }, [selectedMenu, queryUserId]);

  let DOMPurify: any = null;
  if (typeof window !== "undefined") {
    DOMPurify = createDOMPurify(window);
    DOMPurify.addHook("afterSanitizeAttributes", function (node: HTMLElement) {
      if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  return (
    <PhotoRightStyled>
      <div className="PhotoRight_wrap">
        <div className="PhotoRight_header">
          {userId === Number(queryUserId) && (
            <button
              className="PhotoRight_btn pxielFont"
              onClick={() => {
                setWrite(true);
              }}
            >
              글 작성하기
            </button>
          )}
        </div>
        <div className="PhotoRight_content">
          {!photoData || photoData.length == 0 ? (
            <div className="PhotoRight_empty">
              <EmptyPage type={"Photo_img"} />
              <p>해당 폴더에 작성된 사진첩이 없습니다.</p>
            </div>
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
                    onClick={() =>
                      router.push(
                        `/home/${
                          data.isScripted ? data.origin_author.id : data.user.id
                        }`
                      )
                    }
                  >
                    {data.isScripted ? data.origin_author.name : data.user.name}
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
                    {!loaded && (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="auto"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${data.photo_url}`}
                      alt="photo"
                      onLoad={() => setLoaded(true)}
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
                    <div className="PhotoRight_clips">
                      {/* 로그인 안 했으면 아무 버튼도 안 보여줌 */}
                      {!userId ? null : userId === Number(data.user.id) &&
                        !data.isScripted ? (
                        // 로그인한 내가 쓴 글
                        <div className="PhotoRight_btns">
                          <button
                            className="Gulim"
                            onClick={() => {
                              setEditData(data);
                              setWrite(true);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="Gulim"
                            onClick={() => confirm(data.id)}
                          >
                            삭제
                          </button>
                        </div>
                      ) : userId === Number(id) && data.isScripted ? (
                        // 로그인한 남이 스크랩한 글
                        <div className="PhotoRight_btns">
                          <button
                            className="Gulim"
                            onClick={() => confirm(data.id)}
                          >
                            삭제
                          </button>
                        </div>
                      ) : (
                        // 로그인한 남이 본 글
                        <button
                          className="PhotoRight_clipBtn Gulim"
                          onClick={() => clipPhoto(data.id)}
                        >
                          스크랩
                        </button>
                      )}
                    </div>
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

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        message={message}
        onConfirm={deletePhoto}
      />
    </PhotoRightStyled>
  );
};
export default PhotoRight;
