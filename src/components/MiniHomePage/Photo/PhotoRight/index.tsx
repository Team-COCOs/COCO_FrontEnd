import { PhotoRightStyled } from "./styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EmptyPage from "@/components/EmptyPage";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
  setWrite: Dispatch<SetStateAction<boolean>>;
}

interface CommentData {
  id: number;
  comment: string;
  author: string;
  date: string;
  children: CommentData[];
}

interface PhotoData {
  id: number;
  title: string;
  content: string;
  writer: string;
  clip: number;
  date: string;
  isPublic: string;
  folder: string;
  comments: CommentData[];
}

const PhotoRight = ({ selectedMenu, setWrite }: PhotoProps) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axiosInstance.get(`/photos/my-photos/${userId}`);

        console.log("사진첩 : ", res.data);

        const filtered =
          selectedMenu &&
          res.data.filter(
            (item: PhotoData) => item.folder === selectedMenu.id.toString()
          );

        setPhotoData(filtered);

        setPhotoData(res.data);
      } catch (e: any) {
        if (e.response?.status === 401) {
          alert("로그인이 필요합니다.");
          router.push(`/photo/${userId}`);
        } else {
          console.log("사진첩 불러오기 에러 : ", e);
        }
      }
    };

    // data();
  }, []);

  return (
    <PhotoRightStyled>
      <div className="PhotoRight_wrap">
        <div className="PhotoRight_header">
          <button className="PhotoRight_btn" onClick={() => setWrite(true)}>
            글 작성하기
          </button>
        </div>
        <div className="PhotoRight_content">
          <div className="PhotoRight_title Guilm">
            사프란블루_흐드르륵 언덕02
          </div>
          <div className="PhotoRight_infos Guilm">
            <p className="PhotoRight_user">홍순애</p>
            <div className="PhotoRight_info">
              <p className="PhotoRight_font">2005.06.19 05:06</p>
              <p>스크랩 0</p>
            </div>
          </div>

          <div className="PhotoRight_imgBox">
            <div className="PhotoRight_img">
              <Image
                src="/miniroom/miniroom1.jpg"
                alt="photo"
                fill
                objectFit="contain"
              />
            </div>
          </div>

          {photoData.length === 0 ? (
            <EmptyPage />
          ) : (
            photoData.map((data) => (
              <div key={data.id}>
                <div className="PhotoRight_title Guilm">{data.title}</div>

                <div className="PhotoRight_infos Guilm">
                  <p
                    className="PhotoRight_user"
                    onClick={() => router.push(`/home/${data.id}}`)}
                  >
                    {data.writer}
                  </p>
                  <div className="PhotoRight_info">
                    <p className="PhotoRight_font">{data.date}</p>
                    <p>스크랩 {data.clip}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PhotoRightStyled>
  );
};
export default PhotoRight;
