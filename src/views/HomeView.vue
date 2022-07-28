<template>
  <main class="home">
    <header class="landing">
      <ContainerLayout class="landing-layout">
        <div class="landing-text">
          <h1>BOND Token ClearingHouse</h1>
          <p>
            A user-oriented clearing house for virtual debt represented by BOND
            NFT tokens
          </p>
          <span class="p-buttonset">
            <Button label="Connect a Wallet" />
            <Button label="Read More" class="p-button-outlined" />
          </span>
        </div>
        <img alt="Vue logo" src="@/assets/logo.png" />
      </ContainerLayout>
    </header>

    <section class="features"></section>

    <section class="contracts"></section>

    <section class="signup"></section>

    <footer></footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

import ContainerLayout from "@/layouts/ContainerLayout.vue";

export default defineComponent({
  name: "HomeView",
  components: { ContainerLayout, Button },
});
</script>

<style scoped lang="scss">
header.landing {
  & > .landing-layout {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    & > .landing-text > * {
      margin-bottom: 40px;
      max-width: 500px;
    }
  }
}
</style>
