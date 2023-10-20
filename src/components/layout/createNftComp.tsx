import React, { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";

const createNftComp = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [ownerAddress, setOwnerAddress] = useState(); // wallet address
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [tokenId, setTokenId] = useState(null);
  const [tokenIdForListing, setTokenIdForListing] = useState(null);
  const [openListingModal, setOpenListingModal] = useState(false);
  const [openAnimation, setOpenAnimation] = useState(false);

  const active = true;
  const sellerAddress = "0xCDeD68e89f67d6262F82482C2710Ddd52492808a";
  const contractAddress = "0x43c99947D6E25497Dc69351FaBb3025F7ACC2A6b";

  async function OnChangeFile(e: any) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS

      updateMessage("Uploading image.. please dont click anything!");
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        updateMessage("");
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setIpfsHash(response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function uploadMetadataToIPFS() {
    //Make sure that none of the fields are empty
    if (!title || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      title,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
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
            required
          />

          <input
            type="text"
            className="newsletter-input mt-5"
            placeholder="Description"
            required
          />
          <input
            // type="text"
            className="newsletter-input mt-5"
            placeholder="Price (in-USDC) > 0.000001"
            required
          />
          <input
            type="file"
            className="newsletter-input mt-5"
            placeholder="Upload Image"
            onChange={OnChangeFile}
            required
          />

          <button
            type="submit"
            className="btn mt-5 flex h-20 w-[100%] justify-center text-[2rem] "
            aria-label="Submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default createNftComp;
