import { DiaryRightStyled } from "./styled";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DiaryWritePage from "./DiaryWritePage";
import DiaryTopDate from "./DiaryTopDate";
import DiaryContent from "./DiaryContent";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
  selectedDate: Date | null;
}

export interface DiaryType {
  id: number;
  folder_name: string;
  weather: string;
  mood: string;
  visibility: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorId: number;
}

const DiaryRight = ({ selectedDate, selectedDiaryMenu }: DiaryProps) => {
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
                setEditingDiary={setEditingDiary}
              />
              <DiaryContent
                selectedDate={selectedDate}
                selectedDiaryMenu={selectedDiaryMenu}
                setDiaryWrite={setDiaryWrite}
                // setEditingDiary={setEditingDiary}
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
