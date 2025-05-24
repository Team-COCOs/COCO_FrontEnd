import Image from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Swal from "sweetalert2";

interface PayModalProps {
  onClose: () => void;
}

const PayModal = ({ onClose }: PayModalProps) => {
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
          도토리 충전 - Windows Internet...
        </div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="Pay_dotoriImgs">
          <div className="Pay_dotori">
            <div className="Pay_img">
              {!loaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                src="/dotori/dotori10.png"
                alt="dotori image"
                fill
                onLoad={() => setLoaded(true)}
              />
            </div>
            <button
              className="Pay_btn"
              onClick={() => handleTossPayment(1000, 10)}
            >
              10개충전
            </button>
          </div>
          <div className="Pay_dotori">
            <div className="Pay_img">
              {!loaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                src="/dotori/dotori30.png"
                alt="dotori image"
                fill
                onLoad={() => setLoaded(true)}
              />
            </div>
            <button
              className="Pay_btn"
              onClick={() => handleTossPayment(3000, 30)}
            >
              30개충전
            </button>
          </div>
          <div className="Pay_dotori">
            <div className="Pay_img">
              {!loaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                src="/dotori/dotori50.png"
                alt="dotori image"
                fill
                onLoad={() => setLoaded(true)}
              />
            </div>
            <button
              className="Pay_btn"
              onClick={() => handleTossPayment(5000, 50)}
            >
              50개충전
            </button>
          </div>
          <div className="Pay_dotori">
            <div className="Pay_img">
              {!loaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              )}
              <Image
                src="/dotori/dotori100.png"
                alt="dotori image"
                fill
                onLoad={() => setLoaded(true)}
              />
            </div>
            <button
              className="Pay_btn"
              onClick={() => handleTossPayment(9500, 100)}
            >
              100개충전
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayModal;
