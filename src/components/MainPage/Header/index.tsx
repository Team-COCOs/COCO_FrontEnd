import clsx from "clsx";
import { HeaderStyle } from "./styled";
import Logo from "../Logo";
import Search from "../Search";

const Header = () => {
  return (
    <HeaderStyle className={clsx("Header_wrap")}>
      <div className="Header_logo">
        <Logo />
      </div>
      <div className="Header_search">
        <div className="Header_searchPart">
          <Search />
        </div>
        {/* 광고 */}
      </div>
    </HeaderStyle>
  );
};

export default Header;
