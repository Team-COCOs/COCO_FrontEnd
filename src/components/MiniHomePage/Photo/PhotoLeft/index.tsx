import { useEffect, useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axiosInstance from "@/lib/axios";

import { treeDatas } from "@/constants/photoLeftTabs";

// 트리 데이터의 타입을 명확히 정의
interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: TreeNode[];
}

const PhotoLeft = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [defaultExpandedKeys] = useState<string[]>(["0-0-1"]);

  // 트리 데이터 변환 함수
  const buildTree = (data: any[]): TreeNode[] => {
    return data.map((item) => ({
      key: item.key,
      title: item.title,
      isLeaf: item.isLeaf || false,
      children: item.children ? buildTree(item.children) : [],
    }));
  };

  useEffect(() => {
    axiosInstance
      .get("/getTree")
      .then((res) => {
        console.log("트리 데이터 : ", res.data);
        const tree = buildTree(res.data); // 받은 데이터를 트리 구조로 변환
        setTreeData(tree); // 상태 업데이트
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 트리에서 항목을 추가, 수정, 삭제하는 함수
  const handleEdit = (action: string, node: TreeNode) => {
    const updatedTreeData = [...treeData];

    if (action === "add") {
      // 새 항목 추가
      updatedTreeData.push({ key: node.key, title: node.title, isLeaf: false });
    } else if (action === "edit") {
      // 항목 수정
      const nodeIndex = updatedTreeData.findIndex(
        (item) => item.key === node.key
      );
      if (nodeIndex > -1) {
        updatedTreeData[nodeIndex] = { ...updatedTreeData[nodeIndex], ...node };
      }
    } else if (action === "delete") {
      // 항목 삭제
      const nodeIndex = updatedTreeData.findIndex(
        (item) => item.key === node.key
      );
      if (nodeIndex > -1) {
        updatedTreeData.splice(nodeIndex, 1);
      }
    }

    setTreeData(updatedTreeData);

    axiosInstance
      .post("/updateTree", updatedTreeData)
      .then((res) => {
        console.log("트리 업데이트 성공:", res.data);
      })
      .catch((e) => {
        console.log("트리 업데이트 실패:", e);
      });
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
      <div className="PhotoLeft_btns">
        <button>추가</button>
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div className="PhotoLeft_componentWrap">
        <Tree
          draggable
          treeData={treeDatas}
          defaultExpandedKeys={defaultExpandedKeys}
          checkable
        />
      </div>
      <button className="PhotoLeft_submit">저장</button>
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
