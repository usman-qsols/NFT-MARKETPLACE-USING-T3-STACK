import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Hero from "../layout/hero";
// import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import minilogo from "../../utilities/minilogo.png";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  SmartAccount,
} from "@biconomy/account";
import { bundler, paymaster } from "./constants";
// import { setSmartAccount } from "../../store/slices/web3Smart";
// Web3 AUTH
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";

export default function RegisterPage() {
  // const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const dispatch = useDispatch();

  // Login Mutation
  const loginUser = api.user.createUser.useMutation({
    onSuccess: (res: any) => {
      console.log(res.user, "login res");
    },
    onError: (err: any) => {
      // toast({
      //   title: err.message,
      //   status: "error",
      //   isClosable: true,
      //   position: "top-right",
      //   duration: 3000,
      // });
      setIsLoading(false);
      console.log(err.message, "login err");
    },
  });

  // Check web3Auth---------
  const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID; // get from https://dashboard.web3auth.io

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          uiConfig: {
            appName: "Cryptocrafters", // <-- Your dApp Name
            appLogo: { minilogo }, // Your dApp Logo URL
            theme: "light", // "light" | "dark" | "auto"
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 2, // 2 | 3
            // primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget:
              "https://polygon-mumbai.g.alchemy.com/v2/NY9Ii_ZyaxdBYrOcg4uSk0oF47piStNb", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "testnet",
        });

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            openlogin: {
              label: "openlogin",
              loginMethods: {
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false,
                },
                apple: {
                  name: "apple",
                  showOnModal: false,
                },
                line: {
                  name: "line",
                  showOnModal: false,
                },
                github: {
                  name: "github",
                  showOnModal: false,
                },
                kakao: {
                  name: "kakao",
                  showOnModal: false,
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false,
                },
                twitter: {
                  name: "twitter",
                  showOnModal: false,
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false,
                },
                discord: {
                  name: "discord",
                  showOnModal: false,
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false,
                },
                email_passwordless: {
                  name: "email_passwordless",
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: "sms_passwordless",
                  showOnModal: false,
                },
              },
            },
            // [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
            //   label: "wallet_connect",
            //   showOnModal: false,
            // },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "wallet_connect",
              showOnModal: false,
            },
            // Disable Metamask
            [WALLET_ADAPTERS.METAMASK]: {
              label: "metamask",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "TORUS_EVM",
              showOnModal: false,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const loginHandle = async () => {
    if (!web3auth) {
      return;
    }
    setIsLoading(true);
    const web3authProvider: any = await web3auth.connect();

    // SmartAccount
    setupSmartAccount(web3authProvider);
  };

  async function setupSmartAccount(web3authProvider: any) {
    try {
      // Initialize the smart account
      let web3Provider: any = new ethers.providers.Web3Provider(
        web3authProvider,
      );
      console.log("WEb3 Providers .. ", web3Provider.getSigner());
      const config: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      const smartAccount = new BiconomySmartAccount(config);
      await smartAccount.init();
      console.log("Smart Account : ", smartAccount);
      // Save the smart account to a state variable
      let address = await smartAccount.getSmartAccountAddress();
      let userInfo = web3auth?.getUserInfo();
      let name = (await userInfo)?.name;
      let email = (await userInfo)?.email;

      let value: any = {
        wallet_address: address,
        full_name: name,
        email_address: email,
      };

      let response = await loginUser.mutateAsync(value);
      console.log("REs: ", response);
      if (response.user) {
        // toast({
        //   title: "User Signin Successfully!",
        //   status: "success",
        //   isClosable: true,
        //   position: "top-right",
        //   duration: 3000,
        // });
      }

      localStorage.setItem("user", JSON.stringify(response.user));
      // dispatch(setSmartAccount(smartAccount));

      router.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  let user;
  useEffect(() => {
    user = localStorage.getItem("user");
  });

  return (
    <>
      {/* {isLoading ? (
        <button>Logingin...</button>
      ) : (
        <button onClick={loginHandle}>Login</button>
      )} */}

      {/* <div className="flex w-[100%] flex-col items-center justify-center bg-yellow-400">
        <div>
          <div>
            <div>
              <h1 className="text-4xl font-bold">Hellooo Login</h1>
            </div>
            <div>
              <h1>Cyptocrafters</h1>
            </div>
          </div>
          <div>
            <div>
              <h1>Hellooo Login</h1>
            </div>
            <div>
              <h1>Cyptocrafters</h1>
            </div>
          </div>
        </div>
      </div> */}

      {/* <section className="hero" id="home">
        <div className="container">
          <p className="section-subtitle">Netstorm</p>

          <h2 className="h1 hero-title">
            Discover, collect, and sell extraordinary NFTs
          </h2>

          <p className="hero-text">
            Explore on the world's best & largest NFT marketplace
          </p>

          <div className="btn-group">
            <button className="btn">
              <span>Explore</span>
            </button>

            <button className="btn">
              <span>Create</span>
            </button>
          </div>
        </div>

        <svg
          className="hero-bg-bottom"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 465"
          version="1.1"
        >
          <defs>
            <linearGradient
              x1="49.7965246%"
              y1="28.2355058%"
              x2="49.7778147%"
              y2="98.4657689%"
              id="linearGradient-1"
            >
              <stop stop-color="rgba(69,40,220, 0.15)" offset="0%"></stop>
              <stop stop-color="rgba(87,4,138, 0.15)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <polygon points="" fill="url(#linearGradient-1)">
              <animate
                id="graph-animation"
                xmlns="http://www.w3.org/2000/svg"
                dur="2s"
                repeatCount=""
                attributeName="points"
                values="0,464 0,464 111.6,464 282.5,464 457.4,464 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,323.3 282.5,373 457.4,423.8 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,336.6 457.4,363.5 613.4,414.4 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,323.3 613.4,340 762.3,425.6 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,290.4 762.3,368 912.3,446.4 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,329.6 912.3,420 1068.2,427.6 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,402.4 1068.2,373 1191.2,412 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,336.6 1191.2,334 1328.1,404 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,282 1328.1,314 1440.1,372.8 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,254 1440.1,236 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,144.79999999999998 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,8 1440.1,464 0,464;"
                fill="freeze"
              ></animate>
            </polygon>
          </g>
        </svg>
      </section> */}
      {user ? (
        <Hero create="Create" loginlogoutbtn="Logout" onclick={loginHandle} />
      ) : (
        <Hero create="Create" loginlogoutbtn="Login" onclick={loginHandle} />
      )}
    </>
  );
}
