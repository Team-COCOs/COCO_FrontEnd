import { useAuth } from "@/context/AuthContext";
import { WriteInputStyle } from "./styled";
import { useState } from "react";

const WriteInput = () => {
  const { user } = useAuth();

  const miniProfile = !user?.profile_image
    ? user?.gender === "woman"
      ? "/avatarImg/woman_avatar1.png"
      : "/avatarImg/man_avatar1.png"
    : user?.profile_image;

  return (
    <WriteInputStyle className="WtireInput_wrap">
      <div className="WriteInput_left">
        <img src={miniProfile} alt="profile" className="WriteInput_img" />
        <div className="WriteInput_profile">
          <p className="Gulim">{user?.name}</p>
        </div>
      </div>
      <div className="WriteInput_right">
        <textarea />
        <div className="WriteInput_btns">
          <input type="checkbox" />
          <span className="Gulim">비밀로 하기</span>
          <button className="Gulim">확인</button>
        </div>
      </div>
    </WriteInputStyle>
  );
};

export default WriteInput;
