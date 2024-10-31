<template>
    <div class="w-full my-auto">
        <p class="text-[36px]">Login</p>

        <form @submit.prevent="handleLogin" autocomplete="off">
            <FormContainer>
                <div class="col-span-12">
                    <DefaultInputText
                        required
                        v-model="userAuth.email"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="teste@gmail.com"
                        :error="v$.email.$error ? v$.email.$errors[0].$message : undefined"
                    />
                </div>
                <div class="col-span-12">
                    <DefaultInputText
                        required
                        v-model="userAuth.password"
                        id="password"
                        name="password"
                        type="password"
                        label="Senha"
                        placeholder="Digite sua senha"
                        :error="v$.password.$error ? v$.password.$errors[0].$message : undefined"
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
import { computed, defineComponent, reactive } from 'vue'
import { helpers, email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'

export default defineComponent({
    components: {
        FormContainer,
        DefaultButton,
        DefaultInputText,
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
