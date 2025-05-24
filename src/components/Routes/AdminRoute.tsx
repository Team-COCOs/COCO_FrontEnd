import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, checkLogin } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          await Swal.fire({
            title: "로그인이 필요합니다.",
            icon: "error",
          });
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
    const admin = async () => {
      if (!checkingAuth && user) {
        if (user.role !== "admin") {
          if (!hasRedirected.current) {
            hasRedirected.current = true;

            await Swal.fire({
              title: "관리자만 접근 가능한 페이지입니다.",
              icon: "error",
            });

            router.push("/");
          }
        }
      }
    };

    admin();
  }, [checkingAuth, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default AdminRoute;
