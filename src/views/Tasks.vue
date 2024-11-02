<template>
    <TitlePage />

    <div v-if="tasks.length > 0" class="flex flex-col gap-3">
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-4 rounded-lg gap-2"
        >
            <p class="flex-1">a</p>
            <p class="flex-1">{{ task.title }}</p>
            <div class="flex gap-2">
                <IconButton icon="edit" />
            </div>
        </div>
    </div>

    <div v-else>Nenhuma tarefa cadastrada</div>
</template>

<script lang="ts" setup>
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
