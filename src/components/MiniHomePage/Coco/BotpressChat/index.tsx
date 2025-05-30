"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    botpress: {
      init: (config: any) => void;
      on: (event: string, callback: () => void) => void;
      open: () => void;
    };
  }
}

export default function BotpressChat() {
  const initializeBot = () => {
    if (typeof window !== "undefined" && window.botpress) {
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
          website: {},
          email: {
            title: "yujin5479@gmail.com",
            link: "yujin5479@gmail.com",
          },
          phone: {
            title: "010-9548-6848",
            link: "010-9548-6848",
          },
          termsOfService: {},
          privacyPolicy: {},
          color: "#5eb1ef",
          variant: "soft",
          themeMode: "light",
          fontFamily: "fira",
          radius: 4,
          allowFileUpload: true,
        },
      });

      window.botpress.on("webchat:ready", () => {
        window.botpress.open();
      });
    }
  };

  return (
    <>
      <div id="custom-bot-container" />
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.4/inject.js"
        strategy="afterInteractive"
        onLoad={initializeBot}
      />
    </>
  );
}
