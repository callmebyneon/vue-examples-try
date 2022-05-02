import { createStore } from 'vuex';

import todoApp from './todoApp';

const store = createStore({
	strict: process.env.NODE_ENV !== 'production',
});

/*
? Data
state: {},

? Computed
getters: {},

? Methods
? 실제 값을 변경할 때(비동기X)
mutations: {},

? Methods
? 일반 로직(비동기O), state 값 직접 변경 X
actions: {},
*/

export default store;
