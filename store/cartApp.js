const state = () => ({});

const getters = {};

const mutations = {
	updateState(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
