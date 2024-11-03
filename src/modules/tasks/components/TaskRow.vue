<template>
    <div
        class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-8"
        :class="{ 'border-l-success': isTaskDone }"
    >
        <div class="w-[2rem] flex self-center h-full">
            <input
                v-model="model"
                :value="task.id"
                type="checkbox"
                class="h-[1rem] w-[2rem] mr-4 accent-success cursor-pointer"
            />
        </div>
        <p class="md:flex-1 text-xl">
            <DefaultInputText
                v-if="isEdit"
                v-model="editText"
                ref="inputRef"
                id="editText"
                name="editText"
                placeholder="Digite o nome da tarefa..."
                custom-class="!bg-transparent border-b !rounded-[0px] border-b-primary !mt-1 !mb-1"
            />

            <label v-else :class="{ 'opacity-55 line-through': isTaskDone }">{{ task.title }} </label>
        </p>
        <div v-if="!isEdit" class="flex gap-2 justify-end w-full md:w-auto">
            <IconButton @click="ableEdit" class="bg-input" icon="edit" />
            <IconButton class="bg-red-700" icon="delete" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import IconButton from '@/components/Buttons/IconButton.vue'

import type { ITask } from '@/modules/tasks/types'
import { nextTick, onMounted, ref } from 'vue'

interface Props {
    task: ITask
    isTaskDone: boolean
}

const { task, isTaskDone } = defineProps<Props>()

const model = defineModel()

const isEdit = ref<boolean>(false)

const inputRef = ref<{ input: HTMLInputElement } | null>(null)

const editText = ref<string>('')

onMounted(() => {
    if (task) {
        editText.value = task.title
    }
})

const ableEdit = async () => {
    isEdit.value = true
    await nextTick()
    if (inputRef.value?.input) {
        inputRef.value.input.focus()
    }
}
</script>
