<template>
  <Button
    @click="connect"
    class="p-button-rounded p-button-gradient"
    :icon="
      status === ConnectionStatus.CONNECTED ? 'pi pi-check' : 'pi pi-wallet'
    "
    :class="props.class"
    :loading="status === ConnectionStatus.CONNECTING"
    :disabled="status === ConnectionStatus.NEED_PROVIDER"
    :label="
      status === ConnectionStatus.CONNECTED
        ? `${wallet.slice(0, 7)}...${wallet.slice(-6)}`
        : 'Connect a Wallet'
    "
  />
</template>

<script lang="ts" setup>
import useWeb3, { ConnectionStatus } from "@/composables/useWeb3";
import Button from "primevue/button";

const props = defineProps<{ class?: string }>();

const { status, wallet, connect } = useWeb3();
</script>
