import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

export default function MusicPlayerController() {
  const router = useRouter();
  const { stop } = useMusicPlayer();

  useEffect(() => {
    const noMusicPages = ["/"]; // 음악 재생 안 할 페이지 목록

    if (noMusicPages.includes(router.pathname)) {
      stop();
    }
  }, [router.pathname, stop]);

  return null; // UI는 필요 없으니까 null 반환
}
