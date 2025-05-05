// ShadowModal.tsx
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import AlertModal from "./AlertModal";
import { ModalStyle } from "./styled";
import PayModal from "./PayModal";

interface ModalProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ShadowModal = ({ type, isOpen, onClose, message }: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    // 이미 shadowRoot가 있으면 재사용, 없으면 새로 attach
    const shadowRoot =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: "open" });

    // 기존 내용 제거
    shadowRoot.innerHTML = "";

    // 스타일 링크 삽입
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/98.css/dist/98.css";
    shadowRoot.appendChild(link);

    // css
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/styles/modalShadow.css";
    shadowRoot.appendChild(style);

    // React 렌더링 영역
    const wrapper = document.createElement("div");
    wrapper.className = "modal-wrapper";
    shadowRoot.appendChild(wrapper);

    const root = ReactDOM.createRoot(wrapper);
    if (type === "error" || type === "success") {
      root.render(
        <AlertModal type={type} onClose={onClose} message={message} />
      );
    } else if (type === "pay") {
      root.render(<PayModal onClose={onClose} />);
    }

    return () => {
      shadowRoot.innerHTML = "";
    };
  }, [isOpen, onClose, message, type]);

  if (!isOpen) return null;

  return <ModalStyle className="Modal_window" ref={containerRef} />;
};

export default ShadowModal;
