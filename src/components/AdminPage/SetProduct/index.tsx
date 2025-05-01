import { SetProductStyled } from "./styled";
import { useEffect } from "react";
import { Table } from "antd";

interface SetProductProps {
  title: string;
  items: any[];
}

const SetProduct: React.FC<SetProductProps> = ({ title, items }) => {
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
  ];

  const dataSource = items.map((item: any) => ({
    key: item.id.toString(),
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    file: item.file,
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
