<script>
export default {
  name: 'Product',
  props: {
    product: Object
  }
}
</script>

<template>
  <p>{{ product.title }} - <b>&#36;{{ product.price }}</b> x <em>{{ product.inventory }}</em></p>
</template>