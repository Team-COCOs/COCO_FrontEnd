import axios from "axios";

export const catchAxiosError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status;
    const message = e.response?.data?.message;

    // 문자열 대비
    const finalMessage = Array.isArray(message) ? message.join("\n") : message;

    if (status === 401) {
      alert(finalMessage);
    } else {
      alert("401 오류!");
    }
  } else {
    alert("오류!");
  }
};
