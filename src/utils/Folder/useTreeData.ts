import { useState } from "react";
import { TreeNode } from "./types";
import Swal from "sweetalert2";

// 추가, 수정, 삭제, 중첩 제한
export const useTreeData = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  // 수정 후에 업데이트 ( 제목, 자식 노드 )
  const editNodeByKey = (
    nodes: TreeNode[],
    key: string,
    newTitle: string
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.key === key) return { ...node, title: newTitle };
      if (node.children) {
        return {
          ...node,
          children: editNodeByKey(node.children, key, newTitle),
        };
      }
      return node;
    });
  };

  // 노드 깊이 계산 -> 중첩 제한하려고
  const getNodeDepth = (
    nodes: TreeNode[],
    key: string,
    currentDepth: number = 1
  ): number | null => {
    for (const node of nodes) {
      if (node.key === key) return currentDepth;
      if (node.children) {
        const depth = getNodeDepth(node.children, key, currentDepth + 1);
        if (depth !== null) return depth;
      }
    }
    return null;
  };

  // 노드 깊이 2단계에서 막기 -> 부모 - 자식 - 자손 폴더에서 자손 폴더는 막음
  const insertNodeInside = (
    nodes: TreeNode[],
    parentKey: string,
    newNode: TreeNode
  ): TreeNode[] => {
    const parentDepth = getNodeDepth(nodes, parentKey);
    if (parentDepth && parentDepth >= 2) {
      Swal.fire({
        title: "중첩할 수 없습니다!",
        icon: "error",
      });
      return nodes;
    }
    return nodes.map((n) => {
      if (n.key === parentKey) {
        return {
          ...n,
          children: [...(n.children || []), newNode],
        };
      }
      if (n.children) {
        return {
          ...n,
          children: insertNodeInside(n.children, parentKey, newNode),
        };
      }
      return n;
    });
  };

  // 노드 추가
  const addNewNode = () => {
    const newKey = `new-${Math.random()}`;
    const newNode: TreeNode = {
      key: newKey,
      title: "새 폴더",
      isLeaf: false,
      children: [],
    };
    setTreeData((prev) => [...prev, newNode]);
  };

  // 삭제 (filter로 거르고 나머지 map 돌림)
  const deleteNodeByKey = (nodes: TreeNode[], key: string): TreeNode[] => {
    return nodes
      .filter((node) => node.key !== key)
      .map((node) => {
        if (node.children) {
          return { ...node, children: deleteNodeByKey(node.children, key) };
        }
        return node;
      });
  };

  return {
    treeData,
    setTreeData,
    editNodeByKey,
    deleteNodeByKey,
    insertNodeInside,
    getNodeDepth,
    addNewNode,
  };
};
