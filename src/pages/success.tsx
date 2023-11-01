import React from "react";
import Link from "next/link";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { useSelector, useDispatch } from "react-redux";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { setUpdateNftData } from "~/redux/features/BuyNftSlicer";
import T3MarketJson from "../components/contractAddressAndJson/T3MarketplaceContract.json";
import MyTokenJson from "../components/contractAddressAndJson/MyToken.json";
import T3MarketAddress from "../components/contractAddressAndJson/T3MarketplaceContract-address.json";
import MyTokenAddress from "../components/contractAddressAndJson/MyToken-address.json";
import LoadingModal from "../components/layout/loader";

const success = () => {
  // const { config: buyConfig } = usePrepareContractWrite({
  //   address: "0xB35610f89D0d8EC1aC3F2F3887475eB16A78BC35",
  //   abi: T3MarketJson.abi,
  //   functionName: "buy",
  //   args: [payload?.tokenId, payload?._amount],
  // });
  // const {
  //   data: buyData,
  //   isLoading: listIsLoading,
  //   isSuccess: listIsSuccess,
  //   write: listMyNft,
  // } = useContractWrite(buyConfig);

  // const {
  //   data: buyWaitData,
  //   isError: buyWaitError,
  //   isSuccess: buyTxIsSuccess,
  // } = useWaitForTransaction({
  //   hash: buyData?.hash,
  // });

  // const listingSuccess = buyTxIsSuccess;

  // useEffect(() => {
  //   async function listingNft(e: any) {
  //     e.preventDefault();
  //     try {
  //       if (listMyNft) {
  //         listMyNft();
  //         console.log("hash", buyData?.hash);
  //       }
  //       if (buyWaitError) {
  //         alert(buyWaitError);
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // }, [payload]);

  return (
    <div className="container">
      <p className="section-subtitle">PaymentStorm</p>
      <h2 className="h1 hero-title">Payment Successfully done!</h2>
      <p className="hero-text">
        You can now buy Nfts equal to the tokens you just buy.
      </p>

      <Link href={"/exploreNfts"}>
        <button className="btn mb-[10px] flex h-[50px] w-[200px] justify-center">
          <span>See Nfts</span>
        </button>
      </Link>
    </div>
  );
};

export default success;
