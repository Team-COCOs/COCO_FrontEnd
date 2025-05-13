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

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let startTime = 0;
    let timeout: NodeJS.Timeout | null = null;

    const start = () => {
      startTime = Date.now();
      setLoading(true);
    };

    const end = () => {
      const elapsed = Date.now() - startTime;
      const remaining = 100 - elapsed;

      if (remaining > 0) {
        timeout = setTimeout(() => {
          setLoading(false);
        }, remaining);
      } else {
        setLoading(false);
      }
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      if (timeout) clearTimeout(timeout);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            {loading ? <Loading /> : <Component {...pageProps} />}
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  );
}
