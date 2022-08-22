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
import Button from "primevue/button";
const router = useRouter();

import { ConnectionStatus, useWeb3 } from "@/composables/web3";

const { status, wallet, connect } = useWeb3();

const handleConnect = computed(
  () => () => {
    if (status.value === ConnectionStatus.CONNECTED) {
      router.push("/dashboard");
    } else {
      connect().then(() => {
        router.push("/dashboard");
      });
    }
  },
  [status]
);

const buttonLabel = computed(() => {
  return status.value === ConnectionStatus.CONNECTED
    ? `${wallet.value.slice(0, 7)}...${wallet.value.slice(-6)}`
    : "Connect a Wallet";
}, [status, wallet]);
</script>
