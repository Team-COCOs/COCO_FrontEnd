import Image from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Swal from "sweetalert2";

interface PayModalProps {
  onClose: () => void;
}

const PrivacyModal = ({ onClose }: PayModalProps) => {
  const handleTossPayment = async (point: number, dotori: number) => {
    try {
      const amount = point;
      const orderId = `order-${Date.now()}`;
      const orderName = "도토리 충전";

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pay/tossClientKey`
      );
      const tossClientKey = res.data.tossClientKey;
      const toss = await loadTossPayments(tossClientKey); // 토스 sdk

      toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        successUrl: `http://34.236.72.45/payment/success?&dotori=${dotori}`,
        failUrl: `http://34.236.72.45/payment/fail`,
      });
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      Swal.fire({
        title: "결제를 진행할 수 없습니다.",
        icon: "error",
      });
    }
  };

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text pixelFont">
          개인정보처리방침 - Windows Internet...
        </div>
        {/* <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div> */}
      </div>
      <div className="window-body privacy_body">
        <div className="privacy_wrap pixelFont">
          <p className="FontMid">코코월드에 오신 걸 환영합니다 😊 </p>
          <p className="FontMid">여러분의 미니홈피처럼, </p>
          <p className="FontMid"> 개인정보도 소중하게 지켜드릴게요.</p>
          <div className="empty_font"></div>
          <p>📌 수집하는 항목</p>
          <p className="FontSmall">- 이름, 이메일, 비밀번호, 생년월일</p>
          <p className="FontSmall">
            - 프로필 사진, 닉네임, 접속기록 등 서비스 이용기록
          </p>
          <br />
          <p>📌 수집 목적</p>
          <p className="FontSmall">- 회원 가입 및 서비스 이용 관리</p>
          <p className="FontSmall">- 콘텐츠 제공, 맞춤형 서비스 추천</p>
          <p className="FontSmall">- 부정 이용 방지, 법적 의무 준수</p>
          <br />
          <p>📌 보관 기간</p>
          <p className="FontSmall">
            - 관련 법령에 따라 일정 기간 보관될 수 있음
          </p>
          <br />
          <p>📌 제3자 제공 및 위탁</p>
          <p className="FontSmall">
            - 싸이월드는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
          </p>
        </div>

        <br />
        <div className="privacy_foot">
          <input type="radio" id="agree" onClick={onClose} />
          <label htmlFor="agree" className="pixelFont">
            동의하고 가입하기
          </label>
        </div>
        <br />
      </div>
    </>
  );
};

export default PrivacyModal;
