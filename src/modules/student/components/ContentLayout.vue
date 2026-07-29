<script setup>
    import { Undo2, House } from '@lucide/vue';

    const props = defineProps({
        title: String,
        link: String
    });
</script>

<template>
    <div class="content-wrapper">
        <div class="header">
            <RouterLink title="Voltar" to="/">
                <House />
            </RouterLink>
            <RouterLink title="Voltar" :to="props.link">
                <Undo2 />
            </RouterLink>
            <h2>{{ props.title }}</h2>
        </div>

        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .header {
        display: flex;
        gap: .2rem;
        align-items: center;
        border-radius: 10px 10px 0px 0px;
        background: var(--color-gray-900);
        border: 1px solid var(--color-gray-800);
        padding: var(--k-size-8) var(--k-size-16);
    }

    .header h2 {
        margin-left: 10px;
        font-weight: 600;
        color: var(--color-gray-200);
    }

    .header a {
        opacity: .8;
        padding: .15rem;
        transition: .2s ease;
        border-radius: var(--k-size-4);
        background: var(--color-gray-800);
        border: 2px solid var(--color-gray-700);
    }

    .header a:hover {
        opacity: 1;
    }

    .body {
        padding: var(--k-size-16);
        border-radius: 0px 0px 4px 4px;
        border-left: 1px solid var(--color-gray-800);
        border-right: 1px solid var(--color-gray-800);
        border-bottom: 1px solid var(--color-gray-800);
    }
</style>