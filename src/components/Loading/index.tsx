import React from "react";
import { LoadingStyle } from "./styled";

const Loading = () => {
  return (
    <LoadingStyle>
      <div className="Loading_Container">
        <div className="Loading_imgContainer">
          <img src="/searchImg.png" alt="Loading img" />
        </div>
        <p className="Loading_text pixelFont">
          Loading...<span className="Loading_spinner"></span>
        </p>
        <p className="Loading_text2 pixelFont">잠시만 기다려 주세요</p>
      </div>
    </LoadingStyle>
  );
};

export default Loading;
