<template>
    <label class="text-white/75 font-semibold text-sm" :for="props.name">
        {{ props.label }}

        <span v-show="props.required" class="text-red-900">*</span>
    </label>
    <input
        v-model="model"
        class="input_default"
        :type="props.type"
        :id="props.id"
        :name="props.name"
        :placeholder="props.placeholder"
    />

    <div v-show="errorMessage" class="text-red-500 text-xs">
        {{ errorMessage }}
    </div>
</template>
<script lang="ts" setup>
import type { Validation } from '@vuelidate/core'
import { computed } from 'vue'

interface Props {
    id: string
    name: string
    required?: boolean
    type?: string
    label?: string
    placeholder?: string
    v$: Record<string, Validation>
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
})

const model = defineModel()

const errorMessage = computed(() => {
    const fieldValidation = props.v$[props.name]
    return fieldValidation?.$error ? fieldValidation.$errors[0]?.$message : undefined
})
</script>

<style scoped>
.input_default {
    @apply w-full mb-2 bg-input h-[50px] rounded-[10px] px-4 focus:bg-input-line outline-none;
}
</style>
