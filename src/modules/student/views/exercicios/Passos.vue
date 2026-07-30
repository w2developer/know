<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { usePassosData } from '../../composables/usePassosData.js';
    import { Undo2, House } from '@lucide/vue';

    import ContentLayout from '../../components/ContentLayout.vue';

    const route = useRoute()

    const {passos, carregandoPassos, passosError, queryPassos} = usePassosData()

    onMounted(() => {
        queryPassos(route.query.id_tarefa)
    })
</script>

<template>
    <div class="container">
        <!-- Exemplo de texto simple e unico -->
        <div class="header-group">
            <div class="undo">
                <RouterLink to="/">
                    <House/>
                </RouterLink>
                <RouterLink :to="'/aluno/tarefas?id_modulo=' + route.query.id_modulo + '&id_exercicio=' + route.query.id_exercicio">
                    <Undo2/>
                </RouterLink>
            </div>
        </div>
        <div class="passos-group">
            <div class="passo">
                <h2>Passo 1</h2>
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neempore veritatis eligendi voluptatum assumenda debitis dolorem modi, maxime cumque facere?</p>
                    <p>Lorem ipsum dolor sit amet conseur, adipisicing elit. Nemo tempore veritatis eligendi voluptatum assumenda debitis dolorem modi, maxime cumque facere?</p>
                </div>
            </div>
            <!-- Exemplo de lista ul -->
            <div class="passo">
                <h2>Passo 2</h2>
                <div class="content">
                    <ul>
                        <li>Lorem, ipsum dolor sit amsectetur adipisicing elit.</li>
                        <li>Lorem, ipsum dolor sit amet csectetur adipcing elit.</li>
                        <li>Lorem, ipsum dolor sit amet csectetur adipisicing elit.</li>
                    </ul>
                </div>
            </div>
            <!-- Exemplo de lista ol -->
            <div class="passo">
                <h2>Passo 3</h2>
                <div class="content">
                    <ol>
                        <li>Lorem, ipsum dr sit amet cetur adipisicing elit.</li>
                        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Lorem, ipsulor sit amet consectetur adipisicing elit.</li>
                    </ol>
                </div>
            </div>
        </div>
            <!-- <div class="passo" v-for="passo in passos" :key="passo.id">
                <h2>{{ 'Passo ' + passo.order }}</h2>
                <div class="content"></div>
            </div> -->
            <!-- <span class="passo" v-for="passo in passos" :key="passo.id" v-html="passo.content"></span> -->
    </div>
</template>

<style scoped>
    .header-group {
        display: flex;
        margin: 0 auto;
        max-width: 750px;
        padding: var(--k-size-16) 0;
    }
    .header-group .undo {
        gap: .2rem;
        display: flex;
    }
    .header-group a {
        opacity: .8;
        padding: .15rem;
        transition: .2s ease;
        border-radius: var(--k-size-4);
        background: var(--color-gray-800);
        border: 2px solid var(--color-gray-700);
    }

    .header-group a:hover {
        opacity: 1;
    }
    .passos-group {
        display: flex;
        margin: 0 auto;
        max-width: 750px;
        gap: var(--k-size-16);
        flex-direction: column;
    }
    .passo {
        padding: var(--k-size-16);
        color: var(--color-gray-300);
        border-radius: var(--k-size-4);
        background: var(--color-gray-900);
        border: 1px solid var(--color-gray-800);
    }
    .passo h2 {
        font-weight: bold;
        font-size: var(--k-size-20);
        color: var(--color-gray-100);
    }
    .passo .content {
        gap: var(--k-size-16);
        display: flex;
        flex-direction: column;
    }
    .passo :deep(ul), .passo :deep(ol) {
        padding-left: 40px;
    }
    .passo :deep(ul) {
        list-style: disc;
    }
    .passo :deep(ol) {
        list-style: decimal;
    }
</style>