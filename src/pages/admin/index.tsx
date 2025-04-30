import AdminPage from "@/features/Admin";
import NotPcPage from "@/features/NotPcPage";
import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 버전에서 막기
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // 최초 렌더링 시 한 번 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <NotPcPage />; // 모바일 화면일 때 렌더링
  }

  // 모바일 아닐 때만 Admin 페이지 보이게 하기
  return <AdminPage />;
};

export default Admin;
