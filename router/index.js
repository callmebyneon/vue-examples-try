import { createWebHistory, createRouter } from 'vue-router';
import TodoApp from '../views/TodoApp';
import CartApp from '../views/CartApp';
import AsyncApp from '../views/AsyncApp';
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
