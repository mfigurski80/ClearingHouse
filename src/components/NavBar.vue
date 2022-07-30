<template>
  <div class="layout">
    <div class="nav-container" :class="{ mobile: isMobileVersion }">
      <Sidebar
        :visible="visibleLeft || !isMobileVersion"
        @hide="hideSidebar()"
        @show="showSidebar()"
        dismissable="true"
        modal="true"
        :showCloseIcon="false"
        class="sidebar-container p-sidebar-sm"
      >
        <template v-slot:header>
          <div
            v-if="isMobileVersion"
            class="toggle-sidebar-button-spacing"
          ></div>
          <slot name="header"></slot>
        </template>
        <nav class="nav">
          <router-link to="/">
            <i class="pi pi-home" />
          </router-link>
          <router-link to="/not-implemented">
            <i class="pi pi-chart-bar" />
          </router-link>
          <router-link to="/not-implemented">
            <i class="pi pi-search" />
          </router-link>
          <div style="flex: 1"></div>
          <router-link to="/not-implemented">
            <i class="pi pi-user"></i>
          </router-link>
        </nav>
      </Sidebar>
      <Button
        v-if="!visibleLeft"
        @click="showSidebar"
        icon="pi pi-bars"
        class="p-button-rounded p-button-text p-button-icon-only toggle-sidebar-button"
      />
      <Button
        v-if="visibleLeft"
        @click="hideSidebar"
        icon="pi pi-times"
        class="p-button-rounded p-button-text p-button-icon-only toggle-sidebar-button"
      />
    </div>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

const MOBILE_BREAKPOINT = 1000;

export default defineComponent({
  name: "NavbarLayout",
  components: { Sidebar, Button },
  data: () => ({
    visibleLeft: false,
    isMobileVersion: window.innerWidth < MOBILE_BREAKPOINT,
  }),
  mounted() {
    window.addEventListener("resize", this.checkIsMobileVersion);
  },
  unmounted() {
    window.removeEventListener("resize", this.checkIsMobileVersion);
  },
  methods: {
    checkIsMobileVersion() {
      let isNowMobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (!this.isMobileVersion && isNowMobile) {
        this.visibleLeft = false;
      } else if (this.isMobileVersion && !isNowMobile) {
        this.visibleLeft = true;
      }
      this.isMobileVersion = isNowMobile;
    },
    hideSidebar() {
      if (this.isMobileVersion) {
        this.visibleLeft = false;
      }
    },
    showSidebar() {
      this.visibleLeft = true;
    },
  },
});
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: row;
  gap: 0;
  height: 100vh;
}

.nav-container {
  width: 70px;
  flex: 0 0 70px;
  background: inherit;
  &.mobile {
    width: 0;
    flex: 0 0 0px;
    background: red;
  }
}
.nav {
  color: var(--color-text);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  & i.pi {
    font-size: 20px;
    padding: 19px 0;
  }
}
.toggle-sidebar-button {
  position: absolute;
  top: 20px;
  left: 25px;
  z-index: 2000;
  display: none;
  &-spacing {
    height: 65px;
  }
}
main {
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
  flex: 1;
}
@media only screen and (max-width: 1000px) {
  .toggle-sidebar-button {
    display: block;
  }
  .nav i.pi {
    padding: 26px 0;
  }
}
</style>
<style lang="scss">
.p-sidebar.p-sidebar-active.p-sidebar-sm {
  width: 70px;
}
.p-sidebar-mask {
  display: none;
}
@media only screen and (max-width: 1000px) {
  .p-sidebar.p-sidebar-active.p-sidebar-sm {
    width: 100px;
  }
  .p-sidebar-mask {
    display: block;
  }
}
</style>
