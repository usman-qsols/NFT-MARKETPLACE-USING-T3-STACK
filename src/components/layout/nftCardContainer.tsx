import React from "react";
import NftCard from "./nftCard";
import auction1 from "../../utilities/auction-1.jpg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ZeroDevWeb3Auth } from "@zerodev/web3auth";
import { useAccount } from "wagmi";

const nftCardContainer = () => {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      const zeroDevWeb3Auth = ZeroDevWeb3Auth.getInstance([
        process.env.REACT_APP_ZERODEV_PROJECT_ID ||
          "b5486fa4-e3d9-450b-8428-646e757c10f6",
      ]);
      zeroDevWeb3Auth.getUserInfo().then(console.log);
    }
  }, [isConnected]);

  if (!isConnected) {
  }
  return (
    <section className="section explore" id="explore">
      <div className="container">
        <p className="section-subtitle">Exclusive Assets</p>

        <div className="title-wrapper">
          <h2 className="h2 section-title">Explore</h2>

          {/* <a href="#" className="btn-link">
            <span>Explore All</span> */}

          {/* <ion-icon
              name="arrow-forward-outline"
              aria-hidden="true"
            ></ion-icon> */}
          {/* </a> */}
        </div>

        <ul className="grid-list">
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
          <li>
            <NftCard src={auction1} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default nftCardContainer;
