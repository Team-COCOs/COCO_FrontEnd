import { DiaryWriteSelectStyle } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const DiaryWriteSelect = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [folder, setFolder] = useState<FolderItem[]>([]);

  return (
    <DiaryWriteSelectStyle className="WritePage_wrap">
      selecet
    </DiaryWriteSelectStyle>
  );
};

export default DiaryWriteSelect;
