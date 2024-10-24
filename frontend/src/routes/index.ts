import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const LoginPage = () => import('../views/Login.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../views/NotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
