import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface StoresProps {
  product: string;
}

const Stores = ({ product }: StoresProps) => {
  const [storeProduct, setStoreProduct] = useState([]);

  useEffect(() => {
    const productData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/storeitems`
      );

      setStoreProduct(res.data);
    };

    productData();
  }, []);
  return <StoresStyle className={clsx("Stores_wrap")}></StoresStyle>;
};

export default Stores;
