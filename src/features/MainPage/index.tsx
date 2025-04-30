import { MainPageStyled } from "./styled";
import ProfilePart from "@/components/MainPage/ProfilePart";
import StorePart from "@/components/MainPage/StorePart";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();

  return (
    <MainPageStyled className="MainPage_wrap">
      <div className="MainPage_container">
        <ProfilePart />
        <StorePart />
      </div>
    </MainPageStyled>
  );
};

export default Login;
