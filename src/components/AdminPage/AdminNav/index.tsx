import React, { useState } from "react";
import { Menu, ConfigProvider } from "antd";
import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "대쉬보드",
    icon: <PlusCircleOutlined style={{ color: "#f87013" }} />,
    children: [
      { key: "9", label: "통계" },
      { key: "10", label: "유저관리" },
    ],
  },
  {
    key: "sub3",
    label: "상품 추가",
    icon: <PlusCircleOutlined style={{ color: "#f87013" }} />,
    children: [
      { key: "1", label: "스킨 / 미니미 / 미니룸" },
      { key: "2", label: "쥬크박스" },
    ],
  },
  {
    key: "sub2",
    label: "상품 관리",
    icon: <SettingOutlined style={{ color: "#f87013" }} />,
    children: [
      { key: "3", label: "미니홈피 배경" },
      { key: "4", label: "다이어리 배경" },
      { key: "5", label: "탭" },
      { key: "6", label: "미니룸" },
      { key: "7", label: "미니미" },
      { key: "8", label: "노래" },
    ],
  },
];

interface AdminNavProps {
  onSelectKey: (key: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ onSelectKey }) => {
  const [selectedKeys, setSelectedKeys] = useState(["9"]); // 통계
  const [openKeys, setOpenKeys] = useState(["sub1"]); // 대쉬보드

  const onClick = (e: any) => {
    setSelectedKeys([e.key]);
    onSelectKey(e.key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f87013",
        },
      }}
    >
      <Menu
        onClick={onClick}
        onOpenChange={onOpenChange}
        style={{ width: 256, height: "calc(100vh - 80px)" }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
      />
    </ConfigProvider>
  );
};

export default AdminNav;
