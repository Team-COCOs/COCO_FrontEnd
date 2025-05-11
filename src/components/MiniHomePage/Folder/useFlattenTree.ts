import axiosInstance from "@/lib/axios";
import { TreeNode } from "./types";

// 데이터 평탄화
export const flattenTreeData = (treeData: TreeNode[]) => {
  const flatten = (
    nodes: TreeNode[],
    parentId: string | null = null
  ): TreeNode[] => {
    return nodes.flatMap((node) => {
      const { children, ...rest } = node;
      const currentNode = {
        ...rest,
        parent_id: parentId,
      };
      return [
        currentNode,
        ...(children ? flatten(children, currentNode.key) : []),
      ];
    });
  };
  return flatten(treeData);
};

// 평탄화된 트리 저장하기
export const saveTreeData = async (
  type: string,
  treeData: TreeNode[],
  onSave: () => void
) => {
  const flat = flattenTreeData(treeData);
  try {
    const res = await axiosInstance.post(`/${type}/saveTree`, {
      folders: flat,
    });
    console.log("트리 저장 성공", res.data);
    onSave();
  } catch (err) {
    console.error("트리 저장 실패", err);
  }
};
