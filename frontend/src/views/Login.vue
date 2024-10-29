<template>
    <div class="px-12 py-20">
        <p class="text-[36px]">Login</p>

        <div class="p-8 mt-6 max-w-[400px] m-auto bg-component rounded-xl shadow-xl">
            <form  class="flex flex-col space-y-1">
                <div>
                    <label class="text-white/75" for="email">Email</label>
                    <input
                        class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="teste@gmail.com"
                        v-model="email"
                    />
                </div>
                <div>
                    <label class="text-white/75" for="email">Senha</label>
                    <input
                        class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="digite sua senha"
                        v-model="password"
                    />
                </div>
                <div class="w-full text-center pt-4">
                    <button class="w-full p-3 rounded-xl bg-primary font-bold hover:bg-primary-hover">
                        Entrar no Usertasks
                    </button>
                </div>

                <p @click="$router.push('/register')" class="text-center cursor-pointer pt-4 w-auto">Já tenho conta</p>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// import DefaultCard from '@/components/DefaultCard.vue'

export default defineComponent({
    components: {
        // DefaultCard,
    },
    setup() {
        const email = ref('')
        const password = ref<string>('')

        return { email, password }
    },
})
</script>
