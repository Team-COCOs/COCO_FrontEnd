import { SetProductStyled } from "./styled";
import { useEffect } from "react";
import { Table } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchStoreItems } from "@/store/reducers/storeItemSlice";
import type { AppDispatch } from "@/store/store";

interface SetProductProps {
  title: string;
  items: any[];
}

const SetProduct: React.FC<SetProductProps> = ({ title, items }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/storeitems/${id}`);
      alert("삭제 성공!");
      dispatch(fetchStoreItems());
    } catch (error) {
      alert("삭제 실패");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "상품명",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "도토리",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "상품",
      dataIndex: "file",
      key: "file",
      render: (file: string, record: any) => {
        if (record.category === "bgm") {
          return <audio controls src={file} />;
        } else {
          return <img src={file} alt="product" style={{ width: 100 }} />;
        }
      },
    },
    {
      title: "삭제",
      key: "action",
      render: (_: any, record: any) => (
        <button
          className="SetProduct_delete_btn"
          onClick={() => handleDelete(record.id)}
        >
          삭제
        </button>
      ),
    },
  ];
  const dataSource = items.map((item: any) => ({
    key: item.id.toString(),
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    file: item.category === "bgm" ? item.full_url : item.file,
  }));

  return (
    <SetProductStyled>
      <div>
        <div className="SetProduct_wrap">
          <div className="SetProduct_set_title">상품 관리</div>
          <h2>{title}</h2>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          // pagination={pagination}
        />
      </div>
    </SetProductStyled>
  );
};
export default SetProduct;
