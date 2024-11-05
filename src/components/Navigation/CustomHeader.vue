<template>
    <header class="custom-header">
        <div>
            <IconButton
                icon="menu"
                customClass="bg-transparent shadow-lg shadow-violet-800 hover:bg-primary w-12 h-12"
            />
        </div>
        <div class="logo-box">
            <img src="/logo.png" width="40px" height="40px" />
            <label class="font-bold text-xl md:text-3xl">USERTASKS</label>
        </div>
        <!-- <button @click="isOpenMenu = !isOpenMenu">
            <UserInfo />
        </button> -->
        <!-- <div class="absolute right-8 top-[4rem]" v-if="isOpenMenu">
            <UserMenu @dropdownClosed="isOpenMenu = false" />
        </div> -->
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserInfo from './UserInfo.vue'
import UserMenu from './UserMenu.vue'
import IconButton from '../Buttons/IconButton.vue'

const isOpenMenu = ref<boolean>(false)

const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value
}
</script>

<style scoped>
.custom-header {
    @apply top-0 w-full relative   bg-component  h-[68px] shadow-sm shadow-violet-400 flex  items-center py-3 px-4 md:px-10 text-3xl font-semibold text-white;
}
.logo-box {
    @apply flex m-auto items-center gap-3 cursor-pointer;
}
</style>
