import React, { useEffect } from "react";
import { sequence } from "0xsequence";
import Web3Modal from "@0xsequence/web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useLazyQuery, useMutation } from "@apollo/client";
import ButtonFunctionCall from "../components/Button/ButtonFunctionCall";
import lensHubABI from "../utils/lensHubABI.json";
import { ADDRESS } from "../utils/constants";
import { GET_PROFILES } from "../graphQL/queries";
import { useAuth } from "../hooks/useAuth";
import { AUTHENTICATION, GET_CHALLENGE } from "../graphQL/mutations";

// Configure  wallet
let providerOptions = {
    walletconnect: {
        package: WalletConnect,
        options: {
            infuraId: "xxx-your-infura-id-her",
        },
    },
};

if (!window?.ethereum?.isSequence) {
    providerOptions = {
        ...providerOptions,
        sequence: {
            package: sequence,
            options: {
                appName: "RTU Connect",
                defaultNetwork: "polygon",
            },
        },
    };
}

const web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
});

function Wallet() {
    const [getProfiles, profiles] = useLazyQuery(GET_PROFILES);
    const [getChallenge, challengeData] = useLazyQuery(GET_CHALLENGE);
    const [mutateAuth, authData] = useMutation(AUTHENTICATION);

    const {
        lensHubData, walletData, profileData, profile, login, wallet,
    } = useAuth();

    const connectWallet = async () => {
        const wallet = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(wallet);

        if (wallet.sequence) {
            (provider).sequence = wallet.sequence;
        }

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const contract = new ethers.Contract(ADDRESS.lensHub, lensHubABI, signer);

        lensHubData(contract);
        provider.getBalance(address).then((balance) => {
            // convert a currency unit from wei to ether
            const balanceInEth = ethers.utils.formatEther(balance);
            walletData({
                ...wallet, signer, address, balanceInEth,
            });
        });

        await getProfiles({
            variables: {
                request: {
                    ownedBy: address,
                },
            },
        });
    };

    const handleGetChallenge = async () => {
        await getChallenge({
            variables: {
                request: {
                    address: wallet.address,
                },
            },
        });
    };

    useEffect(() => {
        if (!profiles.data) return;
        console.log(profiles.data.profiles.items);

        console.log("hey", Object.entries(profile).length !== 0);
        const data = profiles.data.profiles.items[0];
        profileData(data !== undefined ? data : {});
    }, [profiles.data]);

    useEffect(() => {
        if (!challengeData.data) return;

        const handleSign = async () => {
            // eslint-disable-next-line max-len
            const signature = await wallet.signer.signMessage(challengeData.data.challenge.text);
            await mutateAuth({
                variables: {
                    request: {
                        address: wallet.address,
                        signature,
                    },
                },
            });
        };

        handleSign();
    }, [challengeData.data]);

    useEffect(() => {
        if (!authData.data) return;

        login({
            "lensToken": authData.data.authenticate.accessToken,
        });
    }, [authData.data]);
    
    // const connectWeb3Modal = async () => {
    //     if (web3Modal.cachedProvider) {
    //         web3Modal.clearCachedProvider();
    //     }
    //     connectWallet();
    // };

    return (
        <div className={"container flex items-center justify-center mx-auto h-screen"}>
            <div className={"flex w-full justify-center px-6"}>
                <div className={"shadow-md bg-white items-center w-full flex"} style={{ height: "500px" }}>
                    <div className={"w-1/2  p-5 rounded-lg lg:rounded-r-none"}>
                        <div className={"px-8 pb-8 mb-8"}>
                            <img
                                className={"mx-auto"}
                                src={require("../images/RTULogo.png")}
                                alt={"logo of RTU"}
                            />
                        </div>
                        <div className={"text-center flex items-center justify-center"}>
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {Object?.entries(profile).length === 0
                                ? (
                                    <ButtonFunctionCall
                                        func={connectWallet}
                                        text={"Connect Wallet"}
                                    />
                                )
                                : (
                                    <ButtonFunctionCall
                                        func={handleGetChallenge}
                                        text={"Sign In"}
                                    />

                                )}
                        </div>
                        <hr className={"my-6"} />
                        <div className={"text-center m-4"}>
                            <a
                                className={"inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"}
                                href={"/create-handle"}
                            >
                                {"Don"}
                                &apos;
                                {"t have an Handle? Create an handle now!"}
                            </a>
                        </div>
                    </div>
                    <div
                        className={"w-1/2 h-full bg-cover rounded-r-lg"}
                        style={{ backgroundImage: `url(${require("../images/rtu.jpg")})` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Wallet;
