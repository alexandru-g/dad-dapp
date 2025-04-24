import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getCounter, increaseCounter } from "../app/services/sc";

type CounterState = {
    counter: number;
    increaseCounter: () => Promise<void>;
    syncCounter: () => Promise<void>;
}

export const useCounterStore = create<CounterState>()(
    persist(
        (set, get) => ({
            counter: 0,
            increaseCounter: async () => {
                await increaseCounter();

                // set({
                //     counter: get().counter + 1,
                // });
                const value = await getCounter();

                set({
                    counter: value,
                });
            },
            syncCounter: async () => {
                const value = await getCounter();

                set({
                    counter: value,
                });
            }
        }),
        {
            name: 'wallet-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
