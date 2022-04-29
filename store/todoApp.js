export default {
	init: {
		namespaced: true,
		state: () => ({
			db: null,
			todos: [
				{
					id: Date.now(),
					title: 'Use Vuex',
					createdAt: new Date(),
					updatedAt: new Date(),
					done: false,
				},
			],
			filter: 'all',
		}),
		getters: {
			total(state) {
				return state.todos.length;
			},
			activeCount(state) {
				return state.todos.filter((todo) => todo.done === false).length;
			},
			completedCount(state, getters) {
				return getters.total - getters.activeCount;
			},
			filteredTodos(state) {
				switch (state.filter) {
					case 'all':
						return state.todos;
					case 'active':
						return state.todos.filter((todo) => todo.done === false);
					case 'completed':
						return state.todos.filter((todo) => todo.done === true);
					default:
						return state.todos;
				}
			},
			allDone: {
				get() {
					return state.total === state.completedCount && state.total > 0;
				},
				set(checked) {
					state.completeAll(checked);
				},
			},
		},
		mutations: {
			assignDB(state, db) {
				state.db = db;
			},
			assignTodos(state, todos) {
				state.todos = todos;
			},
		},
		actions: {
			initDB({ state, commit }) {
				const clearState = {
					todos: [],
				};
				// state.db = window.localStorage;
				commit('assignDB', window.localStorage);

				const hasTodos = state.db.getItem('todo-app') && JSON.parse(state.db.getItem('todo-app')).todos.length > 0;

				if (hasTodos) {
					commit('assignTodos', [...JSON.parse(state.db.getItem('todo-app')).todos]);
				} else {
					// Local DB initalize
					state.db.setItem('todo-app', JSON.stringify(clearState));
				}
			},
		},
	},
};
