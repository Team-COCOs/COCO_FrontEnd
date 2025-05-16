export const formatKoreanDate = (utcString: string): string => {
  const date = new Date(utcString);
  return date
    .toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\./g, "-")
    .replace(/\s/g, "")
    .slice(0, 16);
};
