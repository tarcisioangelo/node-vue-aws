<template>
    <div ref="dropdown" class="min-w-64 bg-component/95 text-md font-light rounded shadow-3xl border border-background">
        <ul>
            <li>
                <router-link to="/option1" class="block px-4 py-2 hover:bg-gray-100">Opção 1</router-link>
            </li>
            <li>
                <router-link to="/option2" class="block px-4 py-2 hover:bg-gray-100">Opção 2</router-link>
            </li>
            <li>
                <router-link to="/option3" class="block px-4 py-2 hover:bg-gray-100">Opção 3</router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dropdown = ref<HTMLElement | null>(null)

const emit = defineEmits<{
    (event: 'dropdownClosed'): void
}>()

const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        console.log('JÁ ENTROU NO OUTSIDE')
        emit('dropdownClosed')
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
