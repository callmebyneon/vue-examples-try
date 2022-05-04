<script>
import Product from './Product';
export default {
  name: 'ProductItem',
    props: {
      product: Object
    },
  components: {
    Product
  },
  computed: {
    isSoldOut () {
      return this.product.inventory <= 0
    }
  }
}
</script>

<template>
  <div>
    <product :product="product" />
    <button
      :disabled="isSoldOut"
    >{{isSoldOut ? 'Add to Cart' : 'Sold Out'}}</button>
  </div>
</template>
