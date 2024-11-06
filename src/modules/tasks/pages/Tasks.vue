<template>
    <TitlePage title="Tarefas" :description="descriptionPage" icon="checklist" />

    <div class="flex flex-col gap-y-3 mt-4">
        <form class="" @submit.prevent="() => handleAdd(undefined)">
            <div class="flex items-center gap-3 p-3 shadow-sm shadow-gray-900 bg-component rounded-md">
                <div class="flex-1">
                    <DefaultInputText
                        v-model="newTask"
                        custom-class="!mb-0"
                        id="newTask"
                        name="newTask"
                        placeholder="Nova tarefa..."
                    />
                </div>
                <div class="flex-1/2">
                    <DefaultInputText
                        v-model="newTask"
                        type="datetime"
                        custom-class="!mb-0"
                        id="dateTask"
                        name="dateTask"
                        placeholder="Data"
                    />
                </div>
                <div class="flex-1/2">
                    <DefaultInputText
                        v-model="newTask"
                        custom-class="!mb-0 "
                        id="timeTask"
                        name="newTask"
                        placeholder="Hora"
                    />
                </div>
                <DefaultButton
                    text="Adicionar tarefa"
                    icon="add_circle"
                    customClass="md:ml-4 h-[41px] md:h-[51px] !min-w-auto md:max-w-[300px] "
                    :is-disabled="isDisabled || isLoading"
                />
            </div>
        </form>

        <p class="text-lg border-b border-input-line pb-1 text-white/75">Abertas:</p>
        <div v-if="isLoading" class="feedback-text">
            <p>Atualizando lista...</p>
        </div>
        <div v-else-if="toStartTask.length > 0" class="flex flex-col gap-3 mt-4 min-h-48">
            <TaskRow
                v-for="task in toStartTask"
                :key="task.id"
                :task="task"
                :isTaskDone="isTaskDone(task.id)"
                @taskDeleted="getAll"
                @taskUpdated="handleAdd"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa aberta</p>
        </div>

        <p class="text-lg border-b border-input-line pb-1 text-white/75 mt-1">Concluídas:</p>

        <div v-if="isLoading" class="feedback-text">
            <p>Atualizando lista...</p>
        </div>
        <div v-else-if="dones.length > 0" class="flex flex-col gap-3 mt-4 min-h-48">
            <TaskRow
                v-for="task in dones"
                :key="task.id"
                :task="task"
                :isTaskDone="isTaskDone(task.id)"
                @taskDeleted="getAll"
                @taskUpdated="handleAdd"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa finalizada</p>
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

const dones = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'B')
})

const toStartTask = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'A')
})

const handleAdd = async (taskParam: ITask | undefined = undefined) => {
    try {
        isLoading.value = true
        const result = await apiGetCsrfToken()

        const payloadTask: ITask = {
            id: taskParam ? taskParam.id : undefined,
            dateTask: dayjs().format('YYYY-MM-DD HH:mm'),
            description: taskParam ? taskParam.description : newTask.value,
            stTask: taskParam ? taskParam.stTask : 'A',
            'x-csrf-token': result.data,
        }

        console.log(payloadTask)

        await apiSaveTask(payloadTask)

        toast.success('Tarefa adicionada com sucesso!')

        newTask.value = ''
        await getAll()
    } catch (error: any) {
        console.log(error)
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}

const descriptionPage = computed(() => {
    return `${tasks.value.length} tarefas cadastradas`
})
</script>

<style scoped>
.feedback-text {
    @apply flex items-center justify-center min-h-48;
}
</style>
