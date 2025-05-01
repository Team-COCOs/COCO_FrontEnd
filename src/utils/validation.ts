// 유효성 검사 함수들

export const validatePassword = (password: string) => {
  const isLengthValid = password.length >= 10;
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password); // 특수문자 확인
  return isLengthValid && hasLowerCase && hasNumber && hasSpecialChar;
};

export const validatePhone = (phone: string) => {
  return phone.length === 13; // 전화번호 길이 체크 (xxx-xxxx-xxxx 형태)
};

export const validateName = (name: string) => {
  return name.length > 1;
};
