import PaymentFail from "@/components/PayPage/FailPage";
import Head from "next/head";
const SuccessPage = () => {
  return (
    <>
      <Head>
        <title>결제 - COCOWORLD</title>
      </Head>
      <PaymentFail />
    </>
  );
};

export default SuccessPage;
