<template>
    <div class="w-full">
        <form @submit.prevent="handleLogin" autocomplete="off">
            <p class="text-[36px]">Login:</p>
            <p class="text-lg text-center">Faça login e mantenha suas tarefas atualizadas!</p>
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
            <div class="w-full m-auto text-center pt-4">
                <DefaultButton text="Entrar na Usertasks" />
            </div>

            <p @click="router.push('/register')" class="text-center cursor-pointer pt-4 w-auto">Já tenho conta</p>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import { api } from '@/globals/api'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, email, required } from '@vuelidate/validators'

// components
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
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
        toast.success('Autenticado com sucesso')
        router.push('/tasks')
    } else {
        console.log('Formulário inválido')
    }
}

onMounted(async () => {
    const response = await api.get('/')
    console.log(response)
})
</script>
