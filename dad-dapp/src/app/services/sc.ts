import { getAddress, walletStrategy } from "./wallet";
import { Wallet } from '@injectivelabs/wallet-base'
import {
    MsgExecuteContractCompat,
    BaseAccount,
    ChainRestAuthApi,
    createTransaction,
    ChainRestTendermintApi,
    createTxRawFromSigResponse,
    ChainGrpcWasmApi,
    toBase64,
    fromBase64,
  } from "@injectivelabs/sdk-ts";
import { BigNumberInBase } from "@injectivelabs/utils";
import { getStdFee, DEFAULT_BLOCK_TIMEOUT_HEIGHT } from "@injectivelabs/utils";
import { getNetworkEndpoints } from "@injectivelabs/networks";
import { CHAIN_ID, CHAIN_ID_STR, CONTRACT_ADDRESS, NETWORK } from "../utils/constants";

export const increaseCounter = async (): Promise<void> => {
    const injectiveAddress = await getAddress(Wallet.Keplr);
    const networkEndpoints = getNetworkEndpoints(NETWORK);
    const restEndpoint = networkEndpoints.rest;

    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
        injectiveAddress
    );
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);

    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
        DEFAULT_BLOCK_TIMEOUT_HEIGHT
    );

    const msg = MsgExecuteContractCompat.fromJSON({
        sender: injectiveAddress,
        contractAddress: CONTRACT_ADDRESS,
        msg: {
            increment: {},
        }
    });

    const pubKey = await walletStrategy.getPubKey();

    const { txRaw, signDoc } = createTransaction({
        pubKey,
        chainId: CHAIN_ID_STR,
        fee: getStdFee({}),
        message: msg,
        sequence: baseAccount.sequence,
        timeoutHeight: timeoutHeight.toNumber(),
        accountNumber: baseAccount.accountNumber,
    });

    const signResponse = await walletStrategy.signCosmosTransaction(
        {
            address: injectiveAddress,
            txRaw,
            accountNumber: baseAccount.accountNumber,
            chainId: CHAIN_ID_STR,
        }
    );
    console.log(signResponse);
    
    const signedTx = createTxRawFromSigResponse(signResponse);
    try {
        const sendResponse = await walletStrategy.sendTransaction(
            signedTx,
            {
                address: injectiveAddress,
                chainId: CHAIN_ID,
                endpoints: networkEndpoints,
            }
        );
        console.log(sendResponse);
    } catch (error) {
        console.log(error);
    }
}

export const getCounter = async (): Promise<number> => {
    const networkEndpoints = getNetworkEndpoints(NETWORK);
    const grpcEndpoint = networkEndpoints.grpc;
    const chainGrpcWasmApi = new ChainGrpcWasmApi(grpcEndpoint);

    const response = (await chainGrpcWasmApi.fetchSmartContractState(
        CONTRACT_ADDRESS,
        toBase64({ get_count: {} })
    )) as { data: string };

    const { count } = fromBase64(response.data) as { count: number }
    
    return count;
};