<template>
    <button
        @click="handleClick"
        :class="['w-full p-3 rounded-xl font-semibold bg-primary hover:bg-primary-hover', customClass]"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
    text: string
    customClass?: string
}>()

console.log('`TESTEEEEEE')
const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    emit('click')
}
</script>
