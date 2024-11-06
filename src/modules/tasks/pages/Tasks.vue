<template>
    <TitlePage title="Tarefas" :description="descriptionPage" icon="checklist" />

    <div class="flex flex-col gap-y-3">
        <form class="mt-8" @submit.prevent="() => handleAdd(undefined)">
            <div class="flex flex-wrap md:flex-nowrap">
                <DefaultInputText v-model="newTask" id="newTask" name="newTask" placeholder="Nova tarefa..." />
                <DefaultButton
                    text="Adicionar tarefa"
                    icon="add_circle"
                    customClass="md:ml-4 h-[41px] md:h-[51px] !min-w-auto md:max-w-[300px]"
                    :is-disabled="isDisabled"
                />
            </div>
        </form>

        <div v-if="tasks.length > 0" class="flex flex-col gap-3 mt-4">
            <TaskRow
                v-for="task in tasks"
                :key="task.id"
                v-model="donesTasks"
                :task="task"
                :isTaskDone="isTaskDone(task.id)"
                @task-deleted="getAll"
            />
        </div>

        <div v-else class="flex items-center justify-center min-h-64">
            <p>{{ isLoading ? 'Carregando...' : 'Nenhuma tarefa cadastrada' }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import { computed, onMounted, ref } from 'vue'
import type { ITask } from '@/modules/tasks/types'
import TaskRow from '@/modules/tasks/components/TaskRow.vue'
import { apiGetCsrfToken, apiListTasks, apiSaveTask } from '@/services'

import dayjs from 'dayjs'

const tasks = ref<ITask[]>([])

const toast = useToast()
const newTask = ref<string>('')
const donesTasks = ref<number[]>([])
const isLoading = ref<boolean>(false)

const isDisabled = computed(() => newTask.value.length === 0)

const getAll = async () => {
    try {
        isLoading.value = true
        const result = await apiListTasks()

        tasks.value = result.data
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        isLoading.value = false
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
        const result = await apiGetCsrfToken()

        const payloadTask: ITask = {
            id: taskParam ? taskParam.id : undefined,
            dateTask: dayjs().format('YYYY-MM-DD HH:mm'),
            description: taskParam ? taskParam.description : newTask.value,
            stTask: taskParam ? taskParam.stTask : 'A',
            'x-csrf-token': result.data,
        }

        await apiSaveTask(payloadTask)

        toast.success('Tarefa adicionada com sucesso!')

        newTask.value = ''
        await getAll()
    } catch (error: any) {
        console.log(error)
        toast.error(error.message)
    }
}

const descriptionPage = computed(() => {
    return `${tasks.value.length} tarefas cadastradas`
})
</script>
