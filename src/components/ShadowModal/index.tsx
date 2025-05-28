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
    let wrapper: HTMLElement | null = null;

    if (!shadowRoot) {
      shadowRoot = containerRef.current.attachShadow({ mode: "open" });

      const link98 = document.createElement("link");
      link98.rel = "stylesheet";
      link98.href = "/styles/98.css/dist/98.css";

      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "/styles/modalShadow.css";

      // wrapper 생성
      wrapper = document.createElement("div");
      wrapper.className = "modal-wrapper";

      shadowRoot.appendChild(link98);
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(wrapper);
    } else {
      wrapper = shadowRoot.querySelector(".modal-wrapper");
    }

    if (isOpen && wrapper) {
      const waitForCSS = Promise.all([
        new Promise((res) => {
          const link1 = shadowRoot!.querySelector(
            'link[href="/styles/98.css/dist/98.css"]'
          ) as HTMLLinkElement;
          if (link1.sheet) res(null);
          else link1.onload = () => res(null);
        }),
        new Promise((res) => {
          const link2 = shadowRoot!.querySelector(
            'link[href="/styles/modalShadow.css"]'
          ) as HTMLLinkElement;
          if (link2.sheet) res(null);
          else link2.onload = () => res(null);
        }),
      ]);

      waitForCSS.then(() => {
        const root = ReactDOM.createRoot(wrapper!);

        switch (type) {
          case "error":
          case "success":
            root.render(
              <AlertModal type={type} onClose={onClose} message={message!} />
            );
            break;
          case "pay":
            root.render(<PayModal onClose={onClose} />);
            break;
          case "friendReq":
            root.render(
              <ModalProvider>
                <FriendModal
                  onClose={onClose}
                  data={data}
                  userName={userName!}
                />
              </ModalProvider>
            );
            break;
          case "confirm":
            root.render(
              <ConfirmModal
                onClose={onClose}
                onConfirm={onConfirm!}
                message={message!}
              />
            );
            break;
          case "privacy":
            root.render(<PrivacyModal onClose={onClose} />);
            break;
          default:
            root.render(
              <ProfileModal
                onClose={onClose}
                data={data}
                type={type}
                userName={userName!}
              />
            );
            break;
        }

        return () => root.unmount();
      });
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
