import { createRouter, createWebHistory } from 'vue-router';
import { studentRoutes } from '@/modules/student/router/student.routes.js';

const routes = [
    {
        path: '/',
        redirect: '/aluno/pagina-inicial'
    },
    ...studentRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue') // Página 404 genérica
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;