import { PhotoRightStyled } from "./styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EmptyPage from "@/components/EmptyPage";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Comment from "./Comment";
interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
  setWrite: Dispatch<SetStateAction<boolean>>;
}

interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  author: string; // 댓글 작성자
  authorId: number; // 댓글 작성자 id
  date: string; // 날짜
  children: CommentData[]; // 대댓글
}

interface PhotoData {
  id: number; // PK
  title: string; // 제목
  image: string; // 이미지
  content: string; // 내용
  writer: string; // 작성자
  writerId: number; // 작성자 아이디(FK)
  clip: number; // 스크랩 수
  date: string; // 날짜
  isPublic: string; // 전체 공개 / 일촌 공개 / 비공개
  isClip: boolean; // 스크랩한 글인지 아닌지
  folderId: number; // 폴더 아이디 (FK)
  views: number; // 조회수
  comments: CommentData[]; // 댓글
}

const PhotoRight = ({ selectedMenu, setWrite }: PhotoProps) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [queryId, setQueryId] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const queryUserId = router.query.id;

  const getPhotoData = async () => {
    try {
      const res = await axiosInstance.get(`/photos/my-photos/${userId}`);

      console.log("사진첩 : ", res.data);

      const filtered =
        selectedMenu &&
        res.data.filter((item: PhotoData) => item.folderId === selectedMenu.id);

      setPhotoData(filtered);
    } catch (e: any) {
      if (e.response?.status === 401) {
        alert("로그인이 필요합니다.");
        router.push(`/home/${userId}`);
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
    // getPhotoData();
  }, [selectedMenu]);

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
          <div className="PhotoRight_title Gulim">
            <span>[스크랩]</span>사프란블루_흐드르륵 언덕02
          </div>

          <div className="PhotoRight_infos Gulim">
            <p className="PhotoRight_user">홍순애</p>
            <div className="PhotoRight_info">
              <p className="PhotoRight_font">2005.06.19 05:06</p>
              <p>스크랩 0</p>
            </div>
          </div>

          <div className="PhotoRight_imgBox">
            <div className="PhotoRight_img">
              <img src="/advertising/Advertising3.jpg" alt="photo" />
            </div>
          </div>

          <div className="PhotoRight_isPublic Gulim">
            <div>
              공개설정 <span className="PhotoRight_line">|</span> 전체공개
            </div>
            <div className="PhotoRight_clips">
              <div>조회수 1,000</div>
              <button
                className="PhotoRight_clipBtn Gulim"
                // onClick={() => clipPhoto(data.id)}
              >
                스크랩
              </button>
            </div>
          </div>

          <Comment />

          {photoData.length === 0 ? (
            <EmptyPage />
          ) : (
            photoData.map((data) => (
              <div key={data.id}>
                <div className="PhotoRight_title Gulim">
                  {data.isClip && <span>[스크랩]</span>}
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
                    <p className="PhotoRight_font">{data.date}</p>
                    <p>스크랩 {data.clip}</p>
                  </div>
                </div>

                <div className="PhotoRight_imgBox">
                  <div className="PhotoRight_img">
                    <img src={data.image} alt="photo" />
                  </div>
                </div>

                <div className="PhotoRight_isPublic Gulim">
                  <div>
                    공개설정 <span className="PhotoRight_line">|</span>
                    {data.isPublic}
                  </div>
                  <div className="PhotoRight_clips">
                    <div>조회수 {data.views.toLocaleString()}</div>
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
                />
              </div>
            ))
          )}
        </div>
      </div>
    </PhotoRightStyled>
  );
};
export default PhotoRight;
