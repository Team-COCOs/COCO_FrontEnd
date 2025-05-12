import { DiaryLeftStyled } from "./styled";
import { useState } from "react";
import DynamicFolder from "../../DynamicFolder";
import Folder from "../../Folder";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
// 달력
import Calendar from "react-calendar";
import { format } from "date-fns";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
  setSelectedDiaryMenu: React.Dispatch<
    React.SetStateAction<{ id: number; title: string } | null>
  >;
}

const DiaryLeft = ({ selectedDiaryMenu, setSelectedDiaryMenu }: DiaryProps) => {
  // Folder 또는 DynamicFolder 전환용
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  // 달력
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isMyHomepage = user?.id?.toString() === id?.toString();

  const handleSave = () => {
    // Folder에서 저장 완료 → DynamicFolder로 전환
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    setEditMode(true); // 수정하기 버튼 눌렀을 때 Folder 컴포넌트 보이도록
  };

  // 날짜 선택
  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <DiaryLeftStyled className="Diary_wrap">
      <div className="Diary_title pixelFont">DIARY</div>
      <div className="Diary_line"></div>
      {/* 달력 */}
      <div className="DiaryLeft_Calendar_line">
        <div className="min-w-[250px] DiaryLeft_Calendar_wrap pixelFont">
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            prev2Label="◀◀" // «
            next2Label="▶▶" // »
            prevLabel="◀" // <
            nextLabel="▶" // >
            formatMonthYear={(locale, date) => format(date, "yyyy.MM")}
            formatDay={(locale, date) => format(date, "d")}
            showNeighboringMonth={false}
            tileClassName={({ date: tileDate, view }) => {
              if (
                view === "month" &&
                selectedDate &&
                tileDate.toDateString() === selectedDate.toDateString()
              ) {
                return "selected-date";
              }
              return null;
            }}
          />
          <button
            onClick={() => setSelectedDate(null)}
            className="DiaryLeft_Calendar_alldatebtn"
          >
            <span>▶ DIARY | </span>ALL DIARY
          </button>
        </div>
      </div>
      <div className="DiaryLeft_folder_wrap Gulim">
        {editMode ? (
          <Folder type="diary" onSave={handleSave} />
        ) : (
          <DynamicFolder
            type="diary"
            selectedMenu={selectedDiaryMenu}
            onMenuSelect={(menu) => setSelectedDiaryMenu(menu)}
          />
        )}

        {!editMode && isMyHomepage && (
          <div className="Diary_footer">
            <button onClick={handleEditModeToggle} className="Diary_btn">
              <span>⚙</span>
              <span className="pixelFont"> 폴더관리하기 </span>
            </button>
          </div>
        )}
      </div>
    </DiaryLeftStyled>
  );
};
export default DiaryLeft;
