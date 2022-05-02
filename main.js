import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App';

import './index.scss';

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');

/* 
! to version 2,

import Vue from "vue";
import App from "./App.vue";

new Vue({
	el: "#app",
	render: h => h(App),
});
*/
