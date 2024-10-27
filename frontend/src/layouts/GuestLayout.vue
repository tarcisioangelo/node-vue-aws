<template>
    <div class="guest-content">
        <div class="first-child">
            <h4 class="text-[36px] font-semibold">Usertasks</h4>
        </div>
        <div class="second-child">
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
.guest-content {
    @apply flex flex-col md:flex-row h-[100vh] p-2;
}
.first-child {
    @apply flex flex-col w-full md:w-1/3 h-full bg-component justify-center items-center rounded-[15px] text-white p-5;
}
.second-child {
    @apply w-full md:w-2/3 h-full container;
}
</style>
