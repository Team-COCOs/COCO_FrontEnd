import { useAuth } from "@/context/AuthContext";
import { VisitorRightStyled } from "./styled";
import { useEffect } from "react";
import { useRouter } from "next/router";

const VisitorRight = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const queryId = router.query.id;

  return (
    <VisitorRightStyled className="VisitorRight_wrap">
      <div className="VisitorRight_header ">Visitor</div>
    </VisitorRightStyled>
  );
};
export default VisitorRight;
