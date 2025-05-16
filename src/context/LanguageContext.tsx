// context/LanguageContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// ✅ id를 props로 받도록 수정
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ko");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id !== "string") return;

    const fetchLanguageSettings = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/language/${id}`
        );
        if (data === "ko" || data === "en") {
          setLanguage(data);
        }
      } catch (error) {
        console.error("언어 설정 불러오기 실패:", error);
      }
    };

    fetchLanguageSettings();
  }, [id]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
