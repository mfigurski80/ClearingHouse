<template>
  <header id="landing">
    <container-layout class="landing-layout">
      <div class="landing-text">
        <h1><a class="alt-color" href="#">BOND</a> Token ClearingHouse</h1>
        <p>
          A user-oriented clearing house for virtual debt represented by BOND
          NFT tokens
        </p>
        <span class="p-buttonset">
          <Button
            label="Connect a Wallet"
            class="p-button-rounded p-button-gradient"
            icon="pi pi-wallet"
          />
          <Button
            label="Read More"
            class="p-button-rounded p-button-outlined"
            icon="pi pi-angle-double-down"
          />
        </span>
      </div>
      <img
        alt="ClearingHouse Logo"
        src="@/assets/Group_12.svg"
        height="290"
        width="300"
      />
    </container-layout>
  </header>

  <section id="features">
    <container-layout>
      <h2>Features</h2>
      <columns-layout>
        <div class="feature">
          <i class="pi pi-briefcase" />
          <p>
            Gain <strong>granular, low-level access</strong> to the same
            investment vehicles that banks and investment funds use -- exposing
            both the risk and the gains associated.
          </p>
        </div>
        <div class="feature">
          <i class="pi pi-chart-line" />
          <p>
            Free the financial landscape from centralized finance with
            <strong>user-controlled interest rates</strong>, lowering entry
            costs for new debt investors.
          </p>
        </div>
        <div class="feature">
          <i class="pi pi-book" />
          <p>
            Easily create, service, and manage various
            <strong>types of debt derivatives</strong>, including shorts,
            options, and more
          </p>
        </div>
      </columns-layout>
    </container-layout>
  </section>

  <section id="contracts">
    <container-layout>
      <h2>Contracts</h2>
    </container-layout>
  </section>

  <section id="signup">
    <container-layout>
      <h2>Sign Up</h2>
    </container-layout>
  </section>

  <footer></footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";

export default defineComponent({
  name: "HomeView",
  components: { ContainerLayout, Button, ColumnsLayout },
});
</script>

<style scoped lang="scss">
header#landing {
  & > .landing-layout {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .landing-text > * {
      margin-bottom: 40px;
      max-width: 500px;
    }
    & > img {
      margin: 0 70px;
    }
  }
}
section#features {
  background: var(--color-background-alt);
  .feature {
    text-align: center;
    max-width: 300px;
    margin-top: 30px;
    i.pi {
      font-size: 26px;
      padding-bottom: 30px;
    }
  }
}
</style>
