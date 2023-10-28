import React from "react";
import Link from "next/link";

const success = () => {
  return (
    <div className="container">
      <p className="section-subtitle">PaymentStorm</p>
      <h2 className="h1 hero-title">Payment Successfully done!</h2>
      <p className="hero-text">
        You may check your Nfts by clicking on the button below.
      </p>

      <Link href={"/OwnerNfts/ownerAddress"}>
        <button className="btn mb-[10px] flex h-[50px] w-[200px] justify-center">
          <span>My Nfts</span>
        </button>
      </Link>
    </div>
  );
};

export default success;
