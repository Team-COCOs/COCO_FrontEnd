import { SetProductStyled } from "./styled";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file: string, record: any) => {
        if (record.category === "bgm") {
          // If the category is "bgm", render an audio player
          return <audio controls src={file} />;
        } else {
          // For other categories, render an image
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
    <div>
      <div className="SetProduct_wrap">
        <div className="SetProduct_set_title">상품 관리</div>
        <h2>{title}</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default SetProduct;
