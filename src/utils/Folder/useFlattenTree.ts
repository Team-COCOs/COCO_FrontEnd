import axiosInstance from "@/lib/axios";
import { TreeNode } from "./types";
import { NextRouter } from "next/router";
import { resolveSoa } from "dns";

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

      console.log(currentNode);

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
  onSave: () => void,
  router: NextRouter,
  userId: string | string[] | undefined
) => {
  const flat = flattenTreeData(treeData);
  try {
    const res = await axiosInstance.patch(`/${type}/saveTree`, {
      folders: flat,
    });

    console.log("트리 저장 성공", res.data);

    if (res.data.message !== "폴더 트리 저장 완료") {
      alert(res.data.message);
      return;
    } else {
      onSave();
    }
  } catch (e: any) {
    if (e.response?.status === 401) {
      alert("로그인이 필요합니다.");
      router.push(`/home/${userId}`);
    } else if (e.response?.status === 500) {
      alert("동일한 폴더 이름이 존재합니다. 폴더 이름을 수정해주세요.");
    } else if (e.response?.status === 404) {
      alert("스크랩 중첩 혹은 동일한 이름은 불가능합니다.");
    } else {
      console.log("사진첩 불러오기 에러 : ", e);
      alert("트리 저장 중 오류가 발생했습니다.");
    }
    return null;
  }
};
