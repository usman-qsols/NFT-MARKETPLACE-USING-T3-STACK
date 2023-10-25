import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const NftDetailPage = () => {
  // const [data, setData] = useState({});
  const [ownerAddress, setOwnerAddress] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [tokenId, setTokenId] = useState();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [approvedModal, setApprovedModal] = useState(false);
  const [openInputModal, setOpenInputModal] = useState(false);
  const [smartAccount, setSmartAccount] = useState({});
  // const [openLoader, setOpenLoader] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  if (id) {
    const { data: myNft } = api.nft.getSingleNft.useQuery({ id: id });
  }

  return (
    <>
      <section className="body-font card explore-card overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="ecommerce"
              className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
              src={"data.ipfsHash"}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-sky-400">
                {"data.title"}
              </h1>

              <p className="leading-relaxed text-gray-400">
                {"data.description"}
              </p>
              <p className="leading-relaxed text-gray-400">
                Owner Address: {"data.ownerAddress"}
              </p>
              <p className="leading-relaxed text-gray-400">
                Contract Address : {"data.contractAddress"}
              </p>
              <p className="leading-relaxed text-gray-400">
                Token Id : {"data.tokenId"}
              </p>
              {/* <p className="leading-relaxed">
                  IpfsHash : {data.ipfsHash.slice(0, 36)}...
                </p> */}

              {/* <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  Eth {"data.price"}
                </span>
                {newOwnerAddress === ownerAddress || !data.active ? (
                  ""
                ) : (
                  <button
                    className="ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
                    onClick={buyNft}
                  >
                    Buy Nft
                  </button>
                )}

                {!data.active && SmartAccount.address === ownerAddress ? (
                  <button
                    className="ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
                    onClick={() => setApprovedModal(!approvedModal)}
                  >
                    Re-sell
                  </button>
                ) : (
                  ""
                )}
              </div> */}
            </div>
          </div>
          {/* {openLoader && <LoadingModal />} */}
        </div>
        {openInputModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="flex shadow-md">
              <div className="flex h-[24rem] w-[24rem] flex-wrap content-center justify-center rounded-l-md border border-dashed border-red-500 bg-white">
                <div className="w-72">
                  <h1 className="text-xl font-semibold">Welcome back</h1>
                  <small className="text-gray-400">
                    Welcome back! Please enter the price on which you want to
                    re-sell your nft
                  </small>

                  <form className="mt-4">
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">
                        Price
                      </label>
                      <input
                        placeholder="Enter Price"
                        className="block w-full rounded-md border border-gray-300 px-1.5 py-1 text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        required={true}
                      />
                    </div>

                    <div className="mb-3">
                      <button
                        className="mb-1.5 block w-full rounded-md bg-red-500 px-2 py-1.5 text-center text-white hover:bg-red-600"
                        // onClick={"listingNft"}
                      >
                        List My Nft
                      </button>
                      <button
                        className="mb-1.5 block w-[30px] rounded-md bg-red-500 px-2 py-1.5 text-center text-white hover:bg-red-600"
                        // onClick={() => setOpenInputModal(!openInputModal)}
                      >
                        X
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default NftDetailPage;
