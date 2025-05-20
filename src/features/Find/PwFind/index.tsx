import { useFormik } from "formik";
import axios from "axios";
import { validatePassword } from "@/utils/validation";
import { useRouter } from "next/router";
import { useState } from "react";
import ShadowModal from "@/components/ShadowModal";

const PwFind = () => {
  const [userPw, setUserIPw] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const PwFormik = useFormik({
    initialValues: {
      id: "",
      pw: "",
      pwCheck: "",
    },
    validate: (values) => {
      const errors: any = {};
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
        newPassword: values.pw,
      };
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, data)
        .then(() => {
          setIsOpen(true);
          setType("success");
          setMessage("비밀번호가 변경되었습니다. 메인에서 로그인해주세요.");
          PwFormik.resetForm();
        })
        .catch((e) => {
          if (e.response.status === 404) {
            setIsOpen(true);
            setType("error");
            setMessage(e.response.data.message);
          }
        });
    },
  });

  return (
    <div className="InfoFind_wrap">
      <div className="InfoFind_header">비밀번호 찾기</div>
      <form className="InfoFind_container" onSubmit={PwFormik.handleSubmit}>
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
