import shop from '../api/shop';

const state = () => ({
	cart: [],
	products: null,
});

const getters = {
	//
};

const mutations = {
	loadProducts(state, payload) {
		state.products = payload;
	},
	updateState(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

const actions = {
	initDB({ commit }) {
		const products = shop.getProducts();
		console.log(products);
		commit('loadProducts', products);
	},
	onCheckoutClicked(context, payload) {},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
