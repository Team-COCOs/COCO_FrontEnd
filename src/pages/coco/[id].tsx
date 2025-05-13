// pages/minihome/[id].tsx
import { useRouter } from "next/router";

import MinihomeLayout from "@/features/Minihome";
import HomeLeft from "@/components/MiniHomePage/Home/HomeLeft";

// 코코 컴포넌트
import CocoRight from "@/components/MiniHomePage/Coco/CocoRight";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MinihomeLayout
      id={id as string}
      tapChildren={<HomeLeft />}
      children={<CocoRight />}
    />
  );
};

export default MinihomePage;
