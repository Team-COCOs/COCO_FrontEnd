"use client";
import { useRouter } from "next/router";
import { CocoRightStyled } from "./styled";
import { useEffect } from "react";
import BotpressChat from "../BotpressChat";

const CocoRight = () => {
  return (
    <CocoRightStyled>
      <div className="CocoRight_wrap">
        <div className="CocoRight_component_wrap">
          <div className="CocoRight_component_spanWrap pixelFont">
            <div className="CocoRight_imgWrap">
              <img src="/nate.png"></img>
              <div className="CocoRight_titleText">COCO랑 대화하기</div>
            </div>
            <span>
              ❝ 안녕...? 여긴, 네 마음속 깊은 곳에 숨겨둔 궁금증을 꺼내는
              곳이야... 뭐든지 물어봐. 내가... 꼭 대답해줄게. 단, 내 말투는 좀
              치명적일지도...? ❞
            </span>
            <span>
              오른쪽 하단의 말풍선 모양 버튼을 눌러봐. 그럼, 나와 대화를 시작할
              수 있어... (속닥)
            </span>
          </div>
          <BotpressChat />
        </div>
      </div>
    </CocoRightStyled>
  );
};
export default CocoRight;

// "use client";

// import Script from "next/script";
// import { useEffect } from "react";

// declare global {
//   interface Window {
//     botpress: {
//       init: (config: any) => void;
//       on: (event: string, callback: () => void) => void;
//       open: () => void;
//     };
//   }
// }

// export default function CocoRight() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.botpress?.init?.({
//         botId: "7d9faaf2-c025-4617-a734-39fad6ad26a6",
//         clientId: "bf1698e9-73c3-4bb4-8836-178cdb6a49ce",
//         hostUrl: "https://cdn.botpress.cloud/webchat/v2.4",
//         messagingUrl: "https://messaging.botpress.cloud",
//         selector: "#custom-bot-container",
//         openOnInit: true,
//         hideWidget: true,
//         showCloseButton: false,
//         configuration: {
//           botName: "coco",
//           botDescription: "coco world",
//           website: {},
//           email: {
//             title: "yujin5479@gmail.com",
//             link: "yujin5479@gmail.com",
//           },
//           phone: {
//             title: "010-9548-6848",
//             link: "010-9548-6848",
//           },
//           termsOfService: {},
//           privacyPolicy: {},
//           color: "#5eb1ef",
//           variant: "soft",
//           themeMode: "light",
//           fontFamily: "fira",
//           radius: 4,
//           allowFileUpload: true,
//         },
//       });

//       window.botpress?.on?.("webchat:ready", () => {
//         window.botpress.open();
//       });
//     }
//   }, []);

//   return (
//     <>
//       {/* 챗봇이 들어갈 영역 */}
//       <div id="custom-bot-container" />

//       {/* Botpress 스크립트 로드 */}
//       <Script
//         src="https://cdn.botpress.cloud/webchat/v2.4/inject.js"
//         strategy="afterInteractive"
//       />
//     </>
//   );
// }
