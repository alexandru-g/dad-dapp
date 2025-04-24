import React from "react";
import Button from "./Button";
import { useWalletStore } from "../store/wallet";
import { Wallet } from '@injectivelabs/wallet-base';

type Props = {};

const WalletConnect = (props: Props) => {
    const { address, connectWallet } = useWalletStore();

    function handleClick() {
        connectWallet(Wallet.Keplr).catch(() => alert("Error connecting wallet"));
    }

    return (
        <Button onClick={handleClick}>
            {address ? address : "Connect" }
        </Button>
    )
};

export default WalletConnect;
