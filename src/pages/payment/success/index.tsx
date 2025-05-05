import PaymentSuccess from "@/components/PayPage/SuccessPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const [dotori, setDotori] = useState<string | null>(null);

  useEffect(() => {
    const queryDotori = router.query.dotori;

    if (typeof queryDotori === "string") {
      setDotori(queryDotori);
    } else if (Array.isArray(queryDotori)) {
      setDotori(queryDotori[0]);
    } else {
      router.replace("/");
    }
  }, [router.query.dotori]);

  return dotori ? <PaymentSuccess dotori={dotori} /> : null;
};

export default SuccessPage;
