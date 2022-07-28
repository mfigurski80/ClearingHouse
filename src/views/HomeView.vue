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
        <img
          alt="ClearingHouse Logo"
          src="@/assets/Group_12.svg"
          height="290"
          width="300"
        />
      </ContainerLayout>
    </header>

    <section class="features">
      <ContainerLayout class="features-layout">
        <h2>Features</h2>
      </ContainerLayout>
    </section>

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
section.features {
}
</style>
