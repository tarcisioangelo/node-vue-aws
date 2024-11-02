<template>
    <TitlePage />

    <form class="mt-8 -pl-2">
        <div class="flex gap-2">
            <DefaultInputText v-model="newTask" id="newTask" name="newTask" placeholder="Adicionar tarefa" />
            <DefaultButton text="Adicionar tarefa" customClass="h-[51px] !min-w-auto max-w-[300px]" />
        </div>
    </form>

    <div v-if="tasks.length > 0" class="flex flex-col gap-3 mt-4">
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg"
        >
            <div>
                <input type="checkbox" class="h-[1rem] w-[1rem] mt-1.5 accent-success" />
            </div>
            <p class="flex-1 text-xl">{{ task.title }}</p>
            <div class="flex gap-2">
                <IconButton class="bg-primary" icon="edit" />
                <IconButton class="bg-primary" icon="delete" />
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
