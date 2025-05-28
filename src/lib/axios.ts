import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수 사용
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

type RefreshResponse = {
  accessToken: string;
};

// 요청 인터셉터에서 `accessToken`을 동적으로 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 통과
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료로 401 에러가 발생하고, 아직 재시도 안한 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/check-temp-token")
    ) {
      originalRequest._retry = true;
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
          return Promise.reject(error);
        }

        // refresh_token을 서버로 보내서 accessToken을 갱신
        const response = await axios.get<RefreshResponse>(
          `${baseURL}/auth/refresh`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${refreshToken}`, // refresh_token을 Authorization 헤더에 포함시켜서 요청
            },
          }
        );

        // 새로 발급받은 accessToken을 쿠키에 저장
        const newAccessToken = response.data.accessToken;

        if (!newAccessToken) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Router.push("/");
          return Promise.reject(error);
        }

        Cookies.set("accessToken", newAccessToken, {
          expires: 1 / 24,
          path: "/",
          sameSite: "Strict",
        });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 원래 요청을 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        const tempToken = Cookies.get("temp_accessToken");

        if (tempToken) {
          Router.push("/phone");
        } else {
          Router.push("/");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
