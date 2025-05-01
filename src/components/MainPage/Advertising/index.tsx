import clsx from "clsx";
import { AdvertisingStyle } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";

type AdvertisingProps = {
  type: string;
};

const Advertising = ({ type }: AdvertisingProps) => {
  const router = useRouter();

  return (
    <AdvertisingStyle className={clsx("Advertising_wrap")}>
      <div className={type}>
        <Image src={`/advertising/${type}.jpg`} alt={type} fill />
      </div>
    </AdvertisingStyle>
  );
};

export default Advertising;
