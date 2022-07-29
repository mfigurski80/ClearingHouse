<template>
  <div class="container">
    <div class="box">
      <h2>Under Development</h2>
      <p>
        Hello! You've stumbled onto a section of the app that is still under
        development. Check back later, or
        <a href="./#signup">subscribe</a> to be notified of updates!
      </p>
      <a href="./">Go back to the homepage</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    max-width: 500px;
    text-align: center;
    & > * {
      padding: 15px 0;
    }
  }
}
</style>
