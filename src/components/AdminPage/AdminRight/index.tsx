import React from "react";
import { AdminRightStyled } from "./styled";
import AddProduct from "../AddProduct";
import SetProduct from "../SetProduct";

interface AdminRightProps {
  selectedKey: string;
}

const AdminRight: React.FC<AdminRightProps> = ({ selectedKey }) => {
  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <AddProduct
            title="스킨 / 미니미 / 미니룸"
            type="img"
            selectedKey={selectedKey}
          />
        );
      case "2":
        return (
          <AddProduct title="쥬크박스" type="music" selectedKey={selectedKey} />
        );
      case "3":
        return <SetProduct title="미니홈피 배경" />;
      case "4":
        return <SetProduct title="다이어리 배경" />;
      case "5":
        return <SetProduct title="탭" />;
      case "6":
        return <SetProduct title="미니룸" />;
      case "7":
        return <SetProduct title="미니미" />;
      case "8":
        return <SetProduct title="노래" />;

      default:
        return <div>선택된 항목이 없습니다.</div>;
    }
  };

  return (
    <AdminRightStyled>
      <div>{renderContent()}</div>
    </AdminRightStyled>
  );
};

export default AdminRight;
