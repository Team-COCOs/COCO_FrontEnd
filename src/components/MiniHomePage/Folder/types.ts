// 트리 구조 : key(고유), title(폴더명), isLeaf(자식 유무), isEditing(수정 중 여부), children(자식 노드), parent_id(부모 아이디)
export interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  isEditing?: boolean;
  children?: TreeNode[];
  parent_id?: string | null;
}
