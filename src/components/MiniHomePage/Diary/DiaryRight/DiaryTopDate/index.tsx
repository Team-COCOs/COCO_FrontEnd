import { DiaryTopDateStyle } from "./styled";
import { format } from "date-fns";
import { DiaryType } from "..";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

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
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  return (
    <DiaryTopDateStyle>
      <div className="DiaryTopDate_wrap Gulim">
        <div className="DiaryTopDate_page_wrap Gulim">
          <div className="DiaryTopDate_dateWrap pixelFont">
            <span className="DiaryTopDate_dateMM logoFont">
              {format(selectedDate || new Date(), "MM.dd")}
            </span>
            <span className="DiaryTopDate_dateEE titleFont">
              {format(selectedDate || new Date(), "EEE")}
            </span>
          </div>
          <div className="DiaryTopDate_diaryTitleText pixelFont">
            작은 하루도 소중히 담아보아요❤️
          </div>
          {Number(user?.id) === Number(id) ? (
            <>
              <button
                className="DiaryTopDate_diaryWriteBtn pixelFont"
                onClick={() => setDiaryWrite(true)}
              >
                일기쓰기✏️
              </button>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </DiaryTopDateStyle>
  );
};

export default DiaryTopDate;
