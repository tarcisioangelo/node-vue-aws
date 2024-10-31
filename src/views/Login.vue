<template>
    <div class="w-full">
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
                        :v$="v$"
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
                        :v$="v$"
                    />
                </div>
            </FormContainer>
            <div class="w-64 m-auto text-center pt-4">
                <DefaultButton text="Entrar na Usertasks" />
            </div>

            <p @click="router.push('/register')" class="text-center cursor-pointer pt-4 w-auto">Já tenho conta</p>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, email, required } from '@vuelidate/validators'

// components
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'

const router = useRouter()
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
        router.push('/home')
    } else {
        console.log('Formulário inválido')
    }
}
</script>
