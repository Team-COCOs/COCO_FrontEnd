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

const visibilityOptions: { [key: string]: string } = {
  public: "전체공개",
  private: "비공개",
  friends: "일촌공개",
};

// 댓글과 대댓글 구분
interface Comment {
  diary_id: number; // 게시글 아이디
  user_id: number; // 작성자 아이디
  id: number; // 댓글 아이디
  content: string; // 댓글 내용
  name: string; // 작성자 이름
  parent_comment_id: number | null; // null이면 댓글, 숫자면 대댓글
  createdAt: string; // 작성 날짜
}

const DiaryContent = ({
  selectedDate,
  selectedDiaryMenu,
  setDiaryWrite,
  setEditingDiary,
}: DiaryContentProps) => {
  const [diaryData, setDiaryData] = useState<DiaryType[]>([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = diaryData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(diaryData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // 수정 버튼
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
        {currentItems.length > 0 &&
          currentItems.map((diary) => (
            <div>
              <div className="DiaryContent_wrap Gulim">
                <div className="DiaryContent_dateWrap logoFont">
                  <div>
                    <span className="DiaryContent_date">
                      {format(
                        new Date(diary.created_at),
                        "yyyy.MM.dd EEE HH:mm",
                        {
                          locale: ko,
                        }
                      )}
                    </span>
                    <span className="DiaryContent_update_date">
                      {diary.updated_at !== diary.created_at ? (
                        <>
                          <span>수정일: </span>
                          <span>
                            {format(
                              new Date(diary.updated_at),
                              "yyyy.MM.dd EEE HH:mm",
                              {
                                locale: ko,
                              }
                            )}
                          </span>
                        </>
                      ) : null}
                    </span>
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
                    {user?.id === id ? (
                      <div>
                        <button onClick={() => handleFixBtn(diary)}>
                          수정
                        </button>
                        <span>|</span>
                        <button
                          onClick={() => {
                            handleDeleteBtn(diary.id);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="DiaryContent_Secret Gulim">
                  <div>공개설정 : {visibilityOptions[diary.visibility]}</div>
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
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                ▲
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                ▼
              </button>
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
