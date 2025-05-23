import { useAuth } from "@/context/AuthContext";
import { WriteInputStyle } from "./styled";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import ShadowModal from "@/components/ShadowModal";

interface GuestWriteProps {
  onSuccess: () => void;
}

const WriteInput = ({ onSuccess }: GuestWriteProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const miniProfile = !user?.profile_image
    ? user?.gender === "woman"
      ? "/avatarImg/woman_avatar1.png"
      : "/avatarImg/man_avatar1.png"
    : user?.profile_image;

  // 저장
  const handleSubmit = async () => {
    if (!content.trim()) {
      setIsOpen(true);
      return;
    }

    try {
      const res = await axiosInstance.post("/guestbooks", {
        content,
        status: isSecret ? "private" : "public",
        authorId: user?.id,
        miniUserId: id,
      });

      console.log("방명록 등록 성공:", res.data);
      setContent(""); // 초기화
      setIsSecret(false); // 초기화
      onSuccess();
    } catch (err) {
      console.error("방명록 등록 실패:", err);
    }
  };

  return (
    <WriteInputStyle className="WtireInput_wrap">
      <div className="WriteInput_left">
        <img
          src={miniProfile}
          alt="profile"
          className={`WriteInput_img 
            ${
              miniProfile.endsWith(".png") &&
              !miniProfile.includes("man") &&
              "WriteInput_png"
            }  
            ${miniProfile.includes("man") && "WriteInput_man"}`}
        />

        <div className="WriteInput_profile">
          <p className="Gulim">{user?.name}</p>
        </div>
      </div>
      <div className="WriteInput_right">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="WriteInput_btns">
          <div className="WriteInput_boxBtn">
            <input
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
            />
            <span className="Gulim">비밀로 하기</span>
          </div>
          <button className="Gulim" onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
      <ShadowModal
        type="error"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="내용을 입력해주세요."
      ></ShadowModal>
    </WriteInputStyle>
  );
};

export default WriteInput;
