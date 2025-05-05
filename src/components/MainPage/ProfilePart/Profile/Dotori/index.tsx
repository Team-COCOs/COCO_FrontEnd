import React, { useState } from "react";
import clsx from "clsx";
import { DotoriStyle } from "./styled";
import Image from "next/image";
import ShadowModal from "@/components/ShadowModal";

interface DotoriProps {
  dotori: number;
}

const Dotori = ({ dotori }: DotoriProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <DotoriStyle className={clsx("Profile_infos")}>
      <span className="Profile_newText">
        <div className="Profile_dororiImg">
          <Image src="/dotori.png" alt="dotori" fill />
        </div>
        <span>{dotori}</span>

        <button onClick={() => openModal()}>충전</button>
      </span>

      <ShadowModal
        type="pay"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message=""
      />
    </DotoriStyle>
  );
};

export default Dotori;
