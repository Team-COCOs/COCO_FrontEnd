import { SetUserStyled } from "./styled";
import { useState, useEffect } from "react";
import { Table } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

interface User {
  id: number; // 아이디값
  name: string; // 이름
  email: string; // 이메일
  role: string; // role
  createdAt: string; // 생성일자
}

interface SetUserProps {
  title: string;
}

const SetUser: React.FC<SetUserProps> = ({ title }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("admin/users");
      setUsers(res.data.users);
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
      fetchUsers(); // 삭제 후 다시 데이터 불러오기
    } catch (error) {
      Swal.fire({
        title: "유저 삭제 실패!",
        icon: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "가입일",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "삭제",
      key: "action",
      render: (_: any, record: any) => (
        <button
          className="SetUser_delete_btn"
          onClick={() => handleDelete(record.id)}
        >
          삭제
        </button>
      ),
    },
  ];

  const dataSource = users.map((user) => ({
    key: user.id.toString(),
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  return (
    <SetUserStyled>
      <div>
        <div className="SetUser_wrap">
          <div className="SetUser_set_title">대시보드</div>
          <h2>{title}</h2>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </SetUserStyled>
  );
};

export default SetUser;
