import { useRouter } from "next/router";
import { SettingMyInfoStyle } from "./styled";
import { useEffect, useState } from "react";
import { validatePassword, validatePhone } from "@/utils/validation";
import axiosInstance from "@/lib/axios";
import useSignForm from "@/utils/SignUp/useSignForm";
import ShadowModal from "@/components/ShadowModal";

const SettingMyInfo = () => {
  const router = useRouter();

  const {
    password,
    passwordCheck,
    handlePasswordChange,
    handlePasswordCheckChange,
    handlePhoneChange,
    handleDuplicateCheck,
    passwordError,
    passwordCheckError,
    phone,
    phoneError,
    type,
    isOpen,
    setIsOpen,
    message,
  } = useSignForm();

  const isPasswordValid =
    password.trim() !== "" &&
    passwordError === "" &&
    passwordCheck.trim() !== "" &&
    passwordCheckError === "";

  const isPhoneValid =
    phone.trim() !== "" &&
    phoneError.trim() === "" &&
    type === "success" &&
    message.trim() === "사용 가능한 전화번호입니다.";

  const handleSubmit = async (type: "password" | "phone") => {
    try {
      let data;
      if (type === "password") {
        data = { password };
      } else if (type === "phone") {
        // phone에서 하이픈 제거
        const cleanPhone = phone.replace(/-/g, "");
        data = { phone: cleanPhone };
      }

      await axiosInstance.patch(`/users/update/${type}`, data);

      alert(
        `${
          type === "password" ? "비밀번호" : "전화번호"
        }가 성공적으로 변경되었습니다.`
      );

      window.location.reload();
    } catch (err) {
      alert(
        `${type === "password" ? "비밀번호" : "전화번호"} 변경에 실패했습니다.`
      );
    }
  };

  return (
    <SettingMyInfoStyle className="SettingMyInfo_wrap">
      <div className="SettingMyInfo_header">
        <div className="SettingMyInfo_title Gulim">내 정보 수정하기</div>
      </div>

      <div className="SettingMyInfo_body">
        <div
          className="SettingMyInfo_myBase Gulim"
          onClick={() => router.push("https://cyworld.com/")}
        >
          미니홈피 외 싸이월드 서비스의 사생활보호 설정은 마이베이스에서 <br />
          안내 받으시거나, 설정하실 수 있습니다.
          <div className="SettingMyInfo_myBaseText">
            마이베이스 가기 <span className="SettingMyInfo_myBaseIcon">▶</span>
          </div>
        </div>

        {/* 비밀번호 */}
        <span className="pixelFont SettingMyInfo_subTitle">
          <div className="SettingMyInfo_iconText Gulim">🔸비밀번호 변경</div>
          <span className="SettingMyInfo_subText Gulim">
            * 10자 이상, 숫자, 특수문자 포함
          </span>
        </span>

        <div className="SettingMyInfo_password">
          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">비밀번호</div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p className="SettingMyInfo_error">{passwordError}</p>
          </div>

          <div className="SettingMyInfo_underLine"></div>

          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">비밀번호 확인</div>
            <input
              type="password"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
            <p className="SettingMyInfo_error">{passwordCheckError}</p>
          </div>
        </div>

        <div className="SettingMyInfo_btns">
          <button
            disabled={!isPasswordValid}
            onClick={() => handleSubmit("password")}
          >
            확인
          </button>
        </div>

        {/* 전화번호 */}
        <span className="pixelFont SettingMyInfo_subTitle">
          <div className="SettingMyInfo_iconText Gulim">🔸전화번호 변경</div>
        </span>

        <div className="SettingMyInfo_password">
          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">전화번호</div>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={13}
            />
            <p className="SettingMyInfo_error">{phoneError}</p>
          </div>
        </div>

        <div className="SettingMyInfo_btns">
          <button onClick={() => handleDuplicateCheck("phone")}>
            중복검사
          </button>
          <button
            disabled={!isPhoneValid}
            onClick={() => handleSubmit("phone")}
          >
            확인
          </button>
        </div>
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
    </SettingMyInfoStyle>
  );
};

export default SettingMyInfo;
