import { useRouter } from "next/router";
import { StoreStyle } from "./styled";
import clsx from "clsx";

const StoreContent = () => {
  const router = useRouter();

  return <StoreStyle className={clsx("Store_wrap")}></StoreStyle>;
};

export default StoreContent;
