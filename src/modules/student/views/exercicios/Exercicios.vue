<script setup>
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { supabase } from '@/supabase.js'
    import { useExercicioData } from '../../composables/useExercicioData.js'
    import ContentLayout from '../../components/ContentLayout.vue'
    import LinkList from '../../components/LinkList.vue'

    const route = useRoute()
    
    const {exercicios, carregandoExercicios, exerciciosError, queryExercicios} = useExercicioData()
    
    const moduloName = ref('...')

    const queryModulo = async (idModulo) => {
        try {
            const { data, error } = await supabase
            .from('modulos')
            .select('id, name, image_url, level')
            .eq('id', idModulo)
            .single()

            if (error) throw error

            moduloName.value = data.name
        } catch (err) {
            console.error("Erro ao buscar módulo:", err)
        }
    }

    onMounted(() => {
        queryExercicios(route.query.id_modulo)
        queryModulo(route.query.id_modulo)
    })
</script>

<template>
    <div class="container">
        <ContentLayout link="/" :title="'Exercícios de ' + moduloName">
            <LinkList>
                <RouterLink
                    :to="{
                        path: '/aluno/tarefas',
                        query: { id_modulo: route.query.id_modulo, id_exercicio: exercicio.id }
                    }"
                    class="item"
                    v-for="exercicio in exercicios"
                    :key="exercicio.id">
                        <span>{{ exercicio.name }}</span>
                        <span>0/{{ exercicio.tarefasCount }}</span>
                </RouterLink>
            </LinkList>
        </ContentLayout>
    </div>
</template>