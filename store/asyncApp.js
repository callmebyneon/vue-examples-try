import axios from 'axios';

const state = () => ({
	selectedSubreddit: 'vue',
	items: {},
});

const getters = {
	isFetching (state) {
		return state.items[state.selectedSubreddit]?.isFetching || false
	},
	lastUpdated (state) {
		return state.items[state.selectedSubreddit]?.lastUpdated || Date.now()
	},
	selectedPosts (state) {
		return state.items[state.selectedSubreddit]?.posts || []
	},
	isEmpty(state) {
		const thisItems = state.items[state.selectedSubreddit];
		return Array.isArray(thisItems?.posts) && thisItems?.posts.length === 0;
	},
};

const mutations = {
	updatePostItems (state, payload) {
		Object.keys(payload).forEach((key) => {
			state.items[key] = {
				...payload[key]
			}
		});
		console.log('# items', state.items)
	},
	updateState(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

const actions = {
	async getPosts({ state, commit }) {
		console.log('# start getPosts action: ', state)
		if (state.items[state.selectedSubreddit] && !state.items[state.selectedSubreddit]?.didInvalidate) {
			return;
		}
		commit('updatePostItems', {
			[state.selectedSubreddit]: {
				subreddit: state.selectedSubreddit,
				isFetching: true,
				didInvalidate: false
			},
		});
		console.log('%c GET post -loading', 'color:skyblue');
		try {
			const posts = await axios(`https://www.reddit.com/r/${state.selectedSubreddit}.json`)
				.then((res) => res.data)
				.then((data) => data.data.children.map((child) => child.data));
			commit('updatePostItems', {
				[state.selectedSubreddit]: {
					isFetching: false,
					posts,
					lastUpdated: Date.now(),
				}
			});
			console.log('%c GET post -success', 'color:yellowgreen');
		} catch (e) {
			console.error(e);
			commit('updatePostItems', {
				[state.selectedSubreddit]: {
					isFetching: false,
					posts: [],
					lastUpdated: Date.now(),
				}
			});
			console.log('%c GET post -failure', 'color:tomato');
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
