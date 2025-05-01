import { SetProductStyled } from "./styled";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface SetProductProps {
  title: string;
}

const SetProduct: React.FC<SetProductProps> = ({ title }) => {
  return (
    <SetProductStyled>
      <div className="SetProduct_wrap">
        <div className="SetProduct_set_title">상품 관리</div>
        <h2>{title}</h2>
      </div>
    </SetProductStyled>
  );
};

export default SetProduct;
