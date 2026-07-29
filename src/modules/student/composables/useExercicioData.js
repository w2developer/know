import { ref } from 'vue'
import { supabase } from '@/supabase'

const exercicios = ref(null)
const carregandoExercicios = ref(null)
const exerciciosError = ref(null)

export function useExercicioData () {
    // Buscar todos os exercícios
    // Busca exercícios de um módulo específico e a contagem de tarefas de cada um
    const queryExercicios = async (idModulo) => {
        try {
            carregandoExercicios.value = true
            exerciciosError.value = null

            const { data, error } = await supabase
                .from('exercises')
                .select('*, tasks(count)')
                .eq('modulo_id', idModulo)

            if (error) throw error

            exercicios.value = data.map(item => ({
                ...item,
                tarefasCount: item.tasks?.[0]?.count ?? 0
            }))
        } catch (err) {
            exerciciosError.value = err.message
            console.error('Erro ao carregar os exercícios:', err)
        } finally {
            carregandoExercicios.value = false
        }
    }

    return {
        exercicios,
        carregandoExercicios,
        exerciciosError,
        queryExercicios
    }
}