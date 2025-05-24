import { createContext, useContext, useState, ReactNode } from "react";

type ModalType =
  | "error"
  | "success"
  | "pay"
  | "friendReq"
  | "confirm"
  | "profile";

interface ModalContextType {
  type: ModalType | "";
  isOpen: boolean;
  message?: string;
  data?: any;
  userName?: string;
  onConfirm?: () => void | Promise<void>;
  openModal: (
    type: ModalType,
    options?: {
      message?: string;
      data?: any;
      userName?: string;
      onConfirm?: () => void | Promise<void>;
    }
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType | "">("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [data, setData] = useState<any>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [onConfirm, setOnConfirm] = useState<
    (() => void | Promise<void>) | undefined
  >();

  const openModal: ModalContextType["openModal"] = (type, options = {}) => {
    setType(type);
    setMessage(options.message);
    setData(options.data);
    setUserName(options.userName);
    setOnConfirm(options.onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage(undefined);
    setData(undefined);
    setUserName(undefined);
    setOnConfirm(undefined);
    setType("");
  };

  return (
    <ModalContext.Provider
      value={{
        type,
        isOpen,
        message,
        data,
        userName,
        onConfirm,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
