<template>
  <main class="home">
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
              class="p-button-rounded"
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
        <columns-layout class="section">
          <div class="feature">
            <i class="pi pi-globe" />
          </div>
          <div class="feature">
            <p>hi</p>
          </div>
        </columns-layout>
      </container-layout>
    </section>

    <section id="contracts"></section>

    <section id="signup"></section>

    <footer></footer>
  </main>
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
.alt-color {
  color: var(--color-secondary);
  font-weight: 900;
  text-decoration: underline;
}
.section,
section {
  padding: 40px 0 60px 0;
}
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
    i.pi {
      font-size: 26px;
    }
  }
}
</style>
