import { MainPageStyled } from "./styled";
import ProfilePart from "@/components/MainPage/ProfilePart";
import StorePart from "@/components/MainPage/StorePart";
import Footer from "@/components/MainPage/Footer";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "@/components/MainPage/Header";
import Loading from "@/components/Loading";

const MainPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 로딩 상태 처리
  useEffect(() => {
    const fetchData = async () => {
      // 예시로 1초 동안 기다린 후 로딩을 종료
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false); // 로딩 종료
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainPageStyled className={clsx("MainPage_wrap")}>
      <Header />
      <div className="MainPage_container">
        <div className="MainPage_profile">
          <ProfilePart />
        </div>
        <div className="MainPage_store">
          <StorePart />
        </div>
      </div>

      <Footer />
    </MainPageStyled>
  );
};

export default MainPage;
