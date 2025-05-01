import clsx from "clsx";
import { HeaderStyle } from "./styled";
import Logo from "./Logo";
import Search from "./Search";
import Advertising from "../Advertising";

const Header = () => {
  return (
    <HeaderStyle className={clsx("Header_wrap")}>
      <div className="Header_logo">
        <Logo type="header" />
      </div>
      <div className="Header_search">
        <div className="Header_searchPart">
          <Search />
        </div>
        <div className="Header_ad">
          <Advertising type="Advertising6" />
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
