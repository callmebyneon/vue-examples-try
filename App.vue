<script>
import GlobalNav from './components/Layout/GlobalNav';

export default {
  components: {
    GlobalNav
  }
}
</script>

<template>
  <global-nav />
  <router-view></router-view>
</template>

<style lang="scss">
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;

    .app-content-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-width: 460px;
      padding: 60px 1rem 1rem;
      position: relative;
      
      & > * {
        // display: block;
        width: 100%;
      }

      & > h1 {
        margin: 2rem 0;
        text-align: center
      }
    }
  }
</style>