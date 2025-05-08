import { useRouter } from "next/router";
import React from "react";
import { PaymentFailStyled } from "./styled";
import { Button, Result } from "antd";
import Image from "next/image";

const PaymentFail = () => {
  const router = useRouter();

  return (
    <PaymentFailStyled className="main-wrap-error">
      <div className="Fail_img">
        <Image src="/dotori/payResult.png" alt="pay Image" fill />
      </div>
      <div className="Fail_box">
        <div className="Fail_text">
          <h3>도토리 충전 실패!</h3>
          <p> 다시 시도해 주세요. </p>
        </div>
        <div className="Fail_line"></div>
        <div className="Fail_btn" onClick={() => router.push("/")}>
          코코월드 가기
        </div>
      </div>
    </PaymentFailStyled>
  );
};

export default PaymentFail;
