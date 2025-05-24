import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import AlertModal from "./AlertModal";
import { ModalStyle } from "./styled";
import PayModal from "./PayModal";
import ProfileModal from "./ProfileModal";
import FriendModal from "./ProfileModal/FriendModal";
import ConfirmModal from "./ConfirmModal";
import { ModalProvider, useModal } from "@/context/ModalContext";

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
    if (!isOpen || !containerRef.current) return;

    const shadowRoot =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = "";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/98.css/dist/98.css";
    shadowRoot.appendChild(link);

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/styles/modalShadow.css";
    shadowRoot.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "modal-wrapper";
    shadowRoot.appendChild(wrapper);

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
      shadowRoot.innerHTML = "";
    };
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
