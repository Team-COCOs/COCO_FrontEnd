import { DiaryTitleStyled } from "./styled";

interface Props {
  setIsOpen: (value: boolean) => void;
}

const DiaryTitle = ({ setIsOpen }: Props) => {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <DiaryTitleStyled>
      <div>
        <div className="DiaryTitle_wrap">
          <div className="DiaryTitle_number_title">코코월드님의 미니홈피</div>
          <div
            className="DiaryTitle_plus_friend dotumFont"
            onClick={handleClick}
          >
            + 일촌맺기
          </div>
        </div>
      </div>
    </DiaryTitleStyled>
  );
};
export default DiaryTitle;
