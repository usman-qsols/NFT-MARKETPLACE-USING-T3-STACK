import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@biconomy/web3-auth/dist/src/style.css";
import Navbar from "~/components/layout/navbar";
import Footer from "~/components/layout/footer";
import { ReduxProviders } from "../redux/provider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ReduxProviders>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ReduxProviders>
    </>
  );
};

export default api.withTRPC(MyApp);
