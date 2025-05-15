import clsx from "clsx";
import { FooterStyled } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <FooterStyled className={clsx("Footer_wrap")}>
      <div className="Footer_logoRow">
        <div className="Footer_logo4">
          <Image src="/logo/logo2.png" alt="logo2" fill />
        </div>
        <div className="Footer_logo3">
          <Image src="/logo/logo1.png" alt="logo1" fill />
        </div>
        <div className="Footer_logo1">
          <Image src="/logo/cyworldLogo.png" alt="Cyworld" fill />
        </div>
        <div className="Footer_logo2">
          <Image src="/logo/nateonLogo.png" alt="nateon" fill />
        </div>
        <div className="Footer_logo2">
          <Image src="/logo/logo3.png" alt="logo3" fill />
        </div>
        <div className="Footer_logo2">
          <Image src="/logo/logo4.png" alt="logo4" fill />
        </div>
      </div>

      <div className="Footer_links">
        <a href="https://github.com/Team-COCOs">회사소개</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">이용약관</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">개인정보처리방침</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">청소년보호정책</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">게시물 운영방침</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">광고문의</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">협력제안</a>
        <span>|</span>
        <a href="https://github.com/Team-COCOs">사이트맵</a>
      </div>

      <div
        className="Footer_links"
        onClick={() => router.push("https://github.com/Team-COCOs")}
      >
        김은주 <span>|</span> 최유진 <span>|</span> 이수정
      </div>

      <div className="Footer_copy">
        Copyright ⓒ <strong>COCOWOLRD</strong>. All rights reserved.
      </div>
    </FooterStyled>
  );
};

export default Footer;
