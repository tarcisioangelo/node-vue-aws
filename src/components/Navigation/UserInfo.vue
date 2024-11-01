<template>
    <div class="flex items-center gap-3 md:bg-input/75 p-1 rounded-lg min-w-[10%] cursor-pointer">
        <Avatar text="FM" />
        <div class="hidden md:flex flex-col flex-1 leading-none">
            <p class="text-[16px]">Filipe Martins</p>
            <label class="text-xs font-light truncate">fillipe.marttins@gmail.com</label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avatar from './Avatar.vue'
</script>
