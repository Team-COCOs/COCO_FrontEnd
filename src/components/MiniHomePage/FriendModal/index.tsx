import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import AddFriendModal from "./AddFriendModal";
import { FriendModalStyle } from "./styled";
import axios from "axios";
import { ModalProvider, useModal } from "@/context/ModalContext";
import ShadowModal from "@/components/ShadowModal";
interface ModalProps {
  isType: string;
  isModalOpen: boolean;
  onClose: () => void;
  requesterName: string;
  receiverName: string;
  receiverUserId: string;
  requesterImage: string;
  requesterGender: string;
}

const FriendModal = ({
  isType,
  isModalOpen,
  onClose,
  requesterName,
  receiverName,
  receiverUserId,
  requesterImage,
  requesterGender,
}: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { openModal, closeModal, message, type, isOpen } = useModal();

  useEffect(() => {
    if (!isModalOpen || !containerRef.current) return;

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
    if (isType === "add") {
      root.render(
        <AddFriendModal
          onClose={onClose}
          requesterName={requesterName}
          receiverName={receiverName}
          receiverUserId={receiverUserId}
          requesterImage={requesterImage}
          requesterGender={requesterGender}
          openModal={openModal}
        />
      );
    }

    return () => {
      shadowRoot.innerHTML = "";
    };
  }, [isModalOpen, onClose, isType]);

  if (!isModalOpen) return null;

  return <FriendModalStyle className="FriendModal_window" ref={containerRef} />;
};

export default FriendModal;
