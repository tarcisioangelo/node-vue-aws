<template>
    <div class="p-16">
        <p class="text-[56px]">Login</p>
        <span>Não possui conta? <a class="link" href="#">Faça o cadastro</a> </span>

        <form class="mt-3" id="signinForm" name="signinForm">
            <label class="text-light" for="email">Email</label>
            <input
                class="w-full mt-2 rounded-[10px] h-[50px] bg-input text-white/75 outline-none px-4"
                autocomplete="off"
                type="text"
                name="email"
                id="email"
            />
        </form>
    </div>
</template>
