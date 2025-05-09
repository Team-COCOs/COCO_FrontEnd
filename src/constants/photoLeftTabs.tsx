interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: any;
}

export const treeDatas: TreeNode[] = [
  {
    key: "0-0-1",
    title: "소설",
    isLeaf: false,
    children: [
      { key: "0-0-1-1", title: "나미야 잡화점의 기적" },
      { key: "0-0-1-2", title: "데미안" },
      { key: "0-0-1-3", title: "오만과 편견" },
      { key: "0-0-1-4", title: "백년의 고독" },
      { key: "0-0-1-5", title: "채식주의자" },
      { key: "0-0-1-6", title: "파친코" },
      { key: "0-0-1-7", title: "토지" },
      { key: "0-0-1-8", title: "태백산맥" },
      { key: "0-0-1-9", title: "삼국지" },
      { key: "0-0-1-10", title: "그리스인 조르바" },
      { key: "0-0-1-11", title: "죄와 벌" },
      { key: "0-0-1-12", title: "안나 카레니나" },
    ],
  },
  {
    key: "0-0-2",
    title: "자기계발",
    isLeaf: false,
    children: [{ key: "0-0-2-1", title: "미움받을 용기" }],
  },
  {
    key: "0-0-3",
    title: "에세이",
    isLeaf: false,
    children: [
      { key: "0-0-3-1", title: "지금 이대로 좋다" },
      { key: "0-0-3-2", title: "모리와 함께한 화요일" },
      { key: "0-0-3-3", title: "도둑 맞은 가난" },
    ],
  },
  {
    key: "0-0-4",
    title: "판타지",
    isLeaf: false,
    children: [{ key: "0-0-4-1", title: "해리 포터와 마법사의 돌" }],
  },
  {
    key: "0-0-5",
    title: "경제",
    isLeaf: false,
    children: [{ key: "0-0-5-1", title: "고요한 흑자" }],
  },
  { key: "0-0-6", title: "기타", isLeaf: false, children: [] },
];
