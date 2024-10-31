<template>
    <div class="loggedin-content">
        <header>
            <nav>CABEÇALHO</nav>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.loggedin-content {
    @apply flex flex-col h-[100vh]  bg-component;
}
</style>
