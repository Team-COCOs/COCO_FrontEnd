import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import {
  validateName,
  validatePassword,
  validatePhone,
} from "@/utils/validation";

const useSignForm = () => {
  const router = useRouter();

  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("cocoworld.com");
  const [customDomain, setCustomDomain] = useState("");
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [email, setEmail] = useState("");

  const fullEmail = `${localPart}@${useCustomDomain ? customDomain : domain}`;

  const predefinedDomains = ["cocoworld.com", "naver.com", "gmail.com"];

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("man");
  const [birth, setBirth] = useState("solar");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isBirthValid, setIsBirthValid] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthError, setBirthError] = useState("");

  // 중복 여부
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  // 중복 체크 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

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
      setBirthError("");
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

  const handleDuplicateCheck = async (type: "email" | "phone") => {
    if (type === "email" && !localPart) {
      setIsOpen(true);
      setType("error");
      setMessage("이메일을 입력해주세요.");
      return;
    }

    if (type === "phone" && !phone) {
      setIsOpen(true);
      setType("error");
      setMessage("전화번호를 입력해주세요.");
      return;
    }

    try {
      const cleanedPhone = phone.replace(/[^\d]/g, "");
      const data = type === "email" ? { email } : { phone: cleanedPhone };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check/${type}`,
        data
      );

      if (type === "email") setIsEmailChecked(true);
      else setIsPhoneChecked(true);

      if (response.data.exists) {
        if (type === "email") {
          setIsEmailDuplicate(true);
          setType("error");
          setEmailError("이미 사용된 이메일입니다.");
        } else {
          setIsPhoneDuplicate(true);
          setType("error");
          setPhoneError("이미 사용된 전화번호입니다.");
        }
      } else {
        if (type === "email") {
          setIsEmailDuplicate(false);
          setEmailError("");
        } else {
          setIsPhoneDuplicate(false);
          setPhoneError("");
        }

        setIsOpen(true);
        setType("success");
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
    if (token) router.push("/");
  }, [token]);

  useEffect(() => {
    formik.setFieldValue("email", fullEmail);
    setEmail(fullEmail);
  }, [localPart, domain, customDomain, useCustomDomain]);

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
      const cleanedPhone = values.phone.replace(/[^\d]/g, "").slice(0, 11);
      const birthday = `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`;

      console.log(cleanedPhone);

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

  return {
    localPart,
    setLocalPart,
    domain,
    setDomain,
    customDomain,
    setCustomDomain,
    useCustomDomain,
    setUseCustomDomain,
    email,
    setEmail,
    predefinedDomains,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    name,
    setName,
    phone,
    setPhone,
    gender,
    setGender,
    birth,
    setBirth,
    birthYear,
    setBirthYear,
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
    message,
    type,
    setType,
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
    isEmailChecked,
    isPhoneChecked,
  };
};

export default useSignForm;
