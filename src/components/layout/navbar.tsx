import React, { useState, useEffect } from "react";
import logoImage from "../../utilities/logoImage.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../ui/ui/button";
import { Loader2 } from "lucide-react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/ui/menubar";

type User = {
  balance: number;
  created_at: string;
  email_address: string;
  full_name: string;
  id: string;
  updated_at: string;
  wallet_address: string;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();
  // let user: User = JSON.parse(localStorage.getItem("user") ?? "");
  // let user: User;
  // useEffect(() => {
  //   user = localStorage.getItem("user");
  // if (!user) {
  //   router.push("/login");
  // }
  // });

  let user: User;
  let name;
  let email;
  let wallet_address: string;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      user = JSON.parse(storedUser);
      console.log(user);
      if (user) {
        console.log("user", user);
        name = user.full_name;
        email = user.email_address;
        wallet_address = user.wallet_address;
        setWalletAddress(walletAddress);
        console.log("name", name);
        console.log("email", email);
        console.log("addr", wallet_address);
        setData(true);
      }
    }
  }, []);

  // useEffect(() => {

  // });

  async function logout() {
    try {
      // dispatch(setSmartAccount(undefined));
      localStorage.clear();
      // toast({
      //   title: "Logout Successfully!",
      //   status: "success",
      //   isClosable: true,
      //   position: "top-right",
      //   duration: 3000,
      // });
      router.push("/login");
    } catch (error) {
      // throw new Error(error)
      console.log(error, "error");
    }
  }
  function copyAddress() {
    navigator.clipboard
      .writeText(wallet_address)
      .then(function () {
        alert("Address copied to clipboard: " + wallet_address);
      })
      .catch(function (err) {
        console.error("Unable to copy address: ", err);
      });
  }

  return (
    <nav className="flex flex-wrap items-center justify-between p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white lg:mr-72">
        {/* <img src={logoImage} className="w-100 mr-2 h-10" alt="Logo" /> */}
        <Image
          onClick={() => router.push("/")}
          src={logoImage}
          className="h-15 mr-2 w-80 cursor-pointer"
          alt="Logo"
        ></Image>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black-500 hover:text-black-400 flex items-center rounded px-3 py-2"
        >
          <svg
            className={`h-10 w-10 fill-current ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`h-10 w-10 fill-current ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`block w-full flex-grow lg:flex lg:w-auto lg:items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="/exploreNfts"
            className="text-white-200 mr-8 mt-4 block text-[1.6rem] font-bold hover:text-purple-600 active:text-red-500 lg:mt-0 lg:inline-block"
          >
            Explore Nfts
          </a>
          <a
            href="/createNft"
            className="text-white-200 mr-8 mt-4 block text-[1.6rem] font-bold hover:text-purple-600 active:text-red-500 lg:mt-0 lg:inline-block"
          >
            Create Nft
          </a>
          {data ? (
            <a
              // href=""
              className="text-white-200 mr-4 mt-4 block text-[1.6rem] font-bold hover:text-purple-600 active:text-red-500 lg:mt-0 lg:inline-block"
            >
              <Menubar className="w-[90px]">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer border-0 text-[1.6rem] font-bold">
                    Profile
                  </MenubarTrigger>
                  <MenubarContent>
                    {/* <MenubarRadioGroup value="benoit"> */}
                    <MenubarRadioItem value="andy" className="text-[1.3rem]">
                      {name ?? "Usman Rahim"}
                    </MenubarRadioItem>
                    <MenubarRadioItem value="benoit" className="text-[1.3rem]">
                      {email ?? "usmanrahim2000@gmail.com"}
                    </MenubarRadioItem>
                    <MenubarRadioItem value="Luis" className="text-[1.3rem]">
                      {walletAddress ?? "0x00000000000000000000000000000000000"}
                    </MenubarRadioItem>
                    {/* </MenubarRadioGroup> */}
                    {/* <MenubarSeparator />
                  <MenubarItem inset>Edit...</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem inset>Add Profile...</MenubarItem> */}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </a>
          ) : (
            ""
          )}

          {/* <a
          href="#"
          className="text-white-200 mr-4 mt-4 block text-lg lg:mt-0 lg:inline-block"
        >
          Fourth Link
        </a> */}
        </div>
        <div>
          {/* <button className="inline-flex items-center border-0 bg-red-900 px-4 py-2 text-white">
          Click Me
        </button> */}
          {data ? (
            <div className="flex flex-row">
              <p
                className="btn mr-4 flex h-20 w-[180px] justify-center text-[1.8rem]"
                onClick={copyAddress}
              >
                0x00000000...
              </p>
              <button
                className="btn flex h-20 w-[120px] justify-center text-[1.8rem]"
                onClick={logout}
              >
                <span>Logout</span>
              </button>
            </div>
          ) : (
            // <Button
            //   variant="destructive"
            //   className="rounded bg-red-900 text-lg"
            // >
            //   Login
            // </Button>
            ""
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
