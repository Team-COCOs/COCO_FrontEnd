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
    }
  }, [router.query.dotori]);

  return <PaymentSuccess dotori={dotori!} />;
};

export default SuccessPage;
