<template>
    <div class="flex relative gap-3 px-4 rounded-lg min-w-[10%] cursor-pointer">
        <Avatar text="FM" />
        <div class="flex flex-col leading-none">
            <label class="text-lg truncate">Filipe Martins</label>
            <label class="font-light truncate">fillipe.mart@gmail.com</label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avatar from './Avatar.vue'
</script>
