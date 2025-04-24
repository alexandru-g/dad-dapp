import React, { useEffect } from "react";
import WalletConnect from "./WalletConnect";
import Button from "./Button";
import { useCounterStore } from "../store/counter";

type Props = {};

const MainPage = (props: Props) => {

    const { counter, increaseCounter, syncCounter } = useCounterStore();

    function handleClick() {
        increaseCounter().catch(() => alert("Error increasing counter"));
    }

    useEffect(() => {
        syncCounter();
    }, []);

    return (
        <div>
            <div className="absolute inset-x-0 flex justify-end p-4">
                <WalletConnect />
            </div>
            <main className="min-h-screen grid place-items-center">
                <div className='flex flex-col items-center'>
                    <p className="text-3xl">Web3 Counter</p>
                    <p className="text-l pt-4">Current value: {counter}</p>
                    <Button onClick={handleClick}>
                        Increase
                    </Button>
                </div>
            </main>
        </div>
    )
};

export default MainPage;
