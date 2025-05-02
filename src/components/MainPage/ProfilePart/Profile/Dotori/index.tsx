import React from "react";
import clsx from "clsx";
import { DotoriStyle } from "./styled";
import Image from "next/image";

interface DotoriProps {
  dotori: number;
}

const Dotori = ({ dotori }: DotoriProps) => {
  return (
    <DotoriStyle className={clsx("Profile_infos")}>
      <span className="Profile_newText">
        <div className="Profile_dororiImg">
          <Image src="/dotori.png" alt="dotori" fill />
        </div>
        <span>{dotori}</span>

        <button>충전</button>
      </span>
    </DotoriStyle>
  );
};

export default Dotori;
