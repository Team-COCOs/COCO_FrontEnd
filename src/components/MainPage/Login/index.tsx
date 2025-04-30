import { LoginStyle } from "./styled";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProfilePart = () => {
  return (
    <LoginStyle className={clsx("Login_wrap")}>
      <div className="Login_form">
        <div className="Login_inputs">
          <input placeholder="이메일" />
          <input placeholder="비밀번호" />
        </div>
        <button className="Login_btn"> &gt; 로그인 </button>
      </div>
    </LoginStyle>
  );
};

export default ProfilePart;
