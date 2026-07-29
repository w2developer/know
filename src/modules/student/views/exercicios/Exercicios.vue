<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useExercicioData } from '../../composables/useExercicioData.js'
    import ContentLayout from '../../components/ContentLayout.vue'

    const route = useRoute()
    const idModulo = route.params.id_modulo

    const {exercicios, carregandoExercicios, exerciciosError, queryExercicios} = useExercicioData()

    onMounted(() => {
        queryExercicios(idModulo)
    })
</script>

<template>
    <div class="container">
        <ContentLayout link="/" title="">
            <div class="cards">
                <RouterLink :to="'tarefas/' + exercicio.id" v-for="exercicio in exercicios" :key="exercicio.id">
                    <span>{{ exercicio.name }}</span>
                    <span>0/{{ exercicio.tarefasCount }}</span>
                </RouterLink>
            </div>
        </ContentLayout>
    </div>
</template>

<style scoped>
	.cards {
		gap: 1rem;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
	.cards a {
		opacity: .8;
        display: flex;
        align-items: center;
		transition: .3s ease;
        justify-content: space-between;
		border-radius: var(--k-size-4);
		background: var(--color-gray-900);
		border: 1px solid var(--color-gray-800);
		padding: var(--k-size-10) var(--k-size-16);
	}
	.cards a:hover {
		opacity: 1;
		border: 1px solid var(--color-gray-700);
	}
</style>