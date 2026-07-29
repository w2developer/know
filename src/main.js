import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice';


import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(ToastService);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    },
    ripple: true,
    unstyled: false
});

// Registra as diretivas globalmente
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.mount('#app')
