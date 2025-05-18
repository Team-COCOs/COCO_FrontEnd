import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

// ✅ NestJS 유저 프로필 DTO 기반 타입 정의
type UserInfo = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  gender: string | null;
  profile_image: string;
  role: string;
  dotoris: number;
  birthday: string | null;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserInfo | null;
  checkLogin: () => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  // ✅ 서버에서 로그인 상태 및 프로필 정보 확인
  const checkLogin = async () => {
    try {
      const response = await axiosInstance.get("/users/profile", {
        withCredentials: true,
      });

      const userData: UserInfo = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        phone: response.data.phone,
        gender: response.data.gender,
        profile_image: response.data.profile_image,
        role: response.data.role,
        dotoris: response.data.dotoris,
        birthday: response.data.birthday,
      };

      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("로그인 상태 확인 실패:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // ✅ 로그아웃
  const logout = async () => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      setUser(null);
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      checkLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, checkLogin, login: () => {}, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
