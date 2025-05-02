import { useRouter } from "next/router";
import { StoreStyle } from "./styled";
import clsx from "clsx";

const StoreContent = () => {
  const router = useRouter();

  return (
    <StoreStyle className={clsx("Store_wrap")}>
      <div className="Store_header"></div>
    </StoreStyle>
  );
};

export default StoreContent;
