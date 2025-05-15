import { DiaryTopDateStyle } from "./styled";
import { format } from "date-fns";

interface DiaryTopDateProps {
  selectedDate: Date | null;
  selectedDiaryMenu: { id: number; title: string } | null;
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryTopDate = ({
  selectedDate,
  selectedDiaryMenu,
  setDiaryWrite,
}: DiaryTopDateProps) => {
  return (
    <DiaryTopDateStyle>
      <div className="DiaryTopDate_wrap Gulim">
        <div className="DiaryTopDate_dateWrap">
          <span className="DiaryTopDate_dateMM">
            {format(selectedDate || new Date(), "MM/dd")}
          </span>
          <span className="DiaryTopDate_dateEE">
            {format(selectedDate || new Date(), "EEE")}
          </span>
        </div>
        <div>작은 하루도 소중히 담아보아요.</div>
        <button onClick={() => setDiaryWrite(true)}>글쓰기</button>
      </div>
    </DiaryTopDateStyle>
  );
};

export default DiaryTopDate;
