import { stripZeros } from "ethers/lib/utils";
import { buffer } from "micro";

// Creating Connection with stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
  console.log("Fulfilling the order", session);
  // Transfer function here
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
      console.log("Payment Successfull");
      const session = event.data.object;

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
