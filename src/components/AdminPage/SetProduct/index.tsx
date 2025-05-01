import { SetProductStyled } from "./styled";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface SetProductProps {
  title: string;
}

const SetProduct: React.FC<SetProductProps> = ({ title }) => {
  return (
    <div>
      <div>상품 관리</div>
      <div>{title}</div>
    </div>
  );
};

export default SetProduct;
