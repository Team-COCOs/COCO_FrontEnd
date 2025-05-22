import { useFormik } from "formik";
import axios from "axios";
import { validatePassword, validatePhone } from "@/utils/validation";
import { useState } from "react";
import ShadowModal from "@/components/ShadowModal";

const PwFind = () => {
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [userPw, setUserIPw] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const PwFormik = useFormik({
    initialValues: {
      id: "",
      phone: "",
      pw: "",
      pwCheck: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.id) {
        errors.id = "이메일을 입력해주세요.";
      }

      if (!values.phone) {
        errors.phone = "전화번호를 입력해주세요.";
      }

      if (!values.pw) {
        errors.pw = "비밀번호를 입력해주세요.";
      } else if (!validatePassword(values.pw)) {
        errors.pw =
          "비밀번호는 최소 10자 이상, 숫자와 특수문자가 포함되어야 합니다.";
      }

      if (!values.pwCheck) {
        errors.pwCheck = "비밀번호 확인을 입력해주세요.";
      } else if (values.pw !== values.pwCheck) {
        errors.pwCheck = "비밀번호가 일치하지 않습니다.";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        email: values.id,
        phone: values.phone.replace(/-/g, ""),
        newPassword: values.pw,
      };
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, data)
        .then((res) => {
          if (res.data.message) {
            setIsOpen(true);
            setType("error");
            setMessage(res.data.message);
            return;
          }

          setIsOpen(true);
          setType("success");
          setMessage("비밀번호가 변경되었습니다. 메인에서 로그인해주세요.");
          PwFormik.resetForm();
        })
        .catch((e) => {
          setIsOpen(true);
          setType("error");
          setMessage(e.response.data.message);
        });
    },
  });

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    setPhone(value);
    const isValid = validatePhone(value);
    setIsPhoneValid(isValid);
    setPhoneError(isValid ? "" : "전화번호는 13자이어야 합니다.");
  };

  return (
    <div className="InfoFind_wrap">
      <div className="InfoFind_header">비밀번호 찾기</div>
      <form className="InfoFind_container" onSubmit={PwFormik.handleSubmit}>
        <div className="InfoFind_errorDiv">
          <div className="InfoFind_div">
            <div className="mainFont">이메일</div>
            <input
              type="text"
              name="id"
              onChange={PwFormik.handleChange}
              placeholder="이메일을 입력해주세요"
              value={PwFormik.values.id}
            />
          </div>
          <div className="InfoFind_error">{PwFormik.errors.id || ""}</div>
        </div>

        <div className="InfoFind_errorDiv">
          <div className="InfoFind_div">
            <div className="mainFont">전화번호</div>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => {
                handlePhoneChange(e);
                PwFormik.setFieldValue("phone", e.target.value);
              }}
              placeholder="전화번호"
            />
          </div>
          {!isPhoneValid && <div className="InfoFind_error">{phoneError}</div>}
        </div>

        <div className="InfoFind_errorDiv">
          <div className="InfoFind_div">
            <div className="mainFont">새 비밀번호</div>
            <input
              type="password"
              name="pw"
              onChange={PwFormik.handleChange}
              placeholder="새 비밀번호를 입력해주세요"
              value={PwFormik.values.pw}
            />
          </div>
          <div className="InfoFind_error">{PwFormik.errors.pw || ""}</div>
        </div>

        <div className="InfoFind_errorDiv">
          <div className="InfoFind_div">
            <div className="mainFont">새 비밀번호 재확인</div>
            <input
              type="password"
              name="pwCheck"
              placeholder="비밀번호 재확인을 입력해주세요"
              value={PwFormik.values.pwCheck}
              onChange={PwFormik.handleChange}
            />
          </div>
          <div className="InfoFind_error">{PwFormik.errors.pwCheck || ""}</div>
          <div className="InfoFind_error">{userPw}</div>
        </div>

        <button type="submit" disabled={!PwFormik.isValid}>
          비밀번호 변경
        </button>

        <ShadowModal
          type={type}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message={message}
        />
      </form>
    </div>
  );
};

export default PwFind;
