import { DiaryRightStyled } from "./styled";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DiaryWritePage from "./DiaryWritePage";
import DiaryTopDate from "./DiaryTopDate";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
  selectedDate: Date | null;
}

const DiaryRight = ({ selectedDate, selectedDiaryMenu }: DiaryProps) => {
  const [diaryWrite, setDiaryWrite] = useState<boolean>(false);

  return (
    <DiaryRightStyled>
      <div className="DiaryRight_wrap">
        <div className="DiaryRight_component_wrap">
          {/* 여기부터 컴포넌트 */}
          {/* 상단 날짜 밑 글쓰기 버튼 */}
          {!diaryWrite ? (
            <DiaryTopDate
              selectedDate={selectedDate}
              selectedDiaryMenu={selectedDiaryMenu}
              setDiaryWrite={setDiaryWrite}
            />
          ) : (
            ""
          )}

          {selectedDiaryMenu?.title}
          {selectedDiaryMenu?.id}
          <div>
            {selectedDate ? (
              <p>{format(selectedDate, "yyyy-MM-dd")}</p>
            ) : (
              <p>날짜를 선택하지 않았습니다.</p>
            )}
          </div>
          <DiaryWritePage />
        </div>
      </div>
    </DiaryRightStyled>
  );
};
export default DiaryRight;
