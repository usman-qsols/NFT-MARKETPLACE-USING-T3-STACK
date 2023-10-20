import React from "react";
import NftCard from "./nftCard";
import auction1 from "../../utilities/auction-1.jpg";

const nftCardContainer = () => {
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
