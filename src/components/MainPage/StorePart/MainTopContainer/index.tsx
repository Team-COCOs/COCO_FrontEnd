import clsx from "clsx";
import { MainTopContainerStyle } from "./styled";
import Image from "next/image";
import Advertising from "../../Advertising";
import TodayMini from "./TodayMini";

const MainTopContainer = () => {
  return (
    <MainTopContainerStyle className={clsx("MainTopContainer_wrap")}>
      <div className="MainTopContainer_left">
        <Advertising type="Advertising7" />
        <Advertising type="Advertising1" />
      </div>
      <div className="MainTopContainer_right">
        <TodayMini />
        <Advertising type="Advertising5" />
      </div>
    </MainTopContainerStyle>
  );
};

export default MainTopContainer;
