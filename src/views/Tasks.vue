<template>
    <div class="flex flex-wrap gap-2 justify-between items-center mb-8">
        <TitlePage />
        <DefaultButton customClass="h-[50px] w-full md:w-[300px] text-sm" text="Nova tarefa" />
    </div>

    <div v-if="tasks.length > 0" class="flex flex-col gap-3">
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin"
        >
            <p class="w-12 mt-2">
                <input type="checkbox" class="w-5 h-5 ml-[0.5rem]" />
            </p>
            <p class="flex-1">{{ task.title }}</p>
            <div class="flex gap-2">
                <IconButton icon="edit" />
                <IconButton icon="delete" />
            </div>
        </div>
    </div>

    <div v-else>Nenhuma tarefa cadastrada</div>
</template>

<script lang="ts" setup>
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'
import TitlePage from '@/components/Navigation/TitlePage.vue'
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
</script>
