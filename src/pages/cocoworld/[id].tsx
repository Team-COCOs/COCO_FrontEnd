import CocoWorldPage from "@/features/CocoWorld";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const CocoWorld = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Loading />;
  }

  return <CocoWorldPage id={id as string} />;
};

export default CocoWorld;
// pages/[id].tsx
// import CocoWorldPage from "@/features/CocoWorld";
// import { GetServerSideProps } from "next";

// interface Props {
//   id: string;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params!;

//   // id 유효성 검사
//   if (typeof id !== "string") {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       id,
//     },
//   };
// };

// const CocoWorld = ({ id }: Props) => {
//   return <CocoWorldPage id={id} />;
// };

// export default CocoWorld;
