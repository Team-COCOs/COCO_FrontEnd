"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    botpress?: {
      init: (config: any) => void;
      on: (event: string, callback: () => void) => void;
      open: () => void;
    };
  }
}

export default function BotpressChat() {
  useEffect(() => {
    // 기존 위젯 제거
    const iframe = document.querySelector("iframe[src*='botpress']");
    if (iframe) iframe.remove();

    const existingScript = document.getElementById("botpress-script");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = "botpress-script";
    script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
    script.async = true;

    script.onload = () => {
      if (window.botpress) {
        window.botpress.init({
          botId: "7d9faaf2-c025-4617-a734-39fad6ad26a6",
          clientId: "bf1698e9-73c3-4bb4-8836-178cdb6a49ce",
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.4",
          messagingUrl: "https://messaging.botpress.cloud",
          selector: "#custom-bot-container",
          openOnInit: true,
          hideWidget: true,
          showCloseButton: false,
          configuration: {
            botName: "coco",
            botDescription: "coco world",
            color: "#5eb1ef",
            variant: "soft",
            themeMode: "light",
            fontFamily: "fira",
            radius: 4,
            allowFileUpload: true,
            email: {
              title: "yujin5479@gmail.com",
              link: "mailto:yujin5479@gmail.com",
            },
            phone: {
              title: "010-9548-6848",
              link: "tel:010-9548-6848",
            },
          },
        });

        window.botpress.on("webchat:ready", () => {
          window.botpress?.open?.();
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div id="custom-bot-container" />;
}
