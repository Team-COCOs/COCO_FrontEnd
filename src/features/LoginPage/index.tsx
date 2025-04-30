import { LoginStyled } from "./styled";
import LoginForm from "./LoginForm";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

const Login = () => {
  const router = useRouter();

  return (
    <LoginStyled className={clsx("login-wrap")}>
      <div className="loginForm-container">
        <LoginForm />
      </div>
    </LoginStyled>
  );
};

export default Login;
