<template>
    HOMEEE

    <div v-if="tasks.length > 0" class="flex flex-col gap-3">
        <div
            v-for="task in tasks"
            :key="task.id"
            class="flex flex-wrap border border-input-line items-center p-4 rounded-lg hover:bg-component-hover cursor-pointer gap-2"
        >
            <p class="flex-1">a</p>
            <p class="flex-1">{{ task.title }}</p>
        </div>
    </div>

    <div v-else>Nenhuma tarefa cadastrada</div>
</template>

<script lang="ts" setup>
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
