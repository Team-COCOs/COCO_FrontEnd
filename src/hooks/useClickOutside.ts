import { useEffect } from "react";

type Handler = () => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: Handler
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
