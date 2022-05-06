import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _assign from 'lodash/assign';
import _cloneDeep from 'lodash/cloneDeep';
import _forEach from 'lodash/forEach';
import _forEachRight from 'lodash/forEachRight';

const state = () => ({
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
});

const getters = {
	filteredTodos(state) {
		switch (state.filter) {
			case 'all':
			default:
				return state.todos;
			case 'active':
				return state.todos.filter((todo) => !todo.done);
			case 'completed':
				return state.todos.filter((todo) => todo.done);
		}
	},
	total(state) {
		return state.todos.length;
	},
	activeCount(state) {
		return state.todos.filter((todo) => !todo.done).length;
	},
	completedCount(state, getters) {
		return getters.total - getters.activeCount;
	},
};

const mutations = {
	assignDB(state, db) {
		state.db = db;
	},
	// createDB(state, newTodo) {
	// 	state.db.get('todos').push(newTodo).write();
	// },
	// updateDB(state, { todo, value }) {
	// 	state.db.get('todos').find({ id: todo.id }).assign(value).write();
	// },
	// deleteDB(state, todo) {
	// 	state.db.get('todos').remove({ id: todo.id }).write();
	// },
	assignTodos(state, todos) {
		state.todos = todos;
	},
	pushTodo(state, newTodo) {
		state.todos.push(newTodo);
	},
	assignTodo(state, payload) {
		const { foundTodo, value } = payload;

		_assign(foundTodo, value);
	},
	updateTodo(state, { todo, key, value }) {
		console.log(`${todo[key]} = ${value}`)
		todo[key] = value;
	},
	deleteTodo(state, index) {
		// Vue.delete(state.todos, index)
		state.todos.splice(index, 1);
	},
	updateFilter(state, filter) {
		state.filter = filter;
	}
};

const actions = {
	createTodo({ commit }, title) {
		const newTodo = {
			id: Date.now(),
			title,
			createdAt: new Date(),
			updatedAt: new Date(),
			done: false,
		};

		try {
			// DB에 저장
			// commit('createDB', newTodo);
			// 로컬(local)에 반영
			commit('pushTodo', newTodo);
		} catch (error) {
			console.error(error);
		}
	},
	updateTodo({ state, commit }, payload) {
		const { todo, value } = payload;

		try {
			// DB에 저장
			// commit('updateDB', payload);
			// Lodash 라이브러리 활용
			const foundTodo = _find(state.todos, { id: todo.id });
			commit('assignTodo', {
				foundTodo,
				value,
			});
		} catch (error) {
			console.error(error);
		}
	},
	deleteTodo({ state, commit }, todo) {
		try {
			// DB에 저장
			// commit('deleteDB', todo);
			// 로컬(local)에 반영
			// Lodash 라이브러리 활용
			const foundIndex = _findIndex(state.todos, { id: todo.id });
			commit('deleteTodo', foundIndex);
		} catch (error) {
			console.log(error);
		}
	},
	completeAll({ state, commit }, checked) {
		_forEach(state.todos, (todo) => {
			if (Boolean(todo.done) !== checked) {
				console.log(todo.done, checked);
				commit('updateTodo', {
					todo,
					key: 'done',
					value: checked
				})
			}
		});
	},
	clearCompleted({ state, dispatch }) {
		_forEachRight(state.todos, (todo) => {
			if (todo.done) {
				dispatch('deleteTodo', todo);
			}
		});
	},
	changeFilter({ commit }, filter) {
		commit('updateFilter', filter);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
