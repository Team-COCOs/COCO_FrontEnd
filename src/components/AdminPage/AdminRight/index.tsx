import React, { useEffect } from "react";
import { AdminRightStyled } from "./styled";
import AddProduct from "../AddProduct";
import SetProduct from "../SetProduct";
import SetUser from "../SetUser";
import DashBoard from "../DashBoard";

// 가져오기
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreItems } from "../../../store/reducers/storeItemSlice";
import type { RootState, AppDispatch } from "../../../store/store";
import PayUser from "../PayUser";

interface AdminRightProps {
  selectedKey: string;
}
export interface StoreItem {
  id: number;
  name: string;
  category: string;
  file: string;
  price: number;
  artist: string | null;
  duration: number | null;
  created_at: string; // ISO 문자열
}

const AdminRight: React.FC<AdminRightProps> = ({ selectedKey }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.storeItems
  );

  useEffect(() => {
    dispatch(fetchStoreItems());
  }, [dispatch]);

  const filterItemsByType = (type: string) => {
    return items.filter((item: StoreItem) => item.category === type);
  };

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
        return (
          <SetProduct
            title="미니홈피 배경"
            items={filterItemsByType("minihomepis")}
          />
        );
      case "4":
        return (
          <SetProduct
            title="다이어리 배경"
            items={filterItemsByType("diary_background")}
          />
        );
      case "5":
        return <SetProduct title="탭" items={filterItemsByType("tapcolor")} />;
      case "6":
        return (
          <SetProduct title="미니룸" items={filterItemsByType("miniroom")} />
        );
      case "7":
        return (
          <SetProduct title="미니미" items={filterItemsByType("minimi")} />
        );
      case "8":
        return <SetProduct title="노래" items={filterItemsByType("bgm")} />;
      case "9":
        return (
          <DashBoard title="통계" items={filterItemsByType("dashboard")} />
        );
      case "10":
        return <SetUser title="유저관리" />;

      case "11":
        return <PayUser title="결제관리" />;

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
