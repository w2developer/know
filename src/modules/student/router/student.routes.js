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
                path: 'exercicios/:id_modulo',
                component: () => import('@/modules/student/views/exercicios/Exercicios.vue'),
                props: true,
                meta: {
                    test: true
                }
            },
            {
                path: 'tarefas/:id_exercicio',
                component: () => import('@/modules/student/views/exercicios/Tarefas.vue'),
                props: true,
                meta: {
                    test: true
                }
            }
        ],
    },
]
