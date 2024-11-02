<template>
    <TitlePage />

    <form class="mt-8">
        <div class="flex">
            <DefaultInputText v-model="newTask" id="newTask" name="newTask" placeholder="Digite o nome da tarefa..." />
            <DefaultButton
                text="Adicionar tarefa"
                icon="add_circle"
                customClass="ml-4 h-[51px] !min-w-auto max-w-[300px]"
            />
        </div>
    </form>

    <div v-if="tasks.length > 0" class="flex flex-col gap-3 mt-4">
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-primary/50 border-l-8"
        >
            <p class="flex-1 text-xl">
                <input type="checkbox" class="h-[1rem] w-[1rem] mt-1.5 mr-4 accent-success" />

                {{ task.title }}
            </p>
            <div class="flex gap-2">
                <IconButton class="bg-warning/75" icon="edit" />
                <IconButton class="bg-danger" icon="delete" />
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
import { ref } from 'vue'
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
        title: 'Tarefa 2',
    },
]

const newTask = ref<string>('')
</script>
