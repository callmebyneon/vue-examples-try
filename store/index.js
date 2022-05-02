import { createStore } from 'vuex';

import todoApp from './todoApp';

/*
? Data
state: {},

? Computed
getters: {},

? Methods
? 실제 값을 변경할 때(비동기X)
? use `commit(type, payload?, options?)` a mutation.
mutations: {},

? Methods
? 일반 로직(비동기O), state 값 직접 변경 X
? use `dispatch(type, payload?, options?)` an action.
actions: {},
*/

export default createStore({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		todoApp,
	},
});
