import { MiniStatusStyle } from "./styled";
import Image from "next/image";
import { useState } from "react";

const MiniStatus = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "/avatarImg/defaultProfile.png"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일을 URL로 변환 후 반영
      const fileUrl = URL.createObjectURL(file);
      setProfileImage(fileUrl);
    }
  };

  return (
    <MiniStatusStyle className="MiniStatus_wrap">
      <span className="MiniStatus_title Gulim">내 상태 관리하기</span>

      <div className="MiniStatus_top">
        <div className="MiniStatus_left">
          <div className="MiniStatus_img">
            <Image src={profileImage} alt="profile" fill />
          </div>
          <div className="MiniStatus_upload Gulim">
            <label htmlFor="profile-upload">프로필 선택</label>
            <input
              type="file"
              id="profile-upload"
              className="MiniStatus_input"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="MiniStatus_bottom"></div>
    </MiniStatusStyle>
  );
};

export default MiniStatus;
