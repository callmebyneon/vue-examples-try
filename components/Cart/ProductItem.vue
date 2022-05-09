<script>
import { mapActions } from 'vuex';
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
  },
  methods: {
    ...mapActions('cartApp', [
      'addToCart'
    ])
  }
}
</script>

<template>
  <div class="item_product">
    <button
      :disabled="isSoldOut"
      @click="addToCart(product)"
    >{{isSoldOut ? 'Sold Out' : 'Add to Cart'}}</button>
    <product :product="product" />
  </div>
</template>

<style lang="scss">
  .item_product {
    display: flex;
    align-items: center;

    button {
      margin-right: 1em;
      padding: 0 1em;
      font-size: 12px;
      line-height: 2em;
    }
  }
</style>
