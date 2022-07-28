<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px 50px;
}
@media only screen and (max-width: 1000px) {
  .container {
    padding: 15px 20px;
  }
}
</style>
