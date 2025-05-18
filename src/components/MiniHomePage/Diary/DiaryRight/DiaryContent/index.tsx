import { DiaryContentStyle } from "./styled";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import CommentDiary from "../CommentDiary";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryType } from "..";

interface DiaryContentProps {
  selectedDate: Date | null;
  selectedDiaryMenu: { id: number; title: string } | null;
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingDiary?: React.Dispatch<React.SetStateAction<DiaryType | null>>;
}

const emotionIcons: { [key: string]: string } = {
  love: "❤️",
  happy: "🎵",
  sad: "💧",
  angry: "🔥",
  calm: "🌿",
};

const formatted = format(new Date(), "yyyy.MM.dd EEE HH:mm", { locale: ko });

const DiaryContent = ({
  selectedDate,
  selectedDiaryMenu,
  setDiaryWrite,
  setEditingDiary,
}: DiaryContentProps) => {
  const [diaryData, setDiaryData] = useState<DiaryType[]>([]);

  const handleFixBtn = (diary: DiaryType) => {
    setEditingDiary?.(diary); // 수정할 다이어리 세팅
    setDiaryWrite(true); // 수정 페이지 열기
  };

  const handleDeleteBtn = async (diaryId: number) => {
    try {
      const response = axiosInstance.delete(`/diary/delete/${diaryId}`);
      alert("게시물이 삭제되었습니다!");
      router.push(`/home/${id}`);
    } catch (e: any) {
      console.log(e, "e : 게시물 삭제 실패");
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    // 다이어리 조회
    const fetchDiary = async () => {
      try {
        const response = user?.id
          ? await axiosInstance.get(`/diary/${id}`)
          : await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/diary/logout/${id}`
            ); // 비로그인 유저용
        console.log(response.data, "다이어리 데이터");
        setDiaryData(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log("다이어리 조회 실패 : 로그아웃 됨");
          return;
        }
        console.error("다이어리 조회 실패", error);
      }
    };
    fetchDiary();
  }, [user?.id]);

  return (
    <DiaryContentStyle>
      <>
        {diaryData.length > 0 &&
          diaryData.map((diary) => (
            <div>
              <div className="DiaryContent_wrap Gulim">
                <div className="DiaryContent_dateWrap logoFont">
                  <div>
                    <span className="DiaryContent_date">{formatted}</span>
                    <span className="DiaryContent_weather">
                      {diary.weather}
                    </span>
                  </div>
                  <div>
                    <span className="DiaryContent_now">
                      지금은 {emotionIcons[diary.mood]}
                    </span>
                  </div>
                </div>
                <div className="DiaryContent_contentText Gulim">
                  <div>{diary.content}</div>
                  <div className="DiaryContent_fixDeletebtn Gulim">
                    <button onClick={() => handleFixBtn(diary)}>수정</button>
                    <span>|</span>
                    <button
                      onClick={() => {
                        handleDeleteBtn(diary.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="DiaryContent_Secret Gulim">
                  <div>공개설정 : 전체공개</div>
                </div>
                <div>
                  <CommentDiary />
                </div>
              </div>

              {/* 구분선 */}
              <span className="DiaryContent_DotLine"></span>
            </div>
          ))}
      </>

      {/* 구분선까지 map */}
      {diaryData.length > 0 ? (
        <div>
          <div className="DiaryContent_bottom_wrap">
            <div className="DiaryContent_btns">
              <button>▲</button>
              <button>▼</button>
            </div>
            <div className="DiaryContent_allbtn">목록</div>
          </div>
          <div className="DiaryContent_findwrap">
            <select
              defaultValue="content"
              className="DiaryContent_select Gulim"
            >
              <option value="content">내용</option>
            </select>
            <input type="text" className="DiaryContent_findInput Gulim" />
            <button className="DiaryContent_findbtn">🔍 찾기</button>
          </div>
        </div>
      ) : (
        <div className="DiaryContent_dotori_imgWrap">
          <img src={"/dotori/emptyImg.png"} alt="empty diary" />
        </div>
      )}
    </DiaryContentStyle>
  );
};

export default DiaryContent;
