<template>
    <div class="w-full my-auto">
        <p class="text-[36px]">Login</p>

        <form @submit.prevent="handleLogin" autocomplete="off">
            <FormContainer>
                <div class="col-span-12">
                    <label class="text-white/75" for="email">Email</label>
                    <input
                        v-model="userAuth.email"
                        class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="teste@gmail.com"
                    />

                    <div v-if="v$.email.$error" class="text-red-500">
                        {{ v$.email.$errors[0].$message }}
                    </div>
                </div>
                <div class="col-span-12">
                    <label class="text-white/75" for="email">Senha</label>
                    <input
                        v-model="userAuth.password"
                        class="w-full my-2 bg-input h-[50px] rounded-[10px] outlined-none px-4 focus:bg-input-line outline-none"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="digite sua senha"
                    />
                    <div v-if="v$.password.$error" class="text-red-500">
                        {{ v$.password.$errors[0].$message }}
                    </div>
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
import { computed, defineComponent, reactive } from 'vue'
import { helpers, email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default defineComponent({
    components: {
        FormContainer,
        DefaultButton,
    },
    setup() {
        const userAuth = reactive({
            email: '',
            password: '',
        })
        const rules = computed(() => ({
            email: {
                required: helpers.withMessage('Campo obrigatório', required),
                email: helpers.withMessage('Email inválido', email),
            },
            password: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
        }))

        const v$ = useVuelidate(rules, userAuth)

        const handleLogin = async () => {
            const isValid = await v$.value.$validate()
            if (isValid) {
                console.log('Formulário válido:', userAuth)
            } else {
                console.log('Formulário inválido')
            }
        }

        return { userAuth, v$, handleLogin }
    },
})
</script>
