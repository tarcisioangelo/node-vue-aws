import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const LoginPage = () => import('@/views/Login.vue')
const NotFoundPage = () => import('../views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/:catchAll(.*)*',
        component: NotFoundPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
