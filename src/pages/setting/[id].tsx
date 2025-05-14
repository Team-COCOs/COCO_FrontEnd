// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import MinihomeLayout from "@/features/Minihome";
import SettingLeft from "@/components/MiniHomePage/Setting/SettingLeft";
import SettingRight from "@/components/MiniHomePage/Setting/SettingRight";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [settingSelectedMenu, setSettingSelectedMenu] = useState<{
    type?: string;
    title: string;
  } | null>(null);

  return (
    <>
      <Head>
        <title>관리 - COCOWORLD</title>
      </Head>
      <MinihomeLayout
        id={id as string}
        tapChildren={
          <SettingLeft setSettingSelectedMenu={setSettingSelectedMenu} />
        }
        children={<SettingRight settingSelectedMenu={settingSelectedMenu} />}
      />
    </>
  );
};

export default MinihomePage;
