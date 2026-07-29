<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const idExercicio = route.params.id_exercicio
</script>

<template>
    <div class="container">
        Tarefas.vue
        <span>{{ idExercicio }}</span>
    </div>
</template>