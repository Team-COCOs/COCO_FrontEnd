import { DiaryContentStyle } from "./styled";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import CommentDiary from "../CommentDiary";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

interface DiaryContentProps {
  selectedDate: Date | null;
  selectedDiaryMenu: { id: number; title: string } | null;
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatted = format(new Date(), "yyyy.MM.dd EEE HH:mm", { locale: ko });

const DiaryContent = ({
  selectedDate,
  selectedDiaryMenu,
  setDiaryWrite,
}: DiaryContentProps) => {
  const [diaryData, setDiaryData] = useState<[]>([]);
  const handleFixBtn = () => {};

  const handleDeleteBtn = () => {};

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

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
    } catch (error) {
      console.error("다이어리 조회 실패", error);
      throw error;
    }
  };

  return (
    <DiaryContentStyle>
      <div className="DiaryContent_wrap Gulim">
        <div className="DiaryContent_dateWrap logoFont">
          <div>
            <span className="DiaryContent_date">{formatted}</span>
            <span className="DiaryContent_weather">☀️</span>
          </div>
          <div>
            <span className="DiaryContent_now">지금은 🎵</span>
          </div>
        </div>
        <div className="DiaryContent_contentText Gulim">
          <div>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </div>
          <div className="DiaryContent_fixDeletebtn Gulim">
            <button
              onClick={() => {
                handleFixBtn;
              }}
            >
              수정
            </button>
            <span>|</span>
            <button
              onClick={() => {
                handleDeleteBtn;
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
      <div>
        <div className="DiaryContent_bottom_wrap">
          <div className="DiaryContent_btns">
            <button>▲</button>
            <button>▼</button>
          </div>
          <div className="DiaryContent_allbtn">목록</div>
        </div>
        <div className="DiaryContent_findwrap">
          <select defaultValue="content" className="DiaryContent_select Gulim">
            <option value="content">내용</option>
          </select>
          <input type="text" className="DiaryContent_findInput Gulim" />
          <button className="DiaryContent_findbtn">🔍 찾기</button>
        </div>
      </div>
    </DiaryContentStyle>
  );
};

export default DiaryContent;
