import { MiniStatusStyle } from "./styled";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRef, useState } from "react";

const MiniStatus = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "/avatarImg/defaultProfile.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // 이미지 url로 변환 후 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfileImage(fileUrl);
    }
  };

  // 해당 돔 요소에 접근 -> 파일 열기
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <MiniStatusStyle className="MiniStatus_wrap">
      <span className="MiniStatus_title Gulim">내 상태 관리하기</span>

      <div className="MiniStatus_top">
        <div className="MiniStatus_left">
          <div className="MiniStatus_img">
            <Image src={profileImage} alt="profile" fill />
          </div>

          <div
            className="MiniStatus_upload pixelFont"
            onClick={handleUploadClick}
          >
            프로필 선택
            <input
              type="file"
              id="profile-upload"
              className="MiniStatus_input"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="MiniStatus_right">
          <div className="MiniStatus_state">
            <span className="pixelFont">Today is...</span>
            <select className="MiniStatus_select pixelFont">
              <option value="happy">😊 행복</option>
              <option value="joy">🎵 즐거움</option>
              <option value="busy">💼 바쁨</option>
              <option value="sad">🌧️ 슬픔</option>
              <option value="angry">💢 화남</option>
            </select>
          </div>
          <div className="MiniStatus_introduce">
            <span className="pixelFont">소개글</span>
            <textarea
              className="Gulim"
              placeholder="50자 이내로 내 소개를 적어보세요~"
            />
          </div>
          ㄴ
        </div>
      </div>

      <div className="MiniStatus_bottom">
        <div className="MiniStatus_name">
          <span className="pixelFont">미니홈피 이름</span>
          <input
            className="Gulim"
            type="text"
            placeholder={`${user?.name}님의 미니홈피`}
          />
        </div>
      </div>

      <div className="MiniStatus_footer">
        <button className="MiniStatus_btn pixelFont">저장</button>
      </div>
    </MiniStatusStyle>
  );
};

export default MiniStatus;
