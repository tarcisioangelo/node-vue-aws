<template>
    <div class="loggedin-content">
        <CustomHeader />
        <main>
            <div class="flex gap-2 h-[92vh]">
                <Drawer />

                <div class="container-content flex-1">
                    <RouterView />
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import CustomHeader from '@/components/Navigation/CustomHeader.vue'
import Drawer from '@/components/Navigation/Drawer.vue'
</script>

<style scoped>
.loggedin-content {
    @apply flex flex-col gap-1 w-full h-[100dvh];
}
</style>
