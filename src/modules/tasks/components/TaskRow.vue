<template>
    <div
        class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-8"
        :class="{ 'border-l-success': isTaskDone }"
    >
        <div class="flex-1 md:flex-none md:w-[2rem] flex order-1 self-center h-full">
            <input
                v-model="model"
                :value="task.id"
                type="checkbox"
                class="h-[1rem] w-[2rem] mr-4 accent-success cursor-pointer"
            />
        </div>
        <p class="w-full md:flex-1 order-3 md:order-2 text-xl">
            <form v-if="isEdit" @submit.prevent="handleUpdate">
                <div class="flex flex-wrap md:flex-nowrap">
                    <DefaultInputText
                        v-model="inputEditText"
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
            

            <label v-else  :class="{ 'opacity-55 line-through': isTaskDone }">{{ task.description }} </label>
        </p>
        <div v-if="!isEdit" class="flex gap-2 order-2 md:order-3 justify-end w-auto">
            <IconButton v-if="!reactiveIsTaskDone" @click="ableEdit" class="bg-input" icon="edit" />
            <IconButton @click="handleDelete" class="bg-red-700 hover:bg-red-500" icon="delete" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'
import { useToast } from 'vue-toastification'

import type { ITask } from '@/modules/tasks/types'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { apiDeleteTask } from '../service'

interface Props {
    task: ITask
    isTaskDone: boolean
  
}

const toast = useToast()
const { task, isTaskDone } = defineProps<Props>()

const reactiveIsTaskDone = computed(() => isTaskDone)

const model = defineModel()


const isEdit = ref<boolean>(false)

const inputRef = ref<{ input: HTMLInputElement } | null>(null)

const inputEditText = ref<string>('')

const emit = defineEmits<{
    (e: 'taskDeleted'): void;
    (e: 'taskUpdated', task: ITask): void
}>();

onMounted(() => {
    if (task) {
        inputEditText.value = task.description
    }
})

const ableEdit = async () => {
    isEdit.value = true
    await nextTick()
    if (inputRef.value?.input) {
        inputRef.value.input.focus()
    }
}

// funcao que atualiza a tarefa
const handleUpdate = () => {
    const updatedTask = {
        id: task.id,
        description: inputEditText.value,
        stTask: task.stTask 
    }

    emit('taskUpdated', updatedTask) 
    isEdit.value = false
    toast.success('Tarefa atualizada com sucesso')
}

// funcao que atualiza a tarefa
const handleDelete = async() => {

    try {

        await apiDeleteTask(task.id!)

        toast.success('Tarefa deletada com sucesso!')
        
        emit('taskDeleted');
        
    } catch (error: any) {
        toast.error(error.message)
    }
   


}

watch(reactiveIsTaskDone, (newValue)=> {
    if(newValue){

        isEdit.value = false
    }

})
</script>
