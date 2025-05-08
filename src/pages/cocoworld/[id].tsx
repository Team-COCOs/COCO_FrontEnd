// pages/[id].tsx
import CocoWorldPage from "@/features/CocoWorld";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const CocoWorld = () => {
  const router = useRouter();
  const { id } = router.query;

  // 아직 id가 없는 경우 (라우터 준비 중)
  if (!id || Array.isArray(id)) {
    return <Loading />;
  }

  return <CocoWorldPage id={id} />;
};

export default CocoWorld;
