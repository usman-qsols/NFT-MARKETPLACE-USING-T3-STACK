// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import LoadingModal from "./LoadingModal";
// import { parseEther } from "ethers/lib/utils";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { PaymasterMode } from "@biconomy/paymaster";

// import {
//   MARKETPLACE_CONTRACT_ABI,
//   MARKETPLACE_CONTRACT_ADDRESS,
//   NFT_CONTRACT_ABI,
//   NFT_CONTRACT_ADDRESS,
// } from "@/components/constants";
// import { useSelector } from "react-redux";
// import { ethers } from "ethers";
// import NFTListModal from "@/pages/NFTListModal";
// import Link from "next/link";

// const NftDetailPage = () => {
//   const [data, setData] = useState({});
//   const [ownerAddress, setOwnerAddress] = useState();
//   const [contractAddress, setContractAddress] = useState();
//   const [tokenId, setTokenId] = useState();
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState();
//   const [ipfsHash, setIpfsHash] = useState();
//   const [approvedModal, setApprovedModal] = useState(false);
//   const [openInputModal, setOpenInputModal] = useState(false);
//   const [smartAccount, setSmartAccount] = useState({});
  // const [openLoader, setOpenLoader] = useState(true);

  //   const SmartAccount = useSelector(
  //     (state) => state.smartAccount.value.smartAccount,
  //   );
  //   console.log("Smart Account", SmartAccount);
  //   const newOwnerAddress = SmartAccount.address;
  //   console.log("Owner New Address", newOwnerAddress);

  //   const sellerAddress = "0xCDeD68e89f67d6262F82482C2710Ddd52492808a";

  //   const router = useRouter();

  //   async function fetchData() {
  //     try {
  //       await axios
  //         .get(
  //           `http://localhost:5004/nfts/getsinglenft/${router.query.NftDetails}`,
  //         )
  //         .then((res) => {
  //           console.log("Res", res.data);
  //           setData(res.data);
  //           setContractAddress(res.data.contractAddress);
  //           setTokenId(res.data.tokenId);
  //           setPrice(res.data.price.toString());
  //           setOwnerAddress(res.data.ownerAddress);
  //         });
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   }
  //   useEffect(() => {
  //     console.log("check", data);
  //     console.log("router query", router.query.NftDetails);
  //     // console.log(
  //     //   "conditiobns ",
  //     //   SmartAccount.address.toLowerCase() ===
  //     //     ownerAddress.toString().toLowerCase()
  //     // );
  //     console.log(SmartAccount.address);
  //     console.log(ownerAddress);
  //     console.log(tokenId);
  //     fetchData();
  // setOwnerAddress(localStorage.getItem("address"));
  // setSmartAccount(JSON.parse(localStorage.getItem("smartAccount")));
  // console.log("Smart Account", SmartAccount);

  // console.log("smart Account ", smartAccount);
  // listingSuccess && window.location.reload();
  //   }, []);

  // ------------------------------------------------
  // ------------- Buying Nft -----------------------
  // ------------------------------------------------

  //   const buyNft = async (e) => {
  //     e.preventDefault();
  //     if (localStorage.getItem("address") === "undefined") {
  //       return alert("Please login first");
  //     }
  //     const MarketplaceContract = new ethers.Contract(
  //       MARKETPLACE_CONTRACT_ADDRESS,
  //       MARKETPLACE_CONTRACT_ABI,
  //       SmartAccount.provider,
  //     );
  //     try {
  //       toast.info("Transferring Nft to your address...", {
  //         position: "top-right",
  //         autoClose: 15000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       const buyTx = await MarketplaceContract.populateTransaction.purchaseNft(
  //         tokenId,
  //         contractAddress,
  //       );
  //       console.log("Purchasing tx", buyTx.data);

  //       const tx1 = {
  //         to: MARKETPLACE_CONTRACT_ADDRESS,
  //         data: buyTx.data,
  //         value: parseEther(price),
  //       };

  //       console.log("here before userop");
  //       let userOp = await SmartAccount.buildUserOp([tx1]);
  //       console.log({ userOp });
  //       const biconomyPaymaster = SmartAccount.paymaster;
  //       console.log(biconomyPaymaster);
  //       console.log(SmartAccount);
  //       let paymasterServiceData = {
  //         mode: PaymasterMode.SPONSORED,
  //         // calculateGasLimits: true,
  //       };
  //       console.log("Hello");
  //       const paymasterAndDataResponse =
  //         await biconomyPaymaster.getPaymasterAndData(
  //           userOp,
  //           paymasterServiceData,
  //         );
  //       console.log("Hello2");

  //       userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  //       console.log("Hello3");
  //       const userOpResponse = await SmartAccount.sendUserOp(userOp);
  //       console.log("Hello4");
  //       console.log("userOpHash", userOpResponse);
  //       const { receipt } = await userOpResponse.wait(1);
  //       console.log("txHash", receipt.transactionHash);
  //       toast.success(
  //         `Success! Here is your transaction:${receipt.transactionHash} `,
  //         {
  //           position: "top-right",
  //           autoClose: 18000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         },
  //         await axios
  //           .put(
  //             `http://localhost:5004/nfts/updatenft/${router.query.NftDetails}`,
  //             {
  //               ownerAddress: newOwnerAddress,
  //               active: false,
  //             },
  //           )
  //           .then((result) => console.log("Result", result.data)),
  //         console.log("After api"),
  //       );

  //       // window.location.reload();
  //     } catch (err) {
  //       console.error(err);
  //       console.log(err);
  //     }
  //   };

  //   const approveContracts = async (e) => {
  //     e.preventDefault();
  //     const nftContract = new ethers.Contract(
  //       NFT_CONTRACT_ADDRESS,
  //       NFT_CONTRACT_ABI,
  //       SmartAccount.provider,
  //     );

  //     try {
  //       toast.info("Approving Marketplace to sell your Nft on your behalf...", {
  //         position: "top-right",
  //         autoClose: 20000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       const approveMarketplaceTx =
  //         await nftContract.populateTransaction.setApprovalForAll(
  //           "0xcded68e89f67d6262f82482c2710ddd52492808a",
  //           true,
  //         );
  //       console.log("approving tx", approveMarketplaceTx.data);

  //       const tx1 = {
  //         to: NFT_CONTRACT_ADDRESS,
  //         data: approveMarketplaceTx.data,
  //       };

  //       const approveNftContract =
  //         await nftContract.populateTransaction.setApprovalForAll(
  //           "0x43c99947D6E25497Dc69351FaBb3025F7ACC2A6b",
  //           true,
  //         );

  //       console.log("approveNftContract data ", approveNftContract.data);

  //       const tx2 = {
  //         to: NFT_CONTRACT_ADDRESS,
  //         data: approveNftContract.data,
  //       };

  //       console.log("here before userop");
  //       let userOp = await SmartAccount.buildUserOp([tx1, tx2]);
  //       console.log({ userOp });
  //       const biconomyPaymaster = SmartAccount.paymaster;
  //       console.log(biconomyPaymaster);
  //       console.log(SmartAccount);
  //       let paymasterServiceData = {
  //         mode: PaymasterMode.SPONSORED,
  //         // calculateGasLimits: true,
  //       };
  //       console.log("Hello");
  //       const paymasterAndDataResponse =
  //         await biconomyPaymaster.getPaymasterAndData(
  //           userOp,
  //           paymasterServiceData,
  //         );
  //       console.log("Hello2");

  //       userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  //       console.log("Hello3");
  //       const userOpResponse = await SmartAccount.sendUserOp(userOp);
  //       console.log("Hello4");
  //       console.log("userOpHash", userOpResponse);
  //       const { receipt } = await userOpResponse.wait(1);
  //       console.log("txHash", receipt.transactionHash);
  //       toast.success(
  //         setApprovedModal(!approvedModal),
  //         setOpenInputModal(!openInputModal),
  //       );
  //     } catch (err) {
  //       console.error(err);
  //       console.log(err);
  //     }
  //   };

  //   const listingNft = async (e) => {
  //     e.preventDefault();
  //     const contract = new ethers.Contract(
  //       MARKETPLACE_CONTRACT_ADDRESS,
  //       MARKETPLACE_CONTRACT_ABI,
  //       SmartAccount.provider,
  //     );
  //     try {
  //       toast.info("Listing your NFT to our Marketplace...", {
  //         position: "top-right",
  //         autoClose: 15000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       const listTx = await contract.populateTransaction.listNft(
  //         contractAddress,
  //         tokenId,
  //         parseEther(price),
  //       );
  //       console.log("listing data", listTx.data);
  //       console.log("Token Id = ", tokenId);
  //       console.log("Price", parseEther(price.toString()));
  //       console.log("Contract Address", contractAddress);

  //       const tx1 = {
  //         to: MARKETPLACE_CONTRACT_ADDRESS,
  //         data: listTx.data,
  //         value: parseEther("0.0025"),
  //       };
  //       console.log("here before userop");
  //       let userOp = await SmartAccount.buildUserOp([tx1]);
  //       console.log({ userOp });
  //       const biconomyPaymaster = SmartAccount.paymaster;
  //       console.log("biconomy paymaster ", biconomyPaymaster);
  //       console.log("Smart Account ", SmartAccount);
  //       let paymasterServiceData = {
  //         mode: PaymasterMode.SPONSORED,
  //         // calculateGasLimits: true,
  //       };
  //       console.log("Hello");
  //       const paymasterAndDataResponse =
  //         await biconomyPaymaster.getPaymasterAndData(
  //           userOp,
  //           paymasterServiceData,
  //         );
  //       console.log("Hello2");

  //       userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  //       console.log("Hello3");
  //       const userOpResponse = await SmartAccount.sendUserOp(userOp);
  //       console.log("Hello4");
  //       console.log("userOpHash", userOpResponse);
  //       const { receipt } = await userOpResponse.wait(1);
  //       console.log("txHash", receipt.transactionHash);
  //       console.log("Contract run");
  //       toast.success(
  //         `Success Listing! Here is your transaction:${receipt.transactionHash} `,
  //         {
  //           position: "top-right",
  //           autoClose: 18000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         },
  //         await axios
  //           .put(
  //             `http://localhost:5004/nfts/updatenft/${router.query.NftDetails}`,
  //             {
  //               price: price,
  //               active: true,
  //             },
  //           )
  //           .then((result) => console.log(result)),
  //         console.log("After Api Call"),
  //         // setOpenApproveModal(!openApproveModal)
  //       );
  //     } catch (err) {
  //       console.error(err);
  //       console.log(err);
  //     }
  //   };

  return (
    // <>
    //   <section className="body-font overflow-hidden bg-white text-gray-700">
    //     <div className="container mx-auto px-5 py-24">
    //       <div className="mx-auto flex flex-wrap lg:w-4/5">
    //         <img
    //           alt="ecommerce"
    //           className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
    //           src={data.ipfsHash}
    //         />
    //         <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
    //           <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
    //             {data.title}
    //           </h1>

    //           <p className="leading-relaxed">{data.description}</p>
    //           <p className="leading-relaxed">
    //             Owner Address: {data.ownerAddress}
    //           </p>
    //           <p className="leading-relaxed">
    //             Contract Address : {data.contractAddress}
    //           </p>
    //           <p className="leading-relaxed">Token Id : {data.tokenId}</p>
    //           {/* <p className="leading-relaxed">
    //               IpfsHash : {data.ipfsHash.slice(0, 36)}...
    //             </p> */}

    //           <div className="flex">
    //             <span className="title-font text-2xl font-medium text-gray-900">
    //               Eth {data.price}
    //             </span>
    //             {newOwnerAddress === ownerAddress || !data.active ? (
    //               ""
    //             ) : (
    //               <button
    //                 className="ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
    //                 onClick={buyNft}
    //               >
    //                 Buy Nft
    //               </button>
    //             )}

    //             {!data.active && SmartAccount.address === ownerAddress ? (
    //               <button
    //                 className="ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
    //                 onClick={() => setApprovedModal(!approvedModal)}
    //               >
    //                 Re-sell
    //               </button>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {/* {openLoader && <LoadingModal />} */}
    //     </div>
    //     {openInputModal && (
    //       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
    //         <div className="flex shadow-md">
    //           <div className="flex h-[24rem] w-[24rem] flex-wrap content-center justify-center rounded-l-md border border-dashed border-red-500 bg-white">
    //             <div className="w-72">
    //               <h1 className="text-xl font-semibold">Welcome back</h1>
    //               <small className="text-gray-400">
    //                 Welcome back! Please enter the price on which you want to
    //                 re-sell your nft
    //               </small>

    //               <form className="mt-4">
    //                 <div className="mb-3">
    //                   <label className="mb-2 block text-xs font-semibold">
    //                     Price
    //                   </label>
    //                   <input
    //                     placeholder="Enter Price"
    //                     class="block w-full rounded-md border border-gray-300 px-1.5 py-1 text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
    //                     onChange={(e) => {
    //                       if (isNaN(e.target.value)) {
    //                         alert("You can only write price in numbers");
    //                         e.target.value = ""; // Clear the input field
    //                       } else {
    //                         setPrice(e.target.value);
    //                       }
    //                     }}
    //                     required={true}
    //                   />
    //                 </div>

    //                 <div className="mb-3">
    //                   <button
    //                     className="mb-1.5 block w-full rounded-md bg-red-500 px-2 py-1.5 text-center text-white hover:bg-red-600"
    //                     onClick={listingNft}
    //                   >
    //                     List My Nft
    //                   </button>
    //                   <button
    //                     className="mb-1.5 block w-[30px] rounded-md bg-red-500 px-2 py-1.5 text-center text-white hover:bg-red-600"
    //                     onClick={() => setOpenInputModal(!openInputModal)}
    //                   >
    //                     X
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {approvedModal && (
    //       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
    //         <div className="flex shadow-md">
    //           <div className="flex h-[14rem] w-[23rem] flex-wrap content-center justify-center rounded-l-md border border-dashed border-purple-600 bg-white">
    //             <div className="w-72">
    //               <h1 className="text-xl font-semibold">
    //                 Approve CryptoCrafters
    //               </h1>
    //               <small className="text-gray-400">
    //                 Welcome back! You should approve Marketplace to sell your
    //                 NFT on your behalf
    //               </small>

    //               <form className="mt-4">
    //                 <div className="mb-3">
    //                   <button
    //                     className="mb-1.5 block w-full rounded-md bg-purple-600 px-2 py-1.5 text-center text-white hover:bg-purple-900"
    //                     onClick={approveContracts}
    //                   >
    //                     Approve Marketplace
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </section>
    //   <ToastContainer />
    // </>
    <></>
  );
};

export default NftDetailPage;
