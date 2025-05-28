import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import AlertModal from "./AlertModal";
import { ModalStyle } from "./styled";
import PayModal from "./PayModal";
import ProfileModal from "./ProfileModal";
import FriendModal from "./ProfileModal/FriendModal";
import ConfirmModal from "./ConfirmModal";
import { ModalProvider, useModal } from "@/context/ModalContext";
import PrivacyModal from "./PrivacyModal";

// context, props 모두 가능하게
interface ModalProps {
  type?: string;
  isOpen?: boolean;
  onClose?: () => void;
  message?: string;
  data?: any;
  userName?: string;
  onConfirm?: () => void | Promise<void>;
  useContextOnly?: boolean;
}

const ShadowModal = (props: ModalProps) => {
  const useContext = props.useContextOnly || props.type === undefined;

  const {
    type: ctxType,
    isOpen: ctxOpen,
    message: ctxMsg,
    data: ctxData,
    userName: ctxName,
    onConfirm: ctxConfirm,
    closeModal,
  } = useContext ? useModal() : ({} as any);

  const type = useContext ? ctxType : props.type!;
  const isOpen = useContext ? ctxOpen : props.isOpen!;
  const onClose = useContext ? closeModal : props.onClose!;
  const message = useContext ? ctxMsg : props.message;
  const data = useContext ? ctxData : props.data;
  const userName = useContext ? ctxName : props.userName;
  const onConfirm = useContext ? ctxConfirm : props.onConfirm;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let shadowRoot = containerRef.current.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = containerRef.current.attachShadow({ mode: "open" });

      // CSS 링크 한 번만 추가
      const link98 = document.createElement("link");
      link98.rel = "stylesheet";
      link98.href = "/styles/98.css/dist/98.css";
      shadowRoot.appendChild(link98);

      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "/styles/modalShadow.css";
      shadowRoot.appendChild(style);

      // 모달 감싸는 div 한 번 생성
      const wrapper = document.createElement("div");
      wrapper.className = "modal-wrapper";
      shadowRoot.appendChild(wrapper);
    }

    // 모달 열려있을 때만 내부 내용만 갱신 (wrapper 내부)
    if (isOpen) {
      const wrapper = shadowRoot.querySelector(".modal-wrapper")!;
      const root = ReactDOM.createRoot(wrapper);

      if (type === "error" || type === "success") {
        root.render(
          <AlertModal type={type} onClose={onClose} message={message!} />
        );
      } else if (type === "pay") {
        root.render(<PayModal onClose={onClose} />);
      } else if (type === "friendReq") {
        root.render(
          <ModalProvider>
            <FriendModal onClose={onClose} data={data} userName={userName!} />
          </ModalProvider>
        );
      } else if (type === "confirm") {
        root.render(
          <ConfirmModal
            onClose={onClose}
            onConfirm={onConfirm!}
            message={message!}
          />
        );
      } else if (type === "privacy") {
        root.render(<PrivacyModal onClose={onClose} />);
      } else {
        root.render(
          <ProfileModal
            onClose={onClose}
            data={data}
            type={type}
            userName={userName!}
          />
        );
      }

      return () => {
        root.unmount();
      };
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <ModalStyle
      className={
        type === "friendReq"
          ? "friend_window"
          : type === "error" || type === "success"
          ? "Alert_window"
          : "Modal_window"
      }
      ref={containerRef}
    />
  );
};

export default ShadowModal;
