<script setup>
    import { computed, onMounted } from 'vue';
    import { useModuloData } from '../composables/useModuloData.js';

    import CustomTabs from '../components/CustomTabs.vue';

    const { modulos, carregandoModulos, modulosError, queryModulos } = useModuloData()

    const guias = [
        {label: 'Novidades', value: 'novidades'},
        {label: 'Tarefas Atribuída', value: 'tarefas-atribuida'}
    ]

    const levelData = [
        {label: 'Básico', value: 'basico'},
        {label: 'Avançado', value: 'avancado'}
    ]

    const modulosBasico = computed(() => {
        return modulos.value ? modulos.value.filter(m => m.level === 'basico') : []
    })

    const modulosAvancado = computed(() => {
        return modulos.value ? modulos.value.filter(m => m.level === 'avancado') : []
    })

    onMounted(() => {
        queryModulos()
    })
</script>

<template>
    <div class="container">
        <CustomTabs :tabs="guias" default-value="novidades">
            <template #novidades>
                <p class="text-surface-500 mt-1">Sem Novidades</p>
            </template>
            <template #tarefas-atribuida>
                <p class="text-surface-500 mt-1">Sem Tarefas</p>
            </template>
        </CustomTabs>

        <h2 class="title-div">Grade de Exercícios</h2>

        <CustomTabs :tabs="levelData" default-value="basico">
            <template #basico>
                <div class="cards">
                    <RouterLink
                        :to="{
                            path: '/aluno/exercicio',
                            query: { id_modulo: modulo.id }
                        }"
                        v-for="modulo in modulosBasico"
                        :key="modulo.id">
                            <div class="image">
                                <img :src="modulo.image_url" :alt="modulo.name">
                            </div>
                            <div class="name">
                                <span>{{ modulo.name }}</span>
                            </div>
                    </RouterLink>
                </div>
            </template>
            
            <template #avancado>
                <div class="cards">
                    <RouterLink :to="'exercicios/' + modulo.id" v-for="modulo in modulosAvancado" :key="modulo.id">
                        <div class="image">
                            <img :src="modulo.image_url" :alt="modulo.name">
                        </div>
                        <div class="name">
                            <span>{{ modulo.name }}</span>
                        </div>
                    </RouterLink>
                </div>
            </template>
        </CustomTabs>
    </div>
</template>

<style scoped>
	.title-div {
		font-weight: 600;
		margin-top: 20px;
		font-size: 1.2rem;
		padding: 0.6rem 0rem;
		color: var(--color-gray-200);
	}

	.cards {
		gap: 1rem;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
	.cards a {
		opacity: .8;
		transition: .3s ease;
		border-radius: var(--k-size-4);
		background: var(--color-gray-900);
		border: 1px solid var(--color-gray-800);
		padding: var(--k-size-10) var(--k-size-10) var(--k-size-6) var(--k-size-10);
	}
	.cards a:hover {
		opacity: 1;
		border: 1px solid var(--color-gray-700);
	}
	.image img {
		border-radius: var(--k-size-4);
	}
	.name {
		font-weight: 600;
		text-align: center;
		padding: var(--k-size-8) var(--k-size-4) 0 var(--k-size-4);
	}
</style>
