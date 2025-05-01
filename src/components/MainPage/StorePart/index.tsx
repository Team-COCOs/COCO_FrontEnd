import clsx from "clsx";
import { StorePartStyle } from "./styled";
import Image from "next/image";
import Advertising from "../Advertising";
import TodayMini from "./TodayMini";
import StoreContent from "./StoreContent";

const StorePart = () => {
  return (
    <StorePartStyle className={clsx("StorePartStyle_wrap")}>
      <div className="StorePartStyle_left">
        <Advertising type="Advertising7" />
        <Advertising type="Advertising1" />
        <StoreContent />
      </div>
      <div className="StorePartStyle_right">
        <TodayMini />
        <Advertising type="Advertising5" />
        <Advertising type="Advertising3" />
      </div>
    </StorePartStyle>
  );
};

export default StorePart;
