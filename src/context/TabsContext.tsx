// context/TabsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface TabsContextType {
  userTabs: string[];
  setUserTabs: React.Dispatch<React.SetStateAction<string[]>>;
  fetchUserTabs: (userId: string) => Promise<void>;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const DEFAULT_TABS = ["photo", "diary", "visitor", "coco"];

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [userTabs, setUserTabs] = useState<string[]>(DEFAULT_TABS);
  const router = useRouter();
  const { id } = router.query;

  // ✅ 여기에 정의해야 return 문에서 사용할 수 있음
  const fetchUserTabs = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/useritems/tabs/${userId}`
      );

      setUserTabs(Array.isArray(data) ? data : DEFAULT_TABS);
    } catch (error) {
      console.error("탭 불러오기 실패", error);
      setUserTabs(DEFAULT_TABS);
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchUserTabs(id);
    }
  }, [id]);

  return (
    <TabsContext.Provider value={{ userTabs, setUserTabs, fetchUserTabs }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used within a TabsProvider");
  return context;
};
