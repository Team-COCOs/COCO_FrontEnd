import AdminPage from "@/features/Admin";
import NotPcPage from "@/features/NotPcPage";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Head from "next/head";

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 모바일 버전에서 막기
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // 최초 렌더링 시 한 번 실행
    window.addEventListener("resize", handleResize);

    // 로딩을 끝내는 코드 추가 (예시로 1초 딜레이)
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 비동기 작업 (예시)
      setIsLoading(false); // 로딩 끝
    };

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>관리자 페이지 - COCOWORLD</title>
        </Head>
        <Loading />
      </>
    ); // 로딩 중일 때 로딩 컴포넌트 표시
  }

  if (isMobile) {
    return (
      <>
        <Head>
          <title>관리자 페이지 - COCOWORLD</title>
        </Head>
        <NotPcPage />
      </>
    ); // 모바일 화면일 때 렌더링
  }

  // 모바일 아닐 때만 Admin 페이지 보이게 하기
  return (
    <>
      <Head>
        <title>관리자 페이지 - COCOWORLD</title>
      </Head>
      <AdminPage />
    </>
  );
};

export default Admin;
