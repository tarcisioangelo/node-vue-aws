<template>
    <TitlePage title="Perfil" icon="person" />
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import { computed, onMounted, ref } from 'vue'
import type { ITask } from '@/modules/tasks/types'
import TaskRow from '@/modules/tasks/components/TaskRow.vue'
import { apiListTasks, apiSaveTask } from '../service'

import dayjs from 'dayjs'

const tasks = ref<ITask[]>([])

const toast = useToast()
const newTask = ref<string>('')
const donesTasks = ref<number[]>([])

const isDisabled = computed(() => newTask.value.length === 0)
const getAll = async () => {
    try {
        const result = await apiListTasks()

        tasks.value = result.data
    } catch (error: any) {
        toast.error(error.message)
    }
}

onMounted(async () => {
    await getAll()
})

const isTaskDone = computed(() => {
    return (taskId?: number) => (taskId ? donesTasks.value.includes(taskId) : false)
})

const handleAdd = async (taskParam: ITask | undefined = undefined) => {
    try {
        console.log(taskParam)

        const payloadTask: ITask = {
            id: taskParam ? taskParam.id : undefined,
            dateTask: taskParam ? taskParam.dateTask : dayjs().format('YYYY-MM-DD HH:mm'),
            description: taskParam ? taskParam.description : newTask.value,
            stTask: taskParam ? taskParam.stTask : 'A',
        }

        await apiSaveTask(payloadTask)

        toast.success('Tarefa adicionada com sucesso!')

        newTask.value = ''
        await getAll()
    } catch (error: any) {
        toast.error(error.message)
    }
}

const descriptionPage = computed(() => {
    return `${tasks.value.length} tarefas cadastradas`
})
</script>
