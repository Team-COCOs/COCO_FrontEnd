import axiosInstance from "@/lib/axios";
import { TreeNode } from "./types";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

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
    const res = await axiosInstance.patch(`/${type}/saveTree`, {
      folders: flat,
    });
    console.log("트리 저장 성공", res.data);
    onSave();
  } catch (e: any) {
    const router = useRouter();
    const { user } = useAuth();

    if (e.response?.status === 401) {
      alert("로그인이 필요합니다.");
      router.push(`/home/${user?.id}`);
    } else {
      console.log("사진첩 불러오기 에러 : ", e);
    }
  }
};
