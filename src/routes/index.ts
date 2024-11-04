import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// layouts
const GuestLayout = () => import('@/layouts/GuestLayout.vue')
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
// pages
const LoginPage = () => import('@/modules/auth/pages/Login.vue')
const RegisterPage = () => import('@/views/Register.vue')
const TasksPage = () => import('@/modules/tasks/pages/Tasks.vue')

const NotFoundPage = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: DefaultLayout,

        children: [
            {
                path: '',
                name: 'Index',
                redirect: '/login',
            },
            {
                path: 'tasks',
                name: 'Tasks',
                component: TasksPage,
            },
        ],
    },
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
