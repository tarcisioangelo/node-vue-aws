<template>
    <button
        @click="handleClick"
        :class="[
            'w-full p-3 rounded-xl font-semibold bg-primary hover:bg-primary-hover flex items-center justify-center gap-3',
            customClass,
        ]"
    >
        <span v-if="icon" class="material-icons-outlined">{{ icon }} </span> {{ text }}
    </button>
</template>

<script setup lang="ts">
defineProps<{
    text: string
    icon?: string
    customClass?: string
}>()

const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    emit('click')
}
</script>
