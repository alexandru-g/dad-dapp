import { WalletStrategy } from '@injectivelabs/wallet-strategy'
import { Wallet } from '@injectivelabs/wallet-base'
import { alchemyRpcEndpoint, CHAIN_ID, ETH_CHAIN_ID } from '../utils/constants';
import { getInjectiveAddress, getEthereumAddress } from '@injectivelabs/sdk-ts'

export const walletStrategy = new WalletStrategy({
    chainId: CHAIN_ID,
    ethereumOptions: {
      ethereumChainId: ETH_CHAIN_ID,
      rpcUrl: alchemyRpcEndpoint
    },
    strategies: {},
});

export const getAddress = async (wallet: Wallet): Promise<string> => {
    walletStrategy.setWallet(wallet ?? Wallet.Keplr);
    const addresses = await walletStrategy.getAddresses();
    const address = addresses[0];
    let injectiveAddress;
    if (address.startsWith('0x')) {
        injectiveAddress = getInjectiveAddress(address);
    } else {
        injectiveAddress = address;
    }
    return injectiveAddress;
}