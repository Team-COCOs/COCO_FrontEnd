// src/features/Admin/components/AdminNav.tsx
import React from "react";
import { Menu, ConfigProvider } from "antd";
import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "sub1",
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

const AdminNav = () => {
  const onClick = (e: any) => {
    console.log("click ", e);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f87013", // 주황색으로 설정
        },
      }}
    >
      <Menu
        onClick={onClick}
        style={{ width: 256, height: "calc(100vh - 80px)" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </ConfigProvider>
  );
};

export default AdminNav;
