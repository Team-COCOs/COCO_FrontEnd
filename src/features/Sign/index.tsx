import { SignFormStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  validateName,
  validatePassword,
  validatePhone,
} from "@/utils/validation";
import Logo from "@/components/MainPage/Header/Logo";
import ShadowModal from "@/components/ShadowModal";

const SignPage = () => {
  const router = useRouter();
  // 이메일
  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("cocoworld.com");
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

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  // 유효성 체크 상태 변수
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isBirthValid, setIsBirthValid] = useState(false);

  // 에러 메시지 상태 변수
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthError, setBirthError] = useState("");

  // 중복 여부 상태 변수
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  // 커스텀 모달
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

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

  const validateBirth = (yearStr: string, monthStr: string, dayStr: string) => {
    const year = Number(yearStr.trim());
    const month = Number(monthStr.trim());
    const day = Number(dayStr.trim());

    if (!yearStr || !monthStr || !dayStr) {
      setBirthError(""); // 아직 다 안 입력했으면 에러 안 띄움
      return;
    }

    const isValid =
      !isNaN(year) &&
      !isNaN(month) &&
      !isNaN(day) &&
      year >= 1900 &&
      year <= 2025 &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31;

    setBirthError(isValid ? "" : "올바른 생년월일을 입력해주세요.");
    if (isValid) setIsBirthValid(true);
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthYear(value);
    validateBirth(value, birthMonth, birthDay);
  };

  const handleBirthMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthMonth(value);
    validateBirth(birthYear, value, birthDay);
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDay(value);
    validateBirth(birthYear, birthMonth, value);
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
      const cleanedPhone = phone.replace(/[^\d]/g, "");

      const data = type === "email" ? { email } : { phone: cleanedPhone };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check/${type}`,
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

        setIsOpen(true);
        setMessage(
          `사용 가능한 ${type === "email" ? "이메일" : "전화번호"}입니다.`
        );
        setEmailError("");
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

  useEffect(() => {
    formik.setFieldValue("email", fullEmail);
    setEmail(fullEmail);
  }, [localPart, domain, customDomain, useCustomDomain]);

  // 버튼 활성화 여부 계산
  const isFormValid =
    isPasswordValid &&
    isPasswordCheckValid &&
    isPhoneValid &&
    isNameValid &&
    isBirthValid;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
      gender: "",
      birth_date: "",
    },
    onSubmit: (values) => {
      const cleanedPhone = values.phone.replace(/[^\d]/g, "");

      const birthday = `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`;

      const data = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: cleanedPhone,
        gender,
        birthday,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, data)
        .then(() => router.push("/"))
        .catch((error) => console.error("회원가입 실패:", error));
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
                    <option value="cocoworld.com">cocoworld.com</option>
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
            </div>
            <div className="Sign_error">{nameError}</div>
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
                placeholder="전화번호"
              />
              <button
                type="button"
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

          <div className="Sign_errorDiv">
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
                    value={birthYear}
                    onChange={(e) => {
                      setBirthYear(e.target.value);
                      handleBirthYearChange(e);
                    }}
                  />
                  <input
                    type="number"
                    className="Sign_input"
                    placeholder="월"
                    value={birthMonth}
                    onChange={(e) => {
                      setBirthMonth(e.target.value);
                      handleBirthMonthChange(e);
                    }}
                  />
                  <input
                    type="number"
                    className="Sign_input"
                    placeholder="일"
                    value={birthDay}
                    onChange={(e) => {
                      setBirthDay(e.target.value);
                      handleBirthDayChange(e);
                    }}
                  />
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
            </div>

            <div className="Sign_error">{birthError}</div>
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

      <ShadowModal
        type="success"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
    </SignFormStyled>
  );
};

export default SignPage;
