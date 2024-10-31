<template>
    <label class="text-white/75" :for="props.name">
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

    <div v-if="props.error" class="text-red-500 text-xs">
        {{ props.error }}
    </div>
</template>
<script lang="ts" setup>
interface Props {
    id: string
    name: string
    required?: boolean
    type?: string
    label?: string
    placeholder?: string
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
})

const model = defineModel()
</script>

<style scoped>
.input_default {
    @apply w-full my-2 bg-input h-[50px] rounded-[10px] px-4 focus:bg-input-line outline-none;
}
</style>
