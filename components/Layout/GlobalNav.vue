<script>
export default {
  name: 'GlobalNav'
}
</script>

<template>
  <nav class="custom-nav">
    <ul>
      <li>
        <router-link to="/">todos</router-link>
      </li>
      <li>
        <router-link to="/async">async load</router-link>
      </li>
      <li>
        <router-link to="/cart">shopping cart</router-link>
      </li>
      <li>
        <router-link to="/ismatch"><i>Is this existed page?</i></router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
  .custom-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 16px;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    z-index: 9;

    & > ul {
      display: flex;
      flex-direction: row;
    }

    & > ul > li {
      margin: 1rem;

      &.disabled {
        color: #cbc8c8;

        & a { cursor: not-allowed }
      }
    }

    & > ul > li a {
      color: inherit;
      text-decoration: none;
      
      &:active, &:visited {
        color: inherit;
      }

      &.router-link-exact-active {
        // color: rgb(0, 0, 163);
        border-bottom: 1px solid;
      }
    }
  }
</style>