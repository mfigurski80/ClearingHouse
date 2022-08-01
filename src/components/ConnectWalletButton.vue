<template>
  <p>Status: {{ statusTextOptions[status] }} ({{ status }}) {{ wallet }}</p>
  <button @click="connect">Connect</button>
</template>

<script lang="ts" setup>
import useWeb3, { ConnectionStatus } from "@/composables/useWeb3";

const { status, wallet, connect } = useWeb3();

const statusTextOptions: { [key in ConnectionStatus]: string } = {
  [ConnectionStatus.NEED_PROVIDER]: "No provider",
  [ConnectionStatus.CONNECTED]: "Connected",
  [ConnectionStatus.CONNECTING]: "Connecting...",
  [ConnectionStatus.DISCONNECTED]: "Disconnected",
};
</script>
