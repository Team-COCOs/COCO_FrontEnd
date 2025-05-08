import { PhotoLeftStyled } from "./styled";
import { useEffect } from "react";

const PhotoLeft = () => {
  return (
    <PhotoLeftStyled>
      <div className="PhotoLeft_wrap">
        <div className="PhotoLeft_componentWrap">사진첩 왼쪽</div>
      </div>
    </PhotoLeftStyled>
  );
};
export default PhotoLeft;
