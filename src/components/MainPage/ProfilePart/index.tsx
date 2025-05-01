import { ProfilePartStyle } from "./styled";
import clsx from "clsx";
import Login from "@/components/MainPage/ProfilePart/Login";
import Advertising from "../Advertising";
import Cookie from "js-cookie";
import Profile from "./Profile";

const ProfilePart = () => {
  const token = Cookie.get("accessToken");
  return (
    <ProfilePartStyle className={clsx("ProfilePart_wrap")}>
      {token ? <Profile /> : <Login />}

      <Advertising type="Advertising4" />

      {/* 광고 */}
      <div className="ProfilePart_eventHeader">
        <b className="ProfilePart_text"> 공지사항 </b>
        <b className="ProfilePart_addText"> ‣ 더보기</b>
      </div>
      <div className="ProfilePart_line"></div>
      <div className="ProfilePart_Texts">
        <b className="ProfilePart_addText">‣ 싸이월드 메인 개편</b>
        <b className="ProfilePart_addText">‣ 새 단장한 미니싸이월드</b>
      </div>

      {/* 이벤트 */}
      <div className="ProfilePart_eventHeader">
        <b className="ProfilePart_text"> 이벤트 </b>
        <b className="ProfilePart_addText"> ‣ 더보기</b>
      </div>
      <div className="ProfilePart_line"></div>
      <div className="ProfilePart_eventImg">
        <Advertising type="Advertising8" />
      </div>
      <div className="ProfilePart_Texts">
        <b className="ProfilePart_addText">‣ 감성 한 스푼, 담아갈래?</b>
        <b className="ProfilePart_addText">
          ‣ 미니홈피 BGM처럼 마음을 채워줄 공간
        </b>
        <b className="ProfilePart_addText">‣ 감성 한 스푼, 담아갈래?</b>
      </div>
    </ProfilePartStyle>
  );
};

export default ProfilePart;
