<script>
import { mapActions, mapState } from 'vuex';
import Product from './Product';
export default {
  name: 'MyCart',
  components: {
    Product
  },
  computed: {
    cartItems() {
      return Object.values(this.cart);
    },
    total () {
      return this.cartItems.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);
    },
    isEmpty () {
      return this.cartItems.reduce((prev, curr) => prev + parseInt(curr.inventory, 10), 0);
    },
    ...mapState('cartApp', [
      'cart'
    ])
  },
  methods: {
    ...mapActions('cartApp', [
      'onCheckout'
    ])
  }
}
</script>

<template>
  <div v-if="isEmpty">
    <product v-for="item in cartItems" :key="item.id" :product="item" />
  </div>
  <div v-else><em>Please add some products to cart.</em></div>
  <p>Total: &#36;{{ total }}</p>
  <button
    :disabled="!isEmpty"
    @click="onCheckout"
  >
    Checkout
  </button>
</template>

<style lang="scss">
  
</style>