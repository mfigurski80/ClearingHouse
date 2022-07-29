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
        <social-icons class="social-icons" />
      </div>
      <img alt="ClearingHouse Logo" src="@/assets/Group_12_2.png" width="300" />
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
          <h3>Access</h3>
          <p>
            Gain <strong>granular, low-level access</strong> to the same
            investment vehicles that banks and investment funds use -- exposing
            both the risk and the gains associated.
          </p>
        </div>
        <div class="feature">
          <i class="pi pi-chart-line" />
          <h3>Efficiency</h3>
          <p>
            Free the financial landscape from centralized finance with
            <strong>user-controlled interest rates</strong>, lowering entry
            costs for new debt investors and borrowers.
          </p>
        </div>
        <div class="feature">
          <i class="pi pi-book" />
          <h3>Security</h3>
          <p>
            Easily create, service, and manage various
            <strong>forms of debt derivatives and instruments</strong>,
            including: shorts, options, and more
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
      <columns-layout>
        <div class="grow" />
        <div class="contract">
          <h3>LBondManager</h3>
          <h5>Deploy at: ...</h5>
          <p>Library of methods for interacting with Core BOND contract</p>
        </div>

        <div class="contract">
          <h3>Core BOND</h3>
          <h5>Deploy at: ...</h5>
        </div>
        <div class="grow" />
        <div class="contract">
          <p>Upcoming clearinghouse contracts</p>
        </div>
        <div class="grow" />
      </columns-layout>
    </container-layout>
  </section>

  <section id="signup">
    <container-layout>
      <h2 class="section-header-text" @click="copySectionLink('signup')">
        Subscribe + Testing Program
      </h2>
      <p>
        The product is currently in beta/testing phase, slated to fully release
        towards the end of 2022. Sign up to receive regular development updates
        or to directly contribute to the testing effort!
      </p>
      <subscribe-form />
    </container-layout>
  </section>

  <footer class="section">
    <social-icons />
    <h5>
      Have questions or comments? Email me at
      <a href="mailto:miko.f80@gmail.com">miko.f80@gmail.com</a>!
    </h5>
    <h5>
      Check out more of my work <a href="https://meeksfigs.surge.sh">here</a>,
      or read my <a href="https://devlog.surge.sh">blog</a> for updates!
    </h5>
    <h6>Copywrite Mikolaj Figurski (c) 2022</h6>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import SubscribeForm from "@/components/SubscribeForm.vue";
import SocialIcons from "@/components/SocialIcons.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Button,
    ContainerLayout,
    ColumnsLayout,
    SubscribeForm,
    SocialIcons,
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
  margin-bottom: 12px;
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
    & > .landing-text {
      max-width: 500px;
      & > * {
        margin-bottom: 35px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      & > .social-icons {
        font-size: 18px;
      }
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
    margin-top: 22px;
    & > * {
      padding: 8px 0;
    }
    i.pi {
      font-size: 26px;
    }
  }
}

section#contracts {
  p {
    max-width: 700px;
  }
  .grow {
    flex: 1;
    flex-shrink: 1;
  }
  .contract {
    width: 300px;
    padding: 20px;
    padding-top: 10px;
    margin: 30px 0 20px;
    border-radius: 20px;
    background: var(--color-background-alt);
    & > * {
      margin: 16px 0 0;
    }
  }
}

section#signup {
  background: url(@/assets/grain-texture-2-.06.png) center center repeat,
    var(--gradient-primary-secondary);
  border-radius: 30px;
  margin: 0 7px;
  margin-bottom: -40px;
  position: relative;
  z-index: 1;
  color: var(--color-background-alt);
  box-shadow: var(--shadow-1);
  h2 {
    color: var(--color-background-alt);
  }
  p {
    max-width: 700px;
  }
}

footer {
  padding-top: 80px;
  background: var(--color-background-alt);
  color: var(--color-text-alt);
  text-align: center;
  & > * {
    padding: 6px;
  }
}
</style>
