import Image from "next/image";
import { PaymentSuccessStyled } from "./styled";
import clsx from "clsx";

const ServerDownPage = () => {
  return (
    <PaymentSuccessStyled>
      <div className={clsx("main-wrap-success")}>
        <div className="Success_img">
          <Image src="/dotori/payResult.png" alt="pay Image" fill />
        </div>
        <div className="Success_box">
          <div className="Success_text">
            <h3>점검 중!</h3>
            <p> 현재 점검 중입니다. 잠시 후 다시 이용해주세요!</p>
          </div>
        </div>
      </div>
    </PaymentSuccessStyled>
  );
};

export default ServerDownPage;
