import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import store from "@/store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { SkinProvider } from "@/context/SkinContext";
import { TabsProvider } from "@/context/TabsContext";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import MusicPlayerController from "@/context/MusicPlayerController";
import { ModalProvider } from "@/context/ModalContext";
import axios from "axios";
import ServerDownPage from "@/components/ServerDownPage";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [isServerDown, setIsServerDown] = useState(false);
  const [checkedServer, setCheckedServer] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/health`,
          { timeout: 3000 }
        );

        const { ok, status } = res.data;

        console.log(res.data);

        if (!ok || status !== "ready") throw new Error("Server not ready");

        setIsServerDown(false);
      } catch (e) {
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });

        setIsServerDown(true);
      } finally {
        setCheckedServer(true);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let startTime = 0;
    let delayTimeout: NodeJS.Timeout | null = null;

    const handleStart = () => {
      startTime = Date.now();
      // 300ms 후에 로딩을 보여주도록 지연 설정
      delayTimeout = setTimeout(() => {
        setLoading(true);
      }, 300);
    };

    const handleComplete = () => {
      const loadTime = Date.now() - startTime;
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
      // 로딩이 표시되었으면 끄기
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      if (delayTimeout) clearTimeout(delayTimeout);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      {/* 인터넷 상단 탭 - 기본 설정 */}
      <Head>
        <title>COCOWORLD</title>
        <link rel="icon" href="/cocoworldicon.png" />
        <meta
          name="description"
          content="COCOWORLD에서 나만의 미니홈피를 꾸미고, 친구들과 소통하며 다양한 활동을 즐겨보세요!"
        />
      </Head>

      <Provider store={store}>
        <ModalProvider>
          <AuthProvider>
            <SkinProvider>
              <MusicPlayerProvider>
                <MusicPlayerController />
                <LanguageProvider>
                  <TabsProvider>
                    <ThemeProvider theme={theme}>
                      {!checkedServer ? (
                        <Loading />
                      ) : isServerDown ? (
                        <ServerDownPage />
                      ) : loading ? (
                        <Loading />
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </ThemeProvider>
                  </TabsProvider>
                </LanguageProvider>
              </MusicPlayerProvider>
            </SkinProvider>
          </AuthProvider>
        </ModalProvider>
      </Provider>
    </>
  );
}
