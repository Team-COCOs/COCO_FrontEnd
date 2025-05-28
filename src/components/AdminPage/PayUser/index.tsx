import { PayUserStyled } from "./styled";
import { useState, useEffect } from "react";
import { Table } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

interface Pays {
  name: string; // 결제한 사람 이름
  email: string; // 결제한 사람 이메일
  role: string; // 유저 권한

  amount: number; // 결제 금액
  created_at: string;
  dotori_amount: number; // 충전된 도토리 금액
  id: number;
  order_id: string;
}

interface PayUserProps {
  title: string;
}

const PayUser: React.FC<PayUserProps> = ({ title }) => {
  const [payUsers, setPayUsers] = useState<Pays[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchPayUsers = async () => {
    try {
      const res = await axiosInstance.get("admin/payments");
      setPayUsers(res.data.payments);
      console.log(res.data.payments, "res.data?");
    } catch (error) {
      console.error("유저 불러오기 실패", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`admin/users/${id}`);
      await Swal.fire({
        title: "유저 삭제 성공!",
        icon: "success",
      });
      fetchPayUsers(); // 삭제 후 다시 데이터 불러오기
    } catch (error) {
      Swal.fire({
        title: "유저 삭제 실패!",
        icon: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayUsers();
  }, []);

  const columns = [
    {
      title: "번호",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "권한",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "결제금액",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()}원`,
    },
    {
      title: "도토리 개수",
      dataIndex: "dotori_amount",
      key: "dotori_amount",
    },
    {
      title: "주문번호",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "결제일",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "삭제",
      key: "action",
      render: (_: any, record: Pays) => (
        <button
          className="PayUser_delete_btn"
          onClick={() => handleDelete(record.id)}
        >
          삭제
        </button>
      ),
    },
  ];

  const dataSource = payUsers.map((user) => ({
    key: user.id.toString(),
    ...user,
  }));

  return (
    <PayUserStyled>
      <div>
        <div className="PayUser_wrap">
          <div className="PayUser_set_title">대시보드</div>
          <h2>{title}</h2>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: payUsers.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </PayUserStyled>
  );
};

export default PayUser;
