export const studentRoutes = [
    {
        path: '/aluno',
        component: () => import('@/layouts/StudentLayout.vue'),
        children: [
            {
                path: 'pagina-inicial',
                component: () => import('@/modules/student/views/PaginaInicial.vue'),
            },
            {
                path: 'exercicio',
                component: () => import('@/modules/student/views/exercicios/Exercicios.vue'),
            },
            {
                path: 'tarefas',
                component: () => import('@/modules/student/views/exercicios/Tarefas.vue'),
            },
            {
                path: 'passos',
                component: () => import('@/modules/student/views/exercicios/Passos.vue'),
            }
        ],
    },
]
