<template>
  <Button
    @click.prevent="handleConnect"
    class="p-button-rounded p-button-gradient"
    :icon="
      status === ConnectionStatus.CONNECTED ? 'pi pi-check' : 'pi pi-wallet'
    "
    :loading="status === ConnectionStatus.CONNECTING"
    :disabled="status === ConnectionStatus.NEED_PROVIDER"
    :label="buttonLabel"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import Button from "primevue/button";

import { ConnectionStatus, useWeb3 } from "@/composables/web3";

const { status, wallet, connect } = useWeb3();

const handleConnect = async () => {
  if (status.value !== ConnectionStatus.CONNECTED) {
    await connect();
  }
  router.push("/dashboard");
};

const buttonLabel = computed(() => {
  return status.value === ConnectionStatus.CONNECTED
    ? `${wallet.value.slice(0, 7)}...${wallet.value.slice(-6)}`
    : "Connect a Wallet";
}, [status, wallet]);
</script>
