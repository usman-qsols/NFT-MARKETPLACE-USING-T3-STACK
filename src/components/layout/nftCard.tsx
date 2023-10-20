import React, { useState } from "react";
import Image from "next/image";

const NftCard = (props: any) => {
  const [active, setActive] = useState(true);
  return (
    <div className="card explore-card">
      <figure className="card-banner">
        <a href="#">
          {/* <img src="./assets/images/auction-1.jpg" width="600" height="600" loading="lazy"
                      alt="Walking On Air" class="img-cover"> */}
          <Image
            src={props.src}
            className="img-cover h-60 w-60"
            alt="Walking On Air"
          />
        </a>
      </figure>

      <h3 className="h3 card-title">
        <a href="#">Walking On Air</a>
      </h3>

      <span className="card-author">
        Owned By{" "}
        <a href="#" className="author-link">
          Richard
        </a>
      </span>

      <div className="wrapper">
        <data className="wrapper-item" value="1.5">
          1.5 ETH
        </data>

        <span className="wrapper-item">1 of 1</span>
      </div>

      {active ? (
        <div className="flex flex-row">
          <button className="btn">
            <span>Place a Bid</span>
          </button>
          <button className="btn">
            <span>Details</span>
          </button>
        </div>
      ) : (
        <button className="btn disable">
          <span>Not Active</span>
        </button>
      )}
    </div>
  );
};

export default NftCard;
