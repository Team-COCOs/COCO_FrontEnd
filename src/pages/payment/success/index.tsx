import PaymentSuccess from "@/components/PayPage/SuccessPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
const SuccessPage = () => {
  const router = useRouter();
  const [dotori, setDotori] = useState<string | null>(null);

  useEffect(() => {
    const queryDotori = router.query.dotori;

    if (typeof queryDotori === "string") {
      setDotori(queryDotori);
    }
  }, [router.query.dotori]);

  return (
    <>
      <Head>
        <title>결제 - COCOWORLD</title>
      </Head>
      <PaymentSuccess dotori={dotori!} />
    </>
  );
};

export default SuccessPage;
