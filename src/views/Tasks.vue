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
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-8"
            :class="{ 'border-l-success': isTaskDone(task.id) }"
        >
            <div class="w-[2rem] flex self-center h-full">
                <input
                    v-model="donesTasks"
                    :value="task.id"
                    type="checkbox"
                    class="h-[1rem] w-[2rem] mr-4 accent-success cursor-pointer"
                />
            </div>
            <p class="md:flex-1 text-xl">
                <label :class="{ 'opacity-55 line-through': isTaskDone(task.id) }">{{ task.title }} </label>
            </p>
            <div class="flex gap-2 justify-end w-full md:w-auto">
                <IconButton class="bg-input" icon="edit" />
                <IconButton class="bg-red-700" icon="delete" />
            </div>
        </div>
    </div>

    <div v-else>Nenhuma tarefa cadastrada</div>
</template>

<script lang="ts" setup>
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import { computed, ref } from 'vue'
interface ITask {
    id: number
    title: string
}

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

const newTask = ref<string>('')
const donesTasks = ref<number[]>([])

const isTaskDone = computed(() => {
    return (taskId: number) => donesTasks.value.includes(taskId)
})
</script>
