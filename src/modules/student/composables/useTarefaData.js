import { ref } from 'vue'
import { supabase } from '@/supabase'

export function useTarefaData () {
    const tarefas = ref([])
    const carregandoTarefas = ref(false)
    const tarefasError = ref(null)

    const queryTarefas = async (idExercicio) => {
        try {
            carregandoTarefas.value = true
            tarefasError.value = null

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('exercise_id', idExercicio)

            if (error) throw error

            tarefas.value = data ?? []
        } catch (err) {
            tarefasError.value = err.message
            console.error('Erro ao carregar as tarefas:', err)
        } finally {
            carregandoTarefas.value = false
        }
    }

    return {
        tarefas,
        carregandoTarefas,
        tarefasError,
        queryTarefas
    }
}