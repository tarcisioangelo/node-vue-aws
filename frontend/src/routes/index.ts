import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const LoginPage = () => import('../views/Login.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
