import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

interface Props {
  dotori: string;
}

const PaymentSuccess = ({ dotori }: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handlePaymentSuccess = async (dotori: number) => {
    try {
      await axiosInstance.post("/pay/save", { dotori });
      setSuccess(true);
      // 새로고침 시 중복 결제 방지
      // router.replace("/payment/success");
    } catch (error) {
      console.error("결제 정보 저장 실패:", error);
      alert("결제 정보 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (dotori && !success) {
      handlePaymentSuccess(Number(dotori));
    }
  }, [dotori]);

  return (
    <div>
      {success ? (
        <h1>{dotori}개 도토리 충전이 완료되었습니다!</h1>
      ) : (
        <p>충전 처리 중입니다...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
