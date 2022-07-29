<template>
  <div class="container">
    <Card class="card">
      <template #title>
        <h3>{{ name }}</h3>
      </template>
      <template #content>
        <slot>
          <p>{{ description }}</p>
        </slot>
      </template>
      <template #footer>
        <Button
          icon="pi pi-download"
          class="p-button-text p-button-rounded p-button-sm"
          id="download-abi"
          label="Load ABI"
          :disabled="!abiLink"
          @click="downloadABI"
        />
      </template>
    </Card>
    <code class="sub-tag" @click="copyAddress">
      Deployed at:
      {{
        address.startsWith("0x")
          ? address.slice(0, 10) + "...." + address.slice(-6)
          : address
      }}
      <i class="pi pi-copy" v-if="address.startsWith('0x')"></i>
    </code>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

export default defineComponent({
  name: "ContractCard",
  props: {
    name: String,
    description: String,
    address: String,
    abiLink: String,
  },
  components: { Card, Button },
  methods: {
    copyAddress() {
      if (this.address?.startsWith("0x"))
        navigator.clipboard.writeText(this.address);
    },
    downloadABI() {
      if (this.abiLink && this.name) {
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = this.abiLink;
        a.download = `${this.name.replace(" ", "_")}_ABI.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(a.href);
        a.remove();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 280px;
}
.card {
  width: 100%;
  h3 {
    text-align: center;
  }
}
.sub-tag {
  width: 100%;
  display: inline-block;
  font-size: 12px;
  color: var(--color-text-alt);
  padding: 15px 6px;
  overflow-x: scroll;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  i {
    float: right;
    padding: 0px 5px;
  }
  &:hover {
    color: var(--color-text);
  }
}
</style>
