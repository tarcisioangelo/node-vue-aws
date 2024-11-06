<template>
    <div
        class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-8 border-l-amber-300"
        :class="{ '!border-l-success': isDone }"
    >
        <div class="w-full md:flex-1 order-3 md:order-2 text-xl">
            <form v-if="isEdit" @submit.prevent="handleUpdate">
                <div class="flex flex-wrap md:flex-nowrap">
                    <DefaultInputText
                        v-model="model.description"
                        ref="inputRef"
                        id="inputEditText"
                        name="inputEditText"
                        placeholder="Digite o nome da tarefa..."
                        custom-class="!bg-transparent border-b !rounded-[0px] border-b-primary md:mt-1 md:mb-1"
                    />
                    <DefaultButton
                        text="Atualizar"
                        customClass="bg-success hover:bg-success md:ml-4 h-[41px] md:h-[51px] !min-w-auto text-xs md:max-w-[200px]"
                    />
                </div>
            </form>

            <label v-else>
                {{ model.description }}
            </label>
        </div>

        <div v-if="!isEdit" class="flex gap-2 order-2 md:order-3 justify-end w-auto">
            <IconButton v-if="!isDone" @click="toggleStatus" class="bg-success hover:bg-success" icon="check" />
            <IconButton v-if="isDone" @click="toggleStatus" class="bg-success hover:bg-success" icon="check" />
            <IconButton v-if="!isDone" @click="ableEdit" class="bg-input" icon="edit" />
            <IconButton @click="handleDelete" class="bg-red-700 hover:bg-red-500" icon="delete" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

// Components
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'

// Services
import { apiDeleteTask } from '@/services'

// Types
import type { ITask } from '@/modules/tasks/types'

interface Props {
    task: ITask
}

const toast = useToast()
const { task } = defineProps<Props>()

const model = reactive({
    id: task.id,
    description: task.description,
    dateTask: task.dateTask,
    stTask: task.stTask,
})

const isEdit = ref(false)
const inputRef = ref<{ input: HTMLInputElement } | null>(null)

const isDone = computed(() => {
    return model.stTask === 'B'
})

const emit = defineEmits<{
    (e: 'taskDeleted'): void
    (e: 'taskUpdated', task: ITask): void
}>()

const toggleStatus = () => {
    model.stTask = model.stTask === 'A' ? 'B' : 'A'
    emit('taskUpdated', model)
}

const ableEdit = async () => {
    isEdit.value = true
    await nextTick()
    if (inputRef.value?.input) {
        inputRef.value.input.focus()
    }
}

const handleUpdate = () => {
    emit('taskUpdated', model)
    isEdit.value = false
}

const handleDelete = async () => {
    try {
        await apiDeleteTask(task.id!)
        toast.success('Tarefa deletada com sucesso!')
        emit('taskDeleted')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>
