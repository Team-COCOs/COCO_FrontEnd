import { SignFormStyled } from "./styled";

import Logo from "@/components/MainPage/Header/Logo";
import ShadowModal from "@/components/ShadowModal";
import useSignForm from "@/utils/SignUp/useSignForm";
import { useEffect } from "react";

const SignPage = () => {
  const form = useSignForm();
  const {
    localPart,
    setLocalPart,
    domain,
    setDomain,
    customDomain,
    setCustomDomain,
    useCustomDomain,
    setUseCustomDomain,
    password,
    passwordCheck,
    name,
    phone,
    gender,
    setGender,
    birth,
    setBirth,
    setBirthYear,
    birthYear,
    birthMonth,
    setBirthMonth,
    birthDay,
    setBirthDay,
    emailError,
    passwordError,
    passwordCheckError,
    phoneError,
    nameError,
    birthError,
    isEmailDuplicate,
    isPhoneDuplicate,
    isOpen,
    setIsOpen,
    setMessage,
    message,
    setType,
    type,
    formik,
    isFormValid,
    handlePasswordChange,
    handlePasswordCheckChange,
    handleNameChange,
    handlePhoneChange,
    handleDuplicateCheck,
    handleBirthYearChange,
    handleBirthMonthChange,
    handleBirthDayChange,
    predefinedDomains,
    isPhoneChecked,
    isEmailChecked,
  } = form;

  const fullEmail = `${localPart}@${useCustomDomain ? customDomain : domain}`;

  useEffect(() => {
    setType("privacy");
    setIsOpen(true);
  }, []);

  return (
    <SignFormStyled>
      <div className="Sign_wrap">
        <Logo type="sign" />

        <b className="Sign_text"> 프로필 입력</b>

        <form
          className="Sign_container"
          onSubmit={(e) => {
            e.preventDefault();

            if (!isFormValid) {
              setMessage("모든 정보를 입력한 후 클릭하여 주세요~");
              setType("error");
              setIsOpen(true);
              return;
            } else if (
              !isEmailChecked ||
              !isPhoneChecked ||
              isEmailDuplicate ||
              isPhoneDuplicate
            ) {
              setMessage("중복 검사 후 클릭하여 주세요~");
              setType("error");
              setIsOpen(true);
              return;
            }

            formik.handleSubmit();
          }}
        >
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
                      disabled={isOpen}
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
                      disabled={!useCustomDomain || isOpen}
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
                      disabled={isOpen}
                    >
                      {predefinedDomains.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                      <option value="custom">직접 입력</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDuplicateCheck("email")}
                  className="Sign_checkBtn"
                  disabled={isOpen}
                >
                  중복확인
                </button>

                <input
                  type="hidden"
                  name="email"
                  className="Sign_input"
                  value={fullEmail}
                  onChange={formik.handleChange}
                  disabled={isOpen}
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
                  disabled={isOpen}
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
                  disabled={isOpen}
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
                  disabled={isOpen}
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
                  disabled={isOpen}
                />
                <button
                  type="button"
                  className="Sign-PhoneCheck"
                  onClick={() => handleDuplicateCheck("phone")}
                  disabled={isOpen}
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
                  disabled={isOpen}
                />
                <p className="mainFont">남자</p>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  className="Sign_radioBtn"
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isOpen}
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
                      disabled={isOpen}
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
                      disabled={isOpen}
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
                      disabled={isOpen}
                    />
                  </div>

                  <div className="Sign_birthRadio">
                    <input
                      type="radio"
                      name="birth"
                      value="solar"
                      checked={birth === "solar"}
                      onChange={(e) => setBirth(e.target.value)}
                      disabled={isOpen}
                    />
                    <p className="mainFont radioWidth">양력</p>
                    <input
                      type="radio"
                      name="birth"
                      value="lunar"
                      className="Sign_radioBtn"
                      onChange={(e) => setBirth(e.target.value)}
                      disabled={isOpen}
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
                // disabled={
                //   !isFormValid ||
                //   !isEmailChecked ||
                //   !isPhoneChecked ||
                //   isEmailDuplicate ||
                //   isPhoneDuplicate
                // }
              >
                가입하기
              </button>
            </div>
          </div>
        </form>

        <ShadowModal
          type={type}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message={message}
        />
      </div>
    </SignFormStyled>
  );
};

export default SignPage;
