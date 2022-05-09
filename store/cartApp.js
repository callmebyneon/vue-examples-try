import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import shop from '../api/shop';

const state = () => ({
	cart: {},
	products: null,
});

const getters = {
	//
};

const mutations = {
	loadProducts(state, payload) {
		state.products = payload;
	},
	addToCart(state, product) {
		// inventory -1
		product.inventory--;
		// add item to cart
		console.log('before add to cart:', state.cart);
		if (state.cart[product.id]) {
			state.cart[product.id].inventory++;
		} else {
			state.cart[product.id] = {
				...product,
				inventory: 1
			};
		}
		console.log(state)
	},
	emptyCart(state) {
		state.cart = {};
		console.log('after empty the cart:', state.cart);
	},
	updateState(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

const actions = {
	initDB({ state, commit }) {
		if (state.products == null) {
			const products = shop.getProducts();
			commit('loadProducts', products);
		}
	},
	addToCart({ commit }, product) {
		commit('addToCart', product);
	},
	onCheckout({ state, commit }) {
		commit('emptyCart');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
