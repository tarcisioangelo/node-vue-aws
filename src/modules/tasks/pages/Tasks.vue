<template>
    <TitlePage title="Tarefas" :description="descriptionPage" icon="checklist" />

    <div class="flex flex-col gap-y-3 mt-4">
        <form class="" @submit.prevent="() => handleAdd()">
            <div class="flex items-center gap-3 p-3 shadow-sm shadow-gray-900 bg-component rounded-md">
                <div class="flex-1">
                    <DefaultInputText
                        v-model="newTask.description"
                        custom-class="!mb-0"
                        id="newTask"
                        name="newTask"
                        placeholder="Nova tarefa..."
                    />
                </div>
                <div class="flex-1/2">
                    <MaskedInput
                        v-model="newTask.date"
                        mask="##/##/####"
                        type="datetime"
                        custom-class="!mb-0"
                        id="dateTask"
                        name="dateTask"
                        placeholder="Data"
                    />
                </div>
                <div class="flex-1/2">
                    <MaskedInput
                        v-model="newTask.time"
                        mask="##:##"
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
                @taskDeleted="getAll"
                @taskUpdated="handleUpdate"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa aberta</p>
        </div>

        <p class="text-lg border-b border-input-line pb-1 text-white/75 mt-1">Concluídas:</p>

        <div v-if="isLoading" class="feedback-text">
            <p>Atualizando lista...</p>
        </div>
        <div v-else-if="donesTask.length > 0" class="flex flex-col gap-3 mt-4 min-h-48">
            <TaskRow
                v-for="task in donesTask"
                :key="task.id"
                :task="task"
                @taskDeleted="getAll"
                @taskUpdated="handleUpdate"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa finalizada</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

// Components
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import MaskedInput from '@/components/Form/MaskedInput.vue'

import TitlePage from '@/components/Navigation/TitlePage.vue'
import TaskRow from '@/modules/tasks/components/TaskRow.vue'

// Types
import type { ITask, ITaskStatus } from '@/modules/tasks/types'

// Services
import { apiGetCsrfToken, apiListTasks, apiSaveTask } from '@/services'

import dayjs from 'dayjs'
import Mask from '@/utils/mask'

const tasks = ref<ITask[]>([])

const toast = useToast()

const newTask = reactive({
    description: '',
    time: '',
    date: '',
})
const isLoading = ref<boolean>(false)

const isDisabled = computed(() => newTask.description.length === 0)

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

const donesTask = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'B')
})

const toStartTask = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'A')
})

const handleAdd = async () => {
    try {
        isLoading.value = true

        const payloadTask: ITask = {
            dateTask: dayjs().format('YYYY-MM-DD HH:mm'),
            description: newTask.description,
            stTask: 'A',
        }

        await saveHandler(payloadTask)

        toast.success('Tarefa salva com sucesso!')

        await getAll()
    } catch (error: any) {
        console.log(error)
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}

const handleUpdate = async (data: ITask) => {
    let stFaill: ITaskStatus = data.stTask === 'A' ? 'B' : 'A'

    const up = tasks.value.find((task) => task.id === data.id)

    try {
        if (up) up.stTask = data.stTask

        await saveHandler(data)
    } catch (error: any) {
        toast.error(error.message)

        if (up) up.stTask = stFaill
    }
}

const saveHandler = async (data: ITask) => {
    const result = await apiGetCsrfToken()

    const payloadTask: ITask = {
        id: data?.id,
        dateTask: dayjs().format('YYYY-MM-DD HH:mm'),
        description: data.description,
        stTask: data.stTask,
        'x-csrf-token': result.data,
    }

    await apiSaveTask(payloadTask)

    newTask.description = ''
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
