import { SignFormStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/utils/validation";
import Logo from "@/components/MainPage/Header/Logo";

const SignPage = () => {
  const router = useRouter();
  // 이메일
  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [email, setEmail] = useState("");

  const fullEmail = `${localPart}@${useCustomDomain ? customDomain : domain}`;

  // 그 외
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("man");
  const [birth, setBirth] = useState("solar");

  // 유효성 체크 상태 변수
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  // 에러 메시지 상태 변수
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  // 중복 여부 상태 변수
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
    setEmailError(isValid ? "" : "유효한 이메일을 입력해주세요.");
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    setIsPasswordValid(isValid);
    setPasswordError(
      isValid
        ? ""
        : "비밀번호는 최소한 10자 이상, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  const handlePasswordCheckChange = (e: any) => {
    const value = e.target.value;
    setPasswordCheck(value);
    const isValid = value === password;
    setIsPasswordCheckValid(isValid);
    setPasswordCheckError(isValid ? "" : "비밀번호가 일치하지 않습니다.");
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    const isValid = validateName(value);
    setIsNameValid(isValid);
    setNameError(isValid ? "" : "이름을 입력해주세요.");
  };

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
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

  // 중복 검사 함수 -> email, phone 중복 확인해서 중복이면 exists = true, 중복이 아니면 exists = false
  const handleDuplicateCheck = async (type: "email" | "phone") => {
    try {
      const data = type === "email" ? { email } : { phone };

      const response = await axios.post(
        `http://15.164.52.122/auth/check/${type}`,
        data
      );
      if (response.data.exists) {
        if (type === "email") {
          setIsEmailDuplicate(true);
          setEmailError("이미 사용된 이메일입니다.");
        } else {
          setIsPhoneDuplicate(true);
          setPhoneError("이미 사용된 전화번호입니다.");
        }
      } else {
        if (type === "email") {
          setIsEmailDuplicate(false);
        } else {
          setIsPhoneDuplicate(false);
        }
        alert({
          centered: true,
          content: `사용 가능한 ${type}입니다.`,
        });
      }
    } catch (error) {
      console.error(`${type} 중복 검사 실패:`, error);
    }
  };

  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  // 버튼 활성화 여부 계산
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordCheckValid &&
    isPhoneValid &&
    isNameValid;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
      };
      axios
        .post("http://15.164.52.122/auth/signup", data)
        .then((response) => {
          const userId = response.data.email;

          return axios.post("http://15.164.52.122/users/userCheck", {
            user_id: userId,
          });
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.error("회원가입 또는 이용약관 저장 실패:", error);
        });
    },
  });
  return (
    <SignFormStyled className={clsx("Sign_wrap")}>
      <Logo type="sign" />

      <b className="Sign_text"> 프로필 입력</b>

      <form className="Sign_container" onSubmit={formik.handleSubmit}>
        <div className="Sign_line"></div>

        <div className="Sign_form">
          <div className="Sign_errorDiv">
            <div className="Sign_div">
              <div className="Sign_birthDiv">
                <label htmlFor="email" className="mainFont">
                  이메일 아이디
                </label>
                <div className="Sign_inputs">
                  <input
                    type="text"
                    className="Sign_input"
                    placeholder="이메일"
                    value={localPart}
                    onChange={(e) => setLocalPart(e.target.value)}
                  />
                  <span>@</span>
                  <input
                    type="text"
                    className="Sign_input"
                    value={useCustomDomain ? customDomain : domain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    onBlur={() => {
                      if (!customDomain) setUseCustomDomain(false);
                    }}
                    disabled={!useCustomDomain}
                  />
                  <select
                    className="Sign_input"
                    value={useCustomDomain ? "custom" : domain}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        setUseCustomDomain(true);
                        setCustomDomain("");
                      } else {
                        setUseCustomDomain(false);
                        setDomain(e.target.value);
                      }
                    }}
                  >
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="custom">직접입력</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDuplicateCheck("email")}
                className="Sign_checkBtn"
              >
                중복확인
              </button>

              {/* Formik 값 업데이트 */}
              <input
                type="hidden"
                name="email"
                className="Sign_input"
                value={fullEmail}
                onChange={formik.handleChange}
              />
            </div>
            <div className="Sign_error">{emailError}</div>
          </div>

          <div className="Sign_errorDiv">
            <div className="Sign_div">
              <label htmlFor="password" className="mainFont">
                비밀번호
              </label>
              <input
                className="Sign_input longInput"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  handlePasswordChange(e);
                  formik.handleChange(e);
                }}
                placeholder="비밀번호"
              />
            </div>
            <div className="Sign_error">{passwordError}</div>
          </div>

          <div className="Sign_errorDiv">
            <div className="Sign_div">
              <label htmlFor="passwordCheck" className="mainFont">
                비밀번호 확인
              </label>
              <input
                className="Sign_input longInput"
                type="password"
                id="passwordCheck"
                value={passwordCheck}
                onChange={(e) => {
                  formik.handleChange(e);
                  handlePasswordCheckChange(e);
                }}
                placeholder="비밀번호 확인"
              />
            </div>
            <div className="Sign_error">{passwordCheckError}</div>
          </div>

          <div className="Sign_errorDiv">
            <div className="Sign_div">
              <label htmlFor="name" className="mainFont">
                이름
              </label>
              <input
                className="Sign_input longInput"
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleNameChange(e);
                }}
                placeholder="이름"
              />
              <div className="Sign_error">{nameError}</div>
            </div>
          </div>

          <div className="Sign_errorDiv">
            <div className="Sign_div">
              <label htmlFor="phone" className="mainFont">
                전화번호
              </label>
              <input
                className="Sign_input phoneInput"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => {
                  formik.handleChange(e);
                  handlePhoneChange(e);
                }}
                placeholder="전화번호 (010-0000-0000)"
              />
              <button
                className="Sign-PhoneCheck"
                onClick={() => handleDuplicateCheck("phone")}
              >
                전화번호 중복 확인
              </button>
            </div>
            <div className="Sign_error">{phoneError}</div>
          </div>

          <div className="Sign_div">
            <div className="Sign_birthRadio">
              <label htmlFor="gender" className="mainFont">
                성별
              </label>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={gender === "man"}
                onChange={(e) => setGender(e.target.value)}
              />
              <p className="mainFont">남자</p>
              <input
                type="radio"
                name="gender"
                value="woman"
                className="Sign_radioBtn"
                onChange={(e) => setGender(e.target.value)}
              />
              <p className="mainFont">여자</p>
            </div>
          </div>

          <div className="Sign_div">
            <div className="Sign_birthDiv">
              <label htmlFor="birth" className="mainFont">
                생년월일
              </label>
              <div className="Sign_inputs">
                <input
                  type="number"
                  className="Sign_input"
                  placeholder="연도"
                />
                <input type="number" className="Sign_input" placeholder="월" />
                <input type="number" className="Sign_input" placeholder="일" />
              </div>
            </div>

            <div className="Sign_birthRadio">
              <input
                type="radio"
                name="birth"
                value="solar"
                checked={birth === "solar"}
                onChange={(e) => setBirth(e.target.value)}
              />
              <p className="mainFont radioWidth">양력</p>
              <input
                type="radio"
                name="birth"
                value="lunar"
                className="Sign_radioBtn"
                onChange={(e) => setBirth(e.target.value)}
              />
              <p className="mainFont radioWidth">음력</p>
            </div>
          </div>

          <div className="Sign_div Sign_center">
            <button
              className="Sign-PhoneCheck"
              type="submit"
              disabled={!isFormValid || isEmailDuplicate || isPhoneDuplicate}
            >
              가입하기
            </button>
          </div>
        </div>
      </form>
    </SignFormStyled>
  );
};

export default SignPage;
