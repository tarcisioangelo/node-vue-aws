<template>
    <button
        @click="handleClick"
        :class="[
            ' h-8 w-8 rounded-lg drop-shadow-2xl flex  font-semibold bg-input hover:bg-input-line  hover:font-extrabold',
            customClass,
        ]"
    >
        <span class="material-icons-outlined m-auto"> {{ icon }}</span>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    icon: string
    customClass?: string
}>()

const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    emit('click')
}
</script>
