import { EmptyPageStyle } from "./styeld";
import Image from "next/image";

interface EmptyProps {
  type?: string;
}

const EmptyPage = ({ type }: EmptyProps) => {
  return (
    <EmptyPageStyle className="EmptyPage_wrap">
      <div className={`Empty_img ${type || ""}`}>
        <Image src="/dotori/emptyImg.png" alt="empty image" fill />
      </div>
    </EmptyPageStyle>
  );
};

export default EmptyPage;
