<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import Logo from '@/assets/svg/logo.svg';
    import Popover from 'primevue/popover';
    import Button from 'primevue/button';
    import Drawer from 'primevue/drawer';

    // Importação dos ícones do Lucide
    import { 
        ChevronDown, 
        BookText, 
        Monitor, 
        FileText, 
        Mouse, 
        Keyboard,
        UserPen, 
        Clock, 
        CheckSquare, 
        Menu,
        FolderArchive,
        TvMinimalPlay
    } from '@lucide/vue';

    const visible = ref(false);

    // Variável reativa para o menu
    const showMenu = ref(true);

    // Checa a largura da janela
    const checkWidth = () => {
        showMenu.value = window.innerWidth >= 1000;
    };

    // Registra os eventos
    onMounted(() => {
        checkWidth(); // Checa na montagem inicial
        window.addEventListener('resize', checkWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkWidth);
    });

    // Ref e toggle do perfil
    const opProfile = ref();
    const toggleProfile = (event) => {
        opProfile.value.toggle(event);
    };

    // Refs e toggle dos menus dinâmicos
    const menuRefs = ref([]);
    const toggleMenu = (event, index) => {
        menuRefs.value[index].toggle(event);
    };

    // Estrutura dinâmica (ícones agora recebem os componentes importados)
    const mainMenus = ref([
        {
            label: 'Sala de Aula',
            icon: ChevronDown,
            items: [
                { label: 'Exercícios Práticos', icon: BookText, to: '/aluno/exercicios-praticos' },
                { label: 'Estudo Extra', icon: Monitor, to: '/' },
                { label: 'Apostilas OM', icon: FileText, to: '/' }
            ]
        },
        {
            label: 'Sala de Treinamento',
            icon: ChevronDown,
            items: [
                { label: 'Treino do Mouse', icon: Mouse, to: '/' },
                { label: 'Treino de Digitação', icon: Keyboard, to: '/' }
            ]
        },
        {
            label: 'Recursos',
            icon: ChevronDown,
            items: [
                { label: 'Arquivos Auxiliares', icon: FolderArchive, to: '/' },
                { label: 'Plataforma EJA', icon: TvMinimalPlay, to: '/' }
            ]
        }
    ]);

    // Dados do menu do perfil
    const profileItems = ref([
        { label: 'Editar Dados', icon: UserPen, to: '/perfil' },
        { label: 'Listar Pendências', icon: Clock, to: '/pendencias' },
        { label: 'Listar Conclusões', icon: CheckSquare, to: '/conclusoes' }
    ]);
</script>

<template>
    <header class="flex justify-between items-center">
        <div class="box-logo">
            <RouterLink to="/">
                <img :src="Logo" alt="" class="w-10">
            </RouterLink>
        </div>
        <nav class="box-menu-mobile flex min-[1000px]:hidden">
            <Button @click="visible = true">
                <!-- Ícone fixo do menu mobile -->
                <Menu class="w-5 h-5" />
            </Button>
            <Drawer v-model:visible="visible" header="Basic Drawer" class="w-full! md:w-80!">
                <p>A slide-in panel from the edge of the screen for contextual content.</p>
            </Drawer>
        </nav>

        <nav class="box-menu hidden min-[1000px]:flex">
            <ul class="flex gap-2">
                <!-- Item fixo -->
                <li>
                    <router-link class="link" to="/aluno/pagina-inicial">Página Inicial</router-link>
                </li>
                
                <!-- Menus dropdown dinâmicos -->
                <li v-for="(menu, menuIndex) in mainMenus" :key="menuIndex">
                    <span @click="toggleMenu($event, menuIndex)" class="flex items-center gap-1 cursor-pointer">
                        {{ menu.label }} 
                        <!-- Renderiza o ícone do pai -->
                        <component :is="menu.icon" class="w-4 h-4" />
                    </span>
                    <Popover :ref="el => menuRefs[menuIndex] = el" unstyled>
                        <ul class="popover">
                            <template v-for="(item, itemIndex) in menu.items" :key="itemIndex">
                                <li>
                                    <router-link v-ripple :to="item.to" class="flex items-center gap-2">
                                        <!-- Renderiza o ícone dinâmico do submenu -->
                                        <component :is="item.icon" class="w-4 h-4" />
                                        {{ item.label }}
                                    </router-link>
                                </li>
                                <hr v-if="itemIndex < menu.items.length - 1">
                            </template>
                        </ul>
                    </Popover>
                </li>
            </ul>
        </nav>
        
        <div class="box-profile">
            <Button type="button" @click="toggleProfile" unstyled class="btn-profile size-12 rounded-full">
                <span>ME</span>
            </Button>
            <Popover ref="opProfile" unstyled>
                <ul class="popover">
                    <template v-for="(item, index) in profileItems" :key="index">
                        <li>
                            <router-link v-ripple :to="item.to" class="flex items-center gap-2">
                                <!-- Renderiza o ícone do perfil -->
                                <component :is="item.icon" class="w-4 h-4" />
                                {{ item.label }}
                            </router-link>
                        </li>
                        <hr v-if="index < profileItems.length - 1">
                    </template>
                </ul>
            </Popover>
        </div>
    </header>
</template>

<style scoped>
    header {
        padding: var(--k-size-8) var(--k-size-16);
        background: var(--color-gray-900);
    }
    .btn-profile {
        display: flex;
        cursor: pointer;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        padding: var(--k-size-8);
        font-size: var(--k-size-14);
        background: var(--color-gray-700);
        border: 2px solid var(--color-gray-600);
    }
    .popover {
        display: flex;
        margin-top: 10px;
        gap: var(--k-size-4);
        flex-direction: column;
        padding: var(--k-size-12);
        border-radius: var(--k-size-4);
        background: var(--color-gray-800);
        border: 2px solid var(--color-gray-700);
    }
    .popover hr {
        border-color: var(--color-gray-700);
    }
    .popover li a {
        width: 100%;
        display: flex;
        cursor: pointer;
        align-items: center;
        transition: .2s ease;
        gap: var(--k-size-10);
        background: transparent;
        font-size: var(--k-size-16);
        border: 1px solid transparent;
        border-radius: var(--k-size-4);
        padding: var(--k-size-4) var(--k-size-10);
    }
    .popover li a:hover {
        background: var(--color-gray-700);
        border: 1px solid var(--color-gray-500);
    }
    .popover li a.router-link-active {
        background: var(--color-gray-700);
        border: 1px solid var(--color-gray-500);
    }

    /* Menu */
    .box-menu ul li span, .box-menu ul li .link{
        height: 100%;
        display: flex;
        cursor: pointer;
        gap: var(--k-size-4);
        align-items: center;
        transition: .3s ease;
        background: transparent;
        border: 2px solid transparent;
        border-radius: var(--k-size-4);
        padding: var(--k-size-8) var(--k-size-16);
    }
    
    .box-menu ul li .link:hover, .box-menu ul li span:hover {
        background: var(--color-gray-800) !important;
        border: 2px solid var(--color-gray-700) !important;
    }
    .box-menu ul li .link.router-link-active {
        background: var(--color-gray-800) !important;
        border: 2px solid var(--color-gray-700) !important;
    }

    /* Menu Mobile */
    .box-menu-mobile {
        width: 100%;
        justify-content: end;
        padding: var(--k-size-4) var(--k-size-8);
    }
</style>
