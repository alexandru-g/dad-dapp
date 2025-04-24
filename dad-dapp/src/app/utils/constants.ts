import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";
import { Network } from "@injectivelabs/networks";

const env = {
    VITE_NETWORK: import.meta.env.VITE_NETWORK as string,
    VITE_CHAIN_ID: import.meta.env.VITE_CHAIN_ID as string,
    VITE_ALCHEMY_KEY: import.meta.env.VITE_ALCHEMY_KEY as string,
    VITE_SC_CONTRACT: import.meta.env.VITE_SC_CONTRACT as string,
}

export const alchemyRpcEndpoint = `https://eth-mainnet.alchemyapi.io/v2/${env.VITE_ALCHEMY_KEY}`

export const CHAIN_ID = (env.VITE_NETWORK == 'testnet' ? ChainId.Testnet : ChainId.Mainnet);
export const CHAIN_ID_STR = env.VITE_CHAIN_ID;
export const NETWORK = (env.VITE_NETWORK == 'testnet' ? Network.Testnet : Network.Mainnet);
export const ETH_CHAIN_ID = (env.VITE_NETWORK == 'testnet' ? EthereumChainId.Sepolia : EthereumChainId.Mainnet);
export const CONTRACT_ADDRESS = env.VITE_SC_CONTRACT;