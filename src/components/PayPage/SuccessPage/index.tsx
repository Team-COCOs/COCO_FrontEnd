import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { PaymentSuccessStyled } from "./styled";
import clsx from "clsx";
interface Props {
  dotori: string;
}

const PaymentSuccess = ({ dotori }: Props) => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handlePaymentSuccess = async (dotori: number) => {
    try {
      if (success) return;

      if (dotori) {
        await axiosInstance.post("/pay/save", { dotori });
      }

      setSuccess(true);
      router.replace("/payment/success");
    } catch (error) {
      console.error("결제 정보 저장 실패:", error);
      alert("결제 정보 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (dotori && !success) {
      handlePaymentSuccess(Number(dotori));
    }
  }, [dotori, success]);

  return (
    <PaymentSuccessStyled>
      <div className={clsx("main-wrap-success")}>
        <div className="Success_img">
          <Image src="/dotori/payResult.png" alt="pay Image" fill />
        </div>
        <div className="Success_box">
          <div className="Success_text">
            <h3>도토리 충전 완료!</h3>
            <p> 충전이 완료되었습니다. </p>
          </div>
          <div className="Success_line"></div>
          <div className="Success_btn" onClick={() => router.push("/")}>
            코코월드 가기
          </div>
        </div>
      </div>
    </PaymentSuccessStyled>
  );
};

export default PaymentSuccess;
