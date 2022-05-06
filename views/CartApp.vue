<script>
import { createNamespacedHelpers } from 'vuex';
import ProductItem from '../components/Cart/ProductItem';
import MyCart from '../components/Cart/MyCart';

const { mapState, mapActions } = createNamespacedHelpers('cartApp');

export default {
  name: 'CartApp',
  components: {
    ProductItem,
    MyCart
  },
  computed: {
    ...mapState([
      'cart',
      'products'
    ])
  },
  created () {
    this.initDB();
    console.log('%c Cart app created!', 'color: yellow;');
  },
  methods: {
    ...mapActions([
      'initDB',
    ])
  }
}
</script>

<template>
  <div class="cart-app app-content-box">
    <h1>Shopping Cart Example</h1>
    <hr />
    <div class="cart-app__items">
      <h3>Products</h3>
      <product-item 
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <hr />
    <div class="cart-app__cart">
      <h3>Your Cart</h3>
      <!-- <my-cart /> -->
    </div>
  </div>
</template>

<style lang="scss">
  
</style>