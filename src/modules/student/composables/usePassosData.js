import { ref } from 'vue'
import { supabase } from '@/supabase'

export function usePassosData () {
    const passos = ref([])
    const carregandoPassos = ref(false)
    const passosError = ref(null)

    const queryPassos = async (idTarefa) => {
        try {
            carregandoPassos.value = true
            passosError.value = null

            const { data, error } = await supabase
                .from('steps')
                .select('*')
                .eq('task_id', idTarefa)
                .order('order')

            if (error) throw error

            passos.value = data ?? []
        } catch (err) {
            passosError.value = err.message
            console.error('Erro ao carregar os passos:', err)
        } finally {
            carregandoPassos.value = false
        }
    }

    return {
        passos,
        carregandoPassos,
        passosError,
        queryPassos
    }
}