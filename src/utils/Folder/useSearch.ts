import { TreeNode } from "./types";

// 노드 찾기 -> drag, drop할 때 어떤 노드인지 알아야 해서
export const findNodeByKey = (
  nodes: TreeNode[],
  key: string
): TreeNode | null => {
  for (const n of nodes) {
    if (n.key === key) return n;
    if (n.children) {
      const found = findNodeByKey(n.children, key);
      if (found) return found;
    }
  }
  return null;
};
