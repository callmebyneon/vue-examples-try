<script>
import { mapActions, mapState } from 'vuex';
import Product from './Product';
export default {
  name: 'MyCart',
  components: {
    Product
  },
  computed: {
    total () {
      return this.products.price.reduce((prev, curr) => prev + curr, 10, 0).toFixed(2);
    },
    isEmpty () {
      return this.products?.length > 0
    },
    ...mapState('cartApp', [
      'products'
    ])
  },
  methods: {
    ...mapActions('cartApp', [
      'onCheckoutClicked'
    ])
  }
}
</script>

<template>
  <product v-if="isEmpty" :product="product" />
  <p v-else><em>Please add some products to cart.</em></p>
  <p>Total: &#36;{{ total }}</p>
  <button
    :disabled="isEmpty"
    @click="onCheckoutClicked"
  >
    Checkout
  </button>
</template>

<style lang="scss">
  
</style>