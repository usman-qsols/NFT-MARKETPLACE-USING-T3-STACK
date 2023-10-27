import dynamic from "next/dynamic";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const Modal = dynamic(() => import("../components/StripeForm/Modal"), {
  ssr: false,
});

const test = () => {
  const [showModal, setShowModal] = useState(false);
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );
  return (
    <div>
      <Modal
        stripe={stripePromise}
        isModal={showModal}
        setIsModal={setShowModal}
        // nft={response}
        // refetch={refetch}
      />
    </div>
  );
};

export default test;
