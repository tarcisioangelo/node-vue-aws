<template>
    <TitlePage />

    <form class="mt-8">
        <div class="flex flex-wrap md:flex-nowrap">
            <DefaultInputText v-model="newTask" id="newTask" name="newTask" placeholder="Digite o nome da tarefa..." />
            <DefaultButton
                text="Adicionar tarefa"
                icon="add_circle"
                customClass="md:ml-4 h-[41px] md:h-[51px] !min-w-auto md:max-w-[300px]"
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
        />
    </div>

    <div v-else>Nenhuma tarefa cadastrada</div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import { computed, onMounted, ref } from 'vue'
import type { ITask } from '@/modules/tasks/types'
import TaskRow from '@/modules/tasks/components/TaskRow.vue'

const tasks: ITask[] = [
    {
        id: 1,
        title: 'Tarefa 1',
    },
    {
        id: 2,
        title: 'Tarefa 2 asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd asdasdsadasd ',
    },
]

const toast = useToast()
const newTask = ref<string>('')
const donesTasks = ref<number[]>([])

onMounted(() => {
    toast.success('bem vindo ')
})

const isTaskDone = computed(() => {
    return (taskId: number) => donesTasks.value.includes(taskId)
})
</script>
