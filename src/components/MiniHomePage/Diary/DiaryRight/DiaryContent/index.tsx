import { DiaryContentStyle } from "./styled";
import { format } from "date-fns";

interface DiaryContentProps {
  selectedDate: Date | null;
  selectedDiaryMenu: { id: number; title: string } | null;
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryContent = ({
  selectedDate,
  selectedDiaryMenu,
  setDiaryWrite,
}: DiaryContentProps) => {
  return (
    <DiaryContentStyle>
      <div className="DiaryContent_wrap Gulim">
        <div className="DiaryContent_dateWrap pixelFont">
          <span className="DiaryContent_dateMM logoFont">
            {format(selectedDate || new Date(), "MM.dd")}
          </span>
          <span className="DiaryContent_dateEE titleFont">
            {format(selectedDate || new Date(), "EEE")}
          </span>
        </div>
      </div>
      <span className="DiaryContent_DotLine"></span>
    </DiaryContentStyle>
  );
};

export default DiaryContent;
