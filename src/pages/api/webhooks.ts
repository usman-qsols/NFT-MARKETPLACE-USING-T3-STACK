import { stripZeros } from "ethers/lib/utils";
import { buffer } from "micro";
import { api } from "~/utils/api";

// Creating Connection with stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
  // const updateBuyNft = api.nft.buyNft.useMutation({
  //   onSuccess: (res: any) => {
  //     console.log("Nft updated successfully");
  //   },
  //   onError(error: any) {
  //     console.log("Error updating menu", error);
  //   },
  // });
  console.log("Fulfilling the order", session);
  console.log("metadata", session.metadata);
  // // Transfer function here

  console.log("consoling");

  let data = {
    id: session.metadata.p_id,
    ownerAddress: session.metadata.ownerAddress,
  };

  // const obj = {
  //   id: "6538d153abf1d7ae17cedf80",
  //   ownerAddress: "absbsbsbbsbsasjdalksjdakskdpaskdpoak",
  // };
  const response = await fetch(
    `
      ${process.env.NEXT_PUBLIC_BASE_URL}update_nft`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  console.log({ response }, "response");
  return console.log("Completed");
};

export default async function (req: any, res: any) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    // Verify that event posted came from stripe
    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endPointSecret,
      );
    } catch (error: any) {
      console.log(`Webhook Error : ${error?.message}`);
      return res.status(400).send(`Webhook Error : ${error?.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // console.log("Payment Successfull");
      const session = event.data.object;
      // console.log("This is session", session);

      // Fulfill the order...
      return fulfillOrder(session)
        .then((res: any) => res?.status(200))
        .catch((err: any) =>
          res.status(400).send(`Webhook error : ${err.message}`),
        );
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
