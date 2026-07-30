<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTarefaData } from '../../composables/useTarefaData.js'

import ContentLayout from '../../components/ContentLayout.vue'
import LinkList from '../../components/LinkList.vue'

import { SquareCheckBig, SquareArrowOutUpRight  } from '@lucide/vue'

const route = useRoute()

const { tarefas, carregandoTarefas, tarefasError, queryTarefas } = useTarefaData()

onMounted(() => {
    queryTarefas(route.query.id_exercicio)
})
</script>

<template>
    <div class="container">
        <ContentLayout :link="'/aluno/exercicio?id_modulo=' + route.query.id_modulo" title="Tarefas">
            <div class="carregando" v-if="carregandoTarefas">
                <span>Carregando Tarefas...</span>
            </div>

            <div class="erro" v-else-if="tarefasError">
                <span>Erro ao tentar carregar tarefas</span>
            </div>

            <LinkList v-else>
                <RouterLink
                    v-for="tarefa in tarefas"
                    :key="tarefa.id"
                    :to="{
                        path: '/aluno/passos',
                        query: {
                            id_modulo: route.query.id_modulo,
                            id_exercicio: route.query.id_exercicio,
                            id_tarefa: tarefa.id
                        }
                    }"
                    class="item"
                >
                    <span>{{ tarefa.name }}</span>
                    <div class="status">
                        <SquareCheckBig class="completed" v-if="false"/>
                        <SquareArrowOutUpRight v-else/>
                    </div>
                </RouterLink>
            </LinkList>
        </ContentLayout>
    </div>
</template>

<style scoped>
    .completed {
        color: #54e108;
    }
</style>