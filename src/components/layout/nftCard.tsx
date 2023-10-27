import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAccount } from "wagmi";

const NftCard = (props: any) => {
  const [active, setActive] = useState(true);
  const router = useRouter();
  const { address } = useAccount();

  const pushToDetailPage = () => {
    // router.push();
  };
  return (
    <div className="card explore-card">
      <figure className="card-banner">
        <a>
          <img
            src={props.src}
            width="600"
            height="600"
            loading="lazy"
            alt="Walking On Air"
            className="img-cover"
          />
          {/* <Image
            src={props.src}
            className="img-cover h-60 w-60"
            alt="Walking On Air"
            width={60}
            height={60}
          /> */}
        </a>
      </figure>

      <h3 className="h3 card-title">
        <a>{props.title}</a>
      </h3>

      <span className="card-author">
        Owned By{" "}
        <a className="author-link">
          {props.ownerAddress?.slice(0, 8) +
            "..." +
            props.ownerAddress?.slice(35, 45)}
        </a>
      </span>

      <div className="wrapper">
        <data className="wrapper-item" value="1.5">
          $ {props.price}
        </data>

        <span className="wrapper-item">1 of 1</span>
      </div>

      {props.active ? (
        <div className="flex flex-row justify-between">
          {address !== props.ownerAddress ? (
            <button className="btn">
              <span>Buy Nft</span>
            </button>
          ) : (
            ""
          )}

          <Link href={`/NftDetail/${props.id}`}>
            <button className="btn" onClick={pushToDetailPage}>
              <span>Details</span>
            </button>
          </Link>
        </div>
      ) : (
        <button className="btn disable">
          <span>Not Listed</span>
        </button>
      )}
    </div>
  );
};

export default NftCard;
