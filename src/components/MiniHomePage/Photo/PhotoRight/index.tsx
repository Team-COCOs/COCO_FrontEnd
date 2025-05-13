import { PhotoRightStyled } from "./styled";
import { useEffect } from "react";

interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
}

const PhotoRight = ({ selectedMenu }: PhotoProps) => {
  return (
    <PhotoRightStyled>
      <div className="PhotoRight_wrap">
        <div className="PhotoRight_header">
          <button>글 작성하기</button>
        </div>
        <div className="PhotoRight_component_wrap">{selectedMenu?.title}</div>
      </div>
    </PhotoRightStyled>
  );
};
export default PhotoRight;
