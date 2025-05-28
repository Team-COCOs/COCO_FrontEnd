import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

// 👇 axiosInstance.ts 파일 맨 위에 추가
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수 사용
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

// 요청 인터셉터에서 `access_token`을 동적으로 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 통과
  async (error) => {
    const originalRequest = error.config;

    // access_token 만료로 401 에러가 발생하고, 아직 재시도 안한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // 👇 리프레시 진행 중이면 큐에 추가하고 기다림
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      // 👇 리프레시 시작
      isRefreshing = true;

      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
          Router.push("/");
          return Promise.reject(error);
        }

        // refresh_token을 서버로 보내서 access_token을 갱신
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${refreshToken}`, // refresh_token을 Authorization 헤더에 포함시켜서 요청
          },
        });

        // 새로 발급받은 access_token을 쿠키에 저장
        const newAccessToken = response.data.access_token;

        if (!newAccessToken) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Router.push("/");
          processQueue(new Error("No new token"), null);
          return Promise.reject(error);
        }

        Cookies.set("accessToken", newAccessToken, {
          expires: 1 / 24,
          path: "/",
          sameSite: "Strict",
        });
        processQueue(null, newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 원래 요청을 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Router.push("/");
        processQueue(refreshError, null); // 👈 추가
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 👈 꼭 필요
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
