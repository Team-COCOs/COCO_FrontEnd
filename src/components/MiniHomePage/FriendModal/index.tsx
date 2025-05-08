// ShadowModal.tsx
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import AddFriendModal from "./AddFriendModal";
import { FriendModalStyle } from "./styled";

interface ModalProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  requesterName: string;
  receiverName: string;
}

const FriendModal = ({
  type,
  isOpen,
  onClose,
  requesterName,
  receiverName,
}: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(receiverName, "receiverName");
  console.log(requesterName, "requesterName");
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
    style.href = "/styles/friendShadow.css";
    shadowRoot.appendChild(style);

    // React 렌더링 영역
    const wrapper = document.createElement("div");
    wrapper.className = "modal-wrapper";
    shadowRoot.appendChild(wrapper);

    const root = ReactDOM.createRoot(wrapper);
    if (type === "add") {
      root.render(
        <AddFriendModal
          onClose={onClose}
          requesterName={requesterName}
          receiverName={receiverName}
        />
      );
    }

    return () => {
      shadowRoot.innerHTML = "";
    };
  }, [isOpen, onClose, type]);

  if (!isOpen) return null;

  return <FriendModalStyle className="FriendModal_window" ref={containerRef} />;
};

export default FriendModal;
