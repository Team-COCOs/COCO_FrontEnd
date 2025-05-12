import { DiaryRightStyled } from "./styled";
import { useEffect, useState } from "react";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
}

const DiaryRight = ({ selectedDiaryMenu }: DiaryProps) => {
  return (
    <DiaryRightStyled>
      <div className="DiaryRight_wrap">
        <div className="DiaryRight_component_wrap">
          {selectedDiaryMenu?.title}
        </div>
      </div>
    </DiaryRightStyled>
  );
};
export default DiaryRight;
