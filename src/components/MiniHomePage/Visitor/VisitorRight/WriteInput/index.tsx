import { useAuth } from "@/context/AuthContext";
import { WriteInputStyle } from "./styled";
import { useState } from "react";

const WriteInput = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState("미니미");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeProfile, setHomeProfile] = useState(
    "/avatarImg/defaultProfile.png"
  );

  const miniProfile = !user?.profile_image
    ? user?.gender === "woman"
      ? "/avatarImg/woman_avatar1.png"
      : "/avatarImg/man_avatar1.png"
    : user?.profile_image;

  const handleOptionClick = (option: string) => {
    setProfile(option);
    setDropdownOpen(false);
  };

  return (
    <WriteInputStyle className="WtireInput_wrap">
      <div className="WriteInput_left">
        <img
          src={profile === "미니미" ? miniProfile : homeProfile}
          alt="profile"
          className={
            profile === "미니미" ? "WriteInput_img" : "WriteInput_homeImg"
          }
        />
        <div className="WriteInput_profile">
          <p className="Gulim">{profile}</p>
          <div
            className="WriteInput_choice Gulim"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>▼</span>[설정]
          </div>
          {dropdownOpen && (
            <div className="WriteInput_dropdown Gulim">
              <div onClick={() => handleOptionClick("미니미")}>미니미</div>
              <div className="WriteInput_line"></div>
              <div onClick={() => handleOptionClick("프로필")}>프로필</div>
            </div>
          )}
        </div>
      </div>
      <div className="WriteInput_right">
        <textarea />
        <button className="Gulim">확인</button>
      </div>
    </WriteInputStyle>
  );
};

export default WriteInput;
