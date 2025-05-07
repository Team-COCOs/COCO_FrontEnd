import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";
import Cookies from "js-cookie";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isLoggedIn, user, checkLogin } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("로그인이 필요합니다.");
          router.push("/");
        }
        return;
      }

      await checkLogin();
      setCheckingAuth(false);
    };

    checkAuth();
  }, [checkLogin, router]);

  useEffect(() => {
    if (!checkingAuth && user) {
      if (user.role !== "admin") {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("관리자만 접근 가능한 페이지입니다.");
          router.push("/");
        }
      }
    }
  }, [checkingAuth, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default AdminRoute;
