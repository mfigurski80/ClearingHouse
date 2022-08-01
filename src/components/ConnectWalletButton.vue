<template>
  <Button
    @click.prevent="handleConnect"
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";

import useWeb3, { ConnectionStatus } from "@/composables/useWeb3";

const props = defineProps<{ class?: string }>();
const router = useRouter();

const { status, wallet, connect } = useWeb3();

const handleConnect = reactive(() => {
  if (status === ConnectionStatus.CONNECTED) {
    router.push("/dashboard");
  } else {
    connect().then(() => {
      router.push("/dashboard");
    });
  }
});
</script>
