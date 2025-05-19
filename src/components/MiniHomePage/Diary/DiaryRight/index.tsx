import { DiaryRightStyled } from "./styled";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DiaryWritePage from "./DiaryWritePage";
import DiaryTopDate from "./DiaryTopDate";
import DiaryContent from "./DiaryContent";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export interface DiaryType {
  id: number;
  content: string;
  weather: string;
  mood: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  folder: {
    id: number;
    title: string;
  };
  comments: any[];
}

const DiaryRight = ({
  selectedDate,
  selectedDiaryMenu,
  setSelectedDate,
}: DiaryProps) => {
  const [diaryWrite, setDiaryWrite] = useState<boolean>(false);
  const [editingDiary, setEditingDiary] = useState<DiaryType | null>(null);

  return (
    <DiaryRightStyled>
      <div className="DiaryRight_wrap">
        <div className="DiaryRight_component_wrap">
          {/* 여기부터 컴포넌트 */}
          {/* 상단 날짜 밑 글쓰기 버튼 */}
          {!diaryWrite ? (
            <div>
              <DiaryTopDate
                selectedDate={selectedDate}
                selectedDiaryMenu={selectedDiaryMenu}
                setDiaryWrite={setDiaryWrite}
              />
              <DiaryContent
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDiaryMenu={selectedDiaryMenu}
                setDiaryWrite={setDiaryWrite}
                setEditingDiary={setEditingDiary}
              />
            </div>
          ) : (
            <div className="DiaryWritePage_component_wrap">
              <DiaryWritePage
                setDiaryWrite={setDiaryWrite}
                editingDiary={editingDiary}
              />
            </div>
          )}

          {/* {selectedDiaryMenu?.title}
          {selectedDiaryMenu?.id}
          <div>
            {selectedDate ? (
              <p>{format(selectedDate, "yyyy-MM-dd")}</p>
            ) : (
              <p>날짜를 선택하지 않았습니다.</p>
            )}
          </div> */}
        </div>
      </div>
    </DiaryRightStyled>
  );
};
export default DiaryRight;
