import clsx from "clsx";
import { HeaderStyle } from "./styled";
import Logo from "../Logo";

const Header = () => {
  return (
    <HeaderStyle className={clsx("Header_wrap")}>
      <div className="Header_logo">
        <Logo />
      </div>
      <div className="Header_search"></div>
    </HeaderStyle>
  );
};

export default Header;
