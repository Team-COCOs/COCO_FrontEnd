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
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: "7d9faaf2-c025-4617-a734-39fad6ad26a6",
          clientId: "bf1698e9-73c3-4bb4-8836-178cdb6a49ce",
          hostUrl: "https://cdn.botpress.cloud/webchat/v0",
          messagingUrl: "https://messaging.botpress.cloud",
          botName: "COCO봇",
          avatarUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712106.png",
          stylesheet:
            "https://mediafiles.botpress.cloud/webchat/v0/css/theme.css",
          showWidget: true,
          enableReset: true,
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default BotpressChat;
