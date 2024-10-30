<template>
    <form @submit.prevent="handleSubmit" autocomplete="off">
        <p class="text-center text-xl font-semibold">Sistema de gerenciamento de tarefas</p>
        <p class="text-center text-md font-light pb-4">Crie sua conta e use todas as funcionalidades sem custo.</p>
        <FormContainer>
            <div class="col-span-12 md:col-span-6">
                <label class="text-white/75" for="name">Nome</label>
                <input
                    class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Digite seu nome"
                    autocomplete="off"
                    v-model="name"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <label class="text-white/75" for="lastName">Sobrenome</label>
                <input
                    class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    placeholder="Digite seu sobrenome"
                    v-model="last_Name"
                />
            </div>
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
            <div class="col-span-12 md:col-span-6">
                <label class="text-white/75" for="password">Senha</label>
                <input
                    class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    v-model="password"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <label class="text-white/75" for="password_confirm">Confirmação de senha</label>
                <input
                    class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                    type="password"
                    id="password_confirm"
                    name="password_confirm"
                    placeholder="Confirme sua senha"
                    v-model="password_confirm"
                />
            </div>
        </FormContainer>
        <div class="w-64 m-auto text-center pt-4">
            <DefaultButton text="Criar sua conta na Usertasks" />
        </div>

        <p @click="router.push('/login')" class="text-center cursor-pointer pt-4 w-auto">Já tenho conta</p>
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import FormContainer from '@/components/Form/FormContainer.vue'

export default defineComponent({
    components: {
        DefaultButton,
        FormContainer,
    },
    setup() {
        const router = useRouter()

        const name = ref<string>('')
        const last_Name = ref<string>('')
        const email = ref('')
        const password = ref<string>('')
        const password_confirm = ref<string>('')

        const handleSubmit = () => {
            console.log('TESTE SUBMISSAO')
        }

        return { name, last_Name, email, password, password_confirm, router, handleSubmit }
    },
})
</script>
