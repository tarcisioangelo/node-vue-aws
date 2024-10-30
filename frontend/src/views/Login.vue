<template>
    <div class="w-full my-auto">
        <p class="text-[36px]">Login</p>

        <form autocomplete="off">
            <FormContainer>
                <div class="col-span-12">
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
                <div class="col-span-12">
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
            </FormContainer>
            <div class="w-64 m-auto text-center pt-4">
                <DefaultButton text="Entrar na Usertasks" />
            </div>

            <p @click="$router.push('/register')" class="text-center cursor-pointer pt-4 w-auto">Já tenho conta</p>
        </form>
    </div>
</template>
<script lang="ts">
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import { defineComponent, ref } from 'vue'
// import DefaultCard from '@/components/DefaultCard.vue'

export default defineComponent({
    components: {
        FormContainer,
        DefaultButton,
    },
    setup() {
        const email = ref('')
        const password = ref<string>('')

        return { email, password }
    },
})
</script>
