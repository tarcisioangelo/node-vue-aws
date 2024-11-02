<script lang="ts" setup>
import UserInfo from './UserInfo.vue'
</script>

<template>
    <header class="custom-header">
        <div class="logo-box">
            <img src="/logo.png" width="40px" height="40px" />
            <label class="font-bold text-xl md:text-3xl">USERTASKS</label>
        </div>
        <UserInfo />
    </header>
</template>

<style scoped>
.custom-header {
    @apply bg-component  h-[68px] shadow-2xl flex justify-between items-center py-3 px-4 md:px-10 text-3xl font-semibold text-white;
}
.logo-box {
    @apply flex items-center gap-3 cursor-pointer;
}
</style>
