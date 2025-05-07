import CocoWorldPage from "@/features/CocoWorld";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CocoWorld = () => {
  const router = useRouter();
  const { id } = router.query;
  return <CocoWorldPage id={id as string} />;
};

export default CocoWorld;
