<template>
    <div class="loggedin-content">
        <CustomHeader />
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script lang="ts" setup>
import CustomHeader from '@/components/Navigation/CustomHeader.vue'
</script>

<style scoped>
.loggedin-content {
    @apply flex flex-col h-[100vh]  bg-background;
}
</style>
