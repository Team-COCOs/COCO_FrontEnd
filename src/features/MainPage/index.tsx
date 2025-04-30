import { MainPageStyled } from "./styled";
import ProfilePart from "@/components/MainPage/ProfilePart";
import StorePart from "@/components/MainPage/StorePart";
import Footer from "@/components/MainPage/Footer";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();

  return (
    <MainPageStyled className={clsx("MainPage_wrap")}>
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

export default Login;
