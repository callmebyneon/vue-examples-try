import { createWebHistory, createRouter } from 'vue-router';
import TodoApp from '../views/TodoApp';
import CartApp from '../components/Cart/CartApp';
import AsyncApp from '../components/Async/AsyncApp';
import NoMatch from '../components/Layout/NoMatch';

const history = createWebHistory();
const router = createRouter({
	history,
	routes: [
		{
			path: '/',
			component: TodoApp,
		},
		{
			path: '/cart',
			component: CartApp,
		},
		{
			path: '/async',
			component: AsyncApp,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NoMatch,
		},
	],
});

export default router;
