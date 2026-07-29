import { ref } from 'vue'
import { supabase } from '@/supabase'

const modulos = ref(null)
const carregandoModulos = ref(null)
const modulosError = ref(null)

export function useModuloData () {
    // Buscar todos os modulos
    const queryModulos = async () => {
        try {
            carregandoModulos.value = true

            const { data, error } = await supabase
                .from('modulos')
                .select('id, name, image_url, level')
            
            if (error) throw error

            modulos.value = data
        } catch (err) {
            modulosError.value = err.message
            console.error("Erro ao buscar módulos:", err)
        } finally {
            carregandoModulos.value = false
        }
    }

    return {
        modulos,
        carregandoModulos,
        modulosError,
        queryModulos
    }
}