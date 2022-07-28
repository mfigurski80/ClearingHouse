<template>
  <header id="landing">
    <container-layout class="landing-layout">
      <div class="landing-text">
        <h1>
          <a class="alt-color" href="http://mfigurski80.github.io/karmaToken"
            >BOND</a
          >
          Token ClearingHouse
        </h1>
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
      <h2 class="section-header-text" @click="copySectionLink('features')">
        Features
      </h2>
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
            costs for new debt investors and borrowers.
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
      <h2 class="section-header-text" @click="copySectionLink('contracts')">
        Contracts
      </h2>
    </container-layout>
  </section>

  <section id="signup">
    <container-layout>
      <h2 class="section-header-text" @click="copySectionLink('signup')">
        Test User Registration
      </h2>
      <test-user-registration />
    </container-layout>
  </section>

  <footer class="section">
    <p>Footer</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import TestUserRegistration from "@/components/TestUserRegistration.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Button,
    ContainerLayout,
    ColumnsLayout,
    TestUserRegistration,
  },
  methods: {
    copySectionLink(sectionId: string) {
      navigator.clipboard.writeText(`${window.location.href}#${sectionId}`);
    },
  },
});
</script>

<style scoped lang="scss">
.section-header-text {
  cursor: pointer;
  display: inline-block;
  position: relative;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease-in-out;
  padding-right: 43px;
  &::before {
    content: "\e9c1";
    font-family: "primeicons";
    font-size: 24px;
    padding: 4px;
    position: absolute;
    right: 4px;
    top: 0px;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }
  &:hover {
    // text-decoration: underline;
    border-color: inherit;
    &::before {
      opacity: 1;
    }
  }
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
  box-shadow: var(--shadow-1);
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

section#signup {
  background: url(@/assets/grain-texture-2-.06.png) center center repeat,
    var(--gradient-primary-secondary);
  border-radius: 30px;
  margin: 0 7px;
  margin-bottom: -40px;
  color: var(--color-background-alt);
  box-shadow: var(--shadow-1);

  h2 {
    color: var(--color-background-alt);
  }
}

footer {
  position: relative;
  z-index: -1;
  padding-top: 80px;
  background: var(--color-background-alt);
}
</style>
