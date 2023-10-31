import dynamic from "next/dynamic";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import axios from "axios";

// const Modal = dynamic(() => import("../components/StripeForm/Modal"), {
//   ssr: false,
// });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const test = () => {
  const [showModal, setShowModal] = useState(false);
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as any,
  );

  async function response() {
    const obj = {
      id: "6538d153abf1d7ae17cedf80",
      ownerAddress: "absbsbsbbsbsasjdalksjdakskdpaskdpoak",
    };
    const response = await fetch(
      `
      ${process.env.NEXT_PUBLIC_BASE_URL}update_nft`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      },
    );
    console.log({ response }, "response");
  }

  return (
    <div>
      <button onClick={response}>Button</button>
    </div>
  );
};

export default test;
