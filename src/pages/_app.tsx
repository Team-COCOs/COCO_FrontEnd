import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import store from "@/store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  );
}
