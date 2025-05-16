import { TreeNode } from "./types";
import { findNodeByKey } from "./useSearch";

// 트리 속성 중 onDrag
export const useDragDrop = (
  treeData: TreeNode[],
  setTreeData: (t: TreeNode[]) => void,
  insertNodeInside: (
    nodes: TreeNode[],
    key: string,
    newNode: TreeNode
  ) => TreeNode[]
) => {
  const handleDrop = ({ dragNode, node, dropPosition, dropToGap }: any) => {
    // 스크랩 폴더 안으로 드롭하려고 하면 막기
    if (!dropToGap && node.title === "스크랩") {
      alert("스크랩 폴더 안에는 항목을 넣을 수 없습니다.");
      return;
    }

    // 노드 제거
    const removeNode = (nodes: TreeNode[], key: string): TreeNode[] => {
      return nodes
        .map((n) => {
          if (n.key === key) return null;
          if (n.children) {
            return { ...n, children: removeNode(n.children, key) };
          }
          return n;
        })
        .filter(Boolean) as TreeNode[];
    };

    // 형제 위치에 노드 앞뒤 삽입
    const insertBeforeAfter = (
      nodes: TreeNode[],
      targetKey: string,
      newNode: TreeNode,
      before: boolean
    ): TreeNode[] => {
      const result: TreeNode[] = [];
      for (const n of nodes) {
        if (n.key === targetKey) {
          if (before) result.push(newNode);
          result.push(n);
          if (!before) result.push(newNode);
        } else if (n.children) {
          result.push({
            ...n,
            children: insertBeforeAfter(n.children, targetKey, newNode, before),
          });
        } else {
          result.push(n);
        }
      }
      return result;
    };

    // 드래그된 노드 찾기
    const dragItem = findNodeByKey(treeData, dragNode.key);
    if (!dragItem) return;

    // 드래그 후 자식으로 이동되면 제거되어야 해서
    let updatedTree = removeNode(treeData, dragNode.key);
    let resultTree: TreeNode[] = [];

    // dropToGap (false) : 자식으로 중첩 이동, (true) : 형제로 이동
    if (!dropToGap) {
      const tempTree = insertNodeInside(updatedTree, node.key, dragItem);
      if (tempTree === updatedTree) return; // 중첩 제한 후 2단계 이상이면 다시 되돌려 놓기 (보통 삭제하니까..)
      resultTree = tempTree;
    } else {
      const before = dropPosition === -1; // 형제 위치에서 위, 아래 어디에 위치시킬지
      resultTree = insertBeforeAfter(updatedTree, node.key, dragItem, before);
    }

    setTreeData(resultTree);
  };

  return { handleDrop };
};
