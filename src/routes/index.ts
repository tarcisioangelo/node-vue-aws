import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

// layouts
const GuestLayout = () => import('@/layouts/GuestLayout.vue')

// pages
const LoginPage = () => import('@/views/Login.vue')
const RegisterPage = () => import('@/views/Register.vue')
const NotFoundPage = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: GuestLayout,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: LoginPage,
            },
            {
                path: 'register',
                name: 'Register',
                component: RegisterPage,
            },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
