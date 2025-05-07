import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

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
    <div>
      <h1>도토리 충전이 완료되었습니다!</h1>
    </div>
  );
};

export default PaymentSuccess;
