import { api } from "../../utils/api";
import { useRouter } from "next/router";
// import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
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
            // appLogo:
            //   "https://xoltanmarketplace.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1f95e391.svg&w=1920&q=75", // Your dApp Logo URL
            // theme: "light", // "light" | "dark" | "auto"
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

  return (
    <>
      {isLoading ? (
        <button>Login</button>
      ) : (
        <button onClick={loginHandle}>Login</button>
      )}
    </>
  );
}
