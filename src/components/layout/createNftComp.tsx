import React, { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import { api } from "~/utils/api";

const createNftComp = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState(); // wallet address
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [tokenId, setTokenId] = useState(null);
  const [tokenIdForListing, setTokenIdForListing] = useState(null);
  const [openListingModal, setOpenListingModal] = useState(false);
  const [openAnimation, setOpenAnimation] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const { mutateAsync, error } = api.nft.createNft.useMutation();

  const active = true;
  const sellerAddress = "0xCDeD68e89f67d6262F82482C2710Ddd52492808a";
  const contractAddress = "0x43c99947D6E25497Dc69351FaBb3025F7ACC2A6b";

  const handleClick = () => {
    mutateAsync({
      title: title,
      price: price,
      description: description,
      ipfsHash: ipfsUrl,
      ownerAddress: "0x000000000000000000000000000000000",
      tokenId: "1",
      active: true,
    });
  };

  async function OnChangeFile(e: any) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS

      updateMessage("Uploading image.. please dont click anything!");
      const response = (await uploadFileToIPFS(file, title)) as {
        success: boolean;
        pinataURL: string;
      };
      console.log("hello pinata res ", response);
      console.log(response);
      if (response && response.success === true) {
        updateMessage("");
        console.log("Uploaded image to Pinata: ", response?.pinataURL);
        setIpfsUrl(response.pinataURL);
        setDisableButton(false);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function uploadMetadataToIPFS() {
    //Make sure that none of the fields are empty
    if (!title || !description || !price || !ipfsUrl) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      title,
      description,
      price,
      ipfsUrl: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = (await uploadJSONToIPFS(nftJSON)) as {
        success: boolean;
        pinataURL: string;
      };
      console.log("res : ", response);
      if (response && response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response?.pinataURL);
        return response?.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  return (
    <div className="container">
      <p className="section-subtitle mt-20">How It Works</p>

      <h2 className="h2 section-title">Create and sell your NFTs</h2>

      <div className="footer-list mb-20 mt-20 w-[100%] md:w-[50%]">
        <h3 className="text-[12px] md:text-[16px]">
          Contract Address : {contractAddress}
        </h3>
        <h3 className="text-[12px] md:text-[16px]">
          Marketplace Address : {sellerAddress}
        </h3>
        <form action="" className="newsletter-form">
          {/* <input type="email" name="email" placeholder="info@yourmail.com" required className="newsletter-input"> */}
          <input
            type="text"
            className="newsletter-input mt-5"
            placeholder="Your Nft Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            className="newsletter-input mt-5"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            // type="text"
            className="newsletter-input mt-5"
            placeholder="Price (in-USDC) > 0.000001"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
          <input
            type="file"
            className="newsletter-input mt-5"
            placeholder="Upload Image"
            onChange={OnChangeFile}
            required
          />
          <p>{message}</p>

          <button
            type="submit"
            className={` mt-5 flex h-20 w-[100%] justify-center text-[2rem] ${
              disableButton ? "disableBtn" : "btn"
            } `}
            aria-label="Submit"
            disabled={disableButton ? true : false}
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default createNftComp;
