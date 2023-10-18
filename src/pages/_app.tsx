import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@biconomy/web3-auth/dist/src/style.css";
import Navbar from "~/components/layout/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
