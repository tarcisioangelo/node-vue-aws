<template>
    <div class="guest-content">
        <div class="first-child">
            <p class="text-[36px] font-semibold">USERTASKS</p>
            <img src="/login.svg" class="w-[20rem] h-[20rem]" />
            <p class="font-normal text-[24px] text-center">Faça login e mantenha suas tarefas atualizadas!</p>
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
    @apply flex flex-col w-full md:w-1/2 h-full bg-indigo-700 justify-around items-center rounded-[15px] text-white p-5;
}
.second-child {
    @apply w-full md:w-1/2 h-full container;
}
</style>
