// import { useRouter } from "next/router";
// import { CocoRightStyled } from "./styled";
// import { useEffect } from "react";

// const CocoRight = () => {
//   return (
//     <CocoRightStyled>
//       <div className="CocoRight_wrap">
//         <div className="CocoRight_component_wrap">코코 오른쪽</div>
//       </div>
//     </CocoRightStyled>
//   );
// };
// export default CocoRight;
"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    botpressWebChat?: any;
  }
}

const BotpressChat = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;

    script.onload = () => {
      console.log("Botpress script loaded");

      if (window.botpressWebChat) {
        console.log("Initializing botpress...");
        window.botpressWebChat.init({
          configUrl:
            "https://files.bpcontent.cloud/2025/05/14/05/20250514055041-YVN1F9QQ.json",
          showWidget: true, // 챗봇 위젯 바로 표시
          enableReset: true,
        });
        window.botpressWebChat.open(); // 수동으로 열기
      } else {
        console.error("window.botpressWebChat is not available");
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default BotpressChat;
