import { create } from "zustand";
import { getAddress } from "../app/services/wallet";
import { Wallet } from '@injectivelabs/wallet-base';
import { createJSONStorage, persist } from "zustand/middleware";

type WalletState = {
    address: string;
    connectWallet: (wallet: Wallet) => Promise<void>;
}

export const useWalletStore = create<WalletState>()(
    persist(
        (set, get) => ({
            address: "",
            connectWallet: async (wallet: Wallet) => {
                if (get().address) {
                    set({address: ""});
                    return;
                }

                const address = await getAddress(wallet);

                set({
                    address: address
                });
            }
        }),
        {
            name: 'wallet-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
