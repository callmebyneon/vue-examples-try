<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <h1>{{ greeting }}</h1>
</template>

<style lang="scss">
$color: red;

h1 {
  color: $color;
  display: flex;
}
</style>