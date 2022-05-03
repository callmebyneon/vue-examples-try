import axios from 'axios';

const state = () => ({
	selectedSubreddit: 'vue',
	isFetching: false,
	didInvalidate: false,
	items: [],
	lastUpdated: Date.now(),
});

const getters = {
	isEmpty(state) {
		return Array.isArray(state.items) && state.items.length === 0;
	},
};

const mutations = {
	updateState(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

const actions = {
	async getPosts({ state, commit }) {
		commit('updateState', {
			isFetching: true,
		});
		try {
			const posts = await axios(`https://www.reddit.com/r/${state.selectedSubreddit}.json`)
				.then((res) => res.data)
				.then((data) => data.data.children.map((child) => child.data));
			commit('updateState', {
				isFetching: false,
				items: posts,
				lastUpdated: Date.now(),
			});
		} catch (e) {
			console.error(e);
			commit('updateState', {
				isFetching: false,
				items: [],
				lastUpdated: Date.now(),
			});
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
