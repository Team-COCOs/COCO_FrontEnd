import { EmptyPageStyle } from "./styeld";
import Image from "next/image";

const EmptyPage = () => {
  return (
    <EmptyPageStyle className="EmptyPage_wrap">
      <div className="Empty_img">
        <Image src="/dotori/emptyImg.png" alt="empty image" fill />
      </div>
    </EmptyPageStyle>
  );
};

export default EmptyPage;
