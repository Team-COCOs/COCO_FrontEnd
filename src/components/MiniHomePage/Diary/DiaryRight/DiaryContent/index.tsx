import { DiaryContentStyle } from "./styled";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

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
  return (
    <DiaryContentStyle>
      <div className="DiaryContent_wrap Gulim">
        <div className="DiaryContent_dateWrap logoFont">
          <span className="DiaryContent_date">{formatted}</span>
        </div>
        <div className="DiaryContent_contentText Gulim">
          <div>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </div>
        </div>
        <div className="DiaryContent_Secret Gulim">
          <div>공개설정 : 전체공개</div>
        </div>
      </div>
      <span className="DiaryContent_DotLine"></span>
    </DiaryContentStyle>
  );
};

export default DiaryContent;
