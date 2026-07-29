<script setup>
import Tab from 'primevue/tab'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    defaultValue: {
        type: String,
        required: true
    }
})
</script>

<template>
    <Tabs :value="defaultValue" unstyled class="custom-tabs">
        <TabList class="custom-tablist">
            <Tab
                v-for="tab in tabs" 
                :key="tab.value" 
                :value="tab.value"
                :pt="{ root: 'custom-tab' }"
            >
                {{ tab.label }}
            </Tab>
        </TabList>
        <TabPanels class="custom-panels">
            <TabPanel 
                v-for="tab in tabs" 
                :key="tab.value" 
                :value="tab.value"
                :pt="{ root: 'custom-panel' }"
            >
                <slot :name="tab.value"></slot>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<style scoped>
    .custom-tablist {
        display: flex;
        border-radius: 10px 10px 0px 0px;
        background: var(--color-gray-900);
        border: 1px solid var(--color-gray-800);
    }

    .custom-tab {
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--color-gray-400);
        border-bottom: 2px solid transparent;
        padding: var(--k-size-8) var(--k-size-16);
    }
    .custom-tab:hover {
        background: var(--color-gray-800);
    }
    .custom-tab[aria-selected='true'],
    .custom-tab.p-highlight {
        color: var(--color-gray-100);
        border-bottom-color: var(--primary);
    }

    .custom-panels {
        border-radius: 0px 0px 4px 4px;
        padding: var(--k-size-8) var(--k-size-16);
        border-left: 1px solid var(--color-gray-800);
        border-right: 1px solid var(--color-gray-800);
        border-bottom: 1px solid var(--color-gray-800);
    }
</style>
