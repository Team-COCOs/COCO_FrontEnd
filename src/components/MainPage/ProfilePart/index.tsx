import { ProfilePartStyle } from "./styled";
import clsx from "clsx";
import Login from "@/components/MainPage/ProfilePart/Login";
import Advertising from "../Advertising";
import Cookie from "js-cookie";
import Profile from "./Profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfilePart = () => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링
    const token = Cookie.get("accessToken");
    setHasToken(!!token); // 토큰 존재 여부만 저장
  }, []);

  if (hasToken === null) return null;

  return (
    <ProfilePartStyle className={clsx("ProfilePart_wrap")}>
      {hasToken ? (
        <Profile setHasToken={setHasToken} />
      ) : (
        <Login setHasToken={setHasToken} />
      )}

      <Advertising type="Advertising4" />

      {/* 광고 */}
      <div className="ProfilePart_eventHeader">
        <b className="ProfilePart_text"> 공지사항 </b>
        <a href="https://www.cyworld.com/" target="_blank">
          <b className="ProfilePart_addText">‣ 더보기</b>
        </a>
      </div>
      <div className="ProfilePart_line"></div>
      <div className="ProfilePart_Texts">
        <a href="https://www.cyworld.com/" target="_blank">
          <b className="ProfilePart_addText">‣ 싸이월드 메인 개편</b>
          <br />
          <b className="ProfilePart_addText">‣ 새 단장한 미니싸이월드</b>
        </a>
      </div>

      {/* 이벤트 */}
      <div className="ProfilePart_eventHeader">
        <b className="ProfilePart_text"> 이벤트 </b>
        <a href="https://www.cyworld.com/" target="_blank">
          <b className="ProfilePart_addText">‣ 더보기</b>
        </a>
      </div>
      <div className="ProfilePart_line"></div>
      <div className="ProfilePart_eventImg">
        <Advertising type="Advertising8" />
      </div>
      <a href="https://www.cyworld.com/" target="_blank">
        <div className="ProfilePart_Texts">
          <b className="ProfilePart_addText">‣ 감성 한 스푼, 담아갈래?</b>
          <b className="ProfilePart_addText">
            ‣ 미니홈피 BGM처럼 마음을 채워줄 공간
          </b>
          <b className="ProfilePart_addText">‣ 감성 한 스푼, 담아갈래?</b>
        </div>
      </a>
    </ProfilePartStyle>
  );
};

export default ProfilePart;
