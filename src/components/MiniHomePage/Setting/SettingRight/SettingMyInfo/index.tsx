import { useRouter } from "next/router";
import { SettingMyInfoStyle } from "./styled";

const SettingMyInfo = () => {
  const router = useRouter();

  return (
    <SettingMyInfoStyle className="SettingMyInfo_wrap">
      <div className="SettingMyInfo_header">
        <div className="SettingMyInfo_title Gulim">내 정보 수정하기</div>
      </div>

      <div className="SettingMyInfo_body">
        <div
          className="SettingMyInfo_myBase Gulim"
          onClick={() => router.push("https://cyworld.com/")}
        >
          미니홈피 외 싸이월드 서비스의 사생활보호 설정은 마이베이스에서 <br />
          안내 받으시거나, 설정하실 수 있습니다.
          <div className="SettingMyInfo_myBaseText">
            마이베이스 가기 <span className="SettingMyInfo_myBaseIcon">▶</span>
          </div>
        </div>

        <span className="pixelFont SettingMyInfo_subTitle">
          <div className="SettingMyInfo_iconText">
            <span className="SettingMyInfo_icon">🟧</span>비밀번호 변경
          </div>
          <span className="SettingMyInfo_subText">
            * 10자 이상, 숫자, 특수문자 포함
          </span>
        </span>

        <div className="SettingMyInfo_password">
          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">비밀번호</div>
            <p className="SettingMyInfo_error">
              10자 이상, 숫자, 특수문자를 포함하여주세요.
            </p>
            <input type="password"></input>
          </div>

          <div className="SettingMyInfo_underLine"></div>

          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">비밀번호 확인</div>
            <input type="password"></input>
            <p className="SettingMyInfo_error"></p>
          </div>
        </div>

        <div className="SettingMyInfo_btns">
          <button>확인</button>
        </div>

        <span className="pixelFont SettingMyInfo_subTitle">
          <div className="SettingMyInfo_iconText">
            <span className="SettingMyInfo_icon">🟧</span>전화번호 변경
          </div>
        </span>

        <div className="SettingMyInfo_password">
          <div className="SettingMyInfo_textBox">
            <div className="SettingMyInfo_text Gulim">전화번호</div>
            <input type="text"></input>
          </div>
        </div>
        <div className="SettingMyInfo_btns">
          <button>확인</button>
        </div>
      </div>
    </SettingMyInfoStyle>
  );
};

export default SettingMyInfo;
