import { ProfilePartStyle } from "./styled";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Login from "@/components/MainPage/Login";

const ProfilePart = () => {
  return (
    <ProfilePartStyle className={clsx("ProfilePart_wrap")}>
      {/* 로고 컴포넌트 */}
      <Login />
      {/* 광고 컴포넌트 */}
    </ProfilePartStyle>
  );
};

export default ProfilePart;
