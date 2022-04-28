import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

/* 
! to version 2,

import Vue from "vue";
import App from "./App.vue";

new Vue({
	el: "#app",
	render: h => h(App),
});
*/
