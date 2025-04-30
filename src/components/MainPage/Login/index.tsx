import { LoginStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const ProfilePart = () => {
  const [saveEmail, setSaveEmail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (saveEmail) {
        localStorage.setItem("saveEmail", values.email);
      } else {
        localStorage.removeItem("saveEmail");
      }
    },
  });

  useEffect(() => {
    const localEmail = localStorage.getItem("saveEmail");
    if (localEmail) {
      formik.setFieldValue("email", localEmail);
      setSaveEmail(true);
    }
  }, []);

  return (
    <LoginStyle className={clsx("Login_wrap")}>
      <form onSubmit={formik.handleSubmit} className="Login_form">
        <div className="Login_inputs">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit"> &gt; 로그인 </button>
      </form>

      <div className="Login_saveEmail">
        <input
          type="checkbox"
          checked={saveEmail}
          onChange={(e) => setSaveEmail(e.target.checked)}
        />
        <span className="Login_emailFont">이메일 저장</span>
      </div>
    </LoginStyle>
  );
};

export default ProfilePart;
