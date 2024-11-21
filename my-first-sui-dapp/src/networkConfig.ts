import { getFullnodeUrl } from "@mysten/sui/client";
import { 
  DEVNET_COUNTER_PACKAGE_ID,
  TESTNET_COUNTER_PACKAGE_ID,
  MAINNET_COUNTER_PACKAGE_ID
} from "./constants";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: { DEVNET_COUNTER_PACKAGE_ID }
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: { TESTNET_COUNTER_PACKAGE_ID }
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: { MAINNET_COUNTER_PACKAGE_ID }
    }
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
