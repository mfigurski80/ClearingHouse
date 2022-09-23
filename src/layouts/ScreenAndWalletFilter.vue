<template>
  <missing-content
    v-if="width < 1100"
    title="Screen Size is Too Small"
    subtitle="Please view the dashboard page on a large screen size"
  />
  <missing-content
    v-else-if="status !== ConnectionStatus.CONNECTED"
    title="Not Connected"
    subtitle="Please connect a wallet to view the dashboard"
  >
    <ConnectWalletButton />
  </missing-content>
  <missing-content
    v-else-if="!contracts.Core || !contracts.LBondManager"
    title="Unsupported Network"
    subtitle="There are no contracts available on this network. Please connect to a supported network: (Goerli), or send us a message if you would like to see support for another network!"
  />
  <slot v-else>
    <p>CONTENT filtered to ensure screen size and wallet connection</p>
  </slot>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { status, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";

import MissingContent from "@/components/MissingContent.vue";
import ConnectWalletButton from "@/components/ConnectWalletButton.vue";

const { width } = useWindowSize();
const { contracts } = useContracts();
</script>
