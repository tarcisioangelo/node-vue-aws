<template>
    <TitlePage title="Perfil" icon="person" />

    <form @submit.prevent="handleSubmit" autocomplete="off">
        <p class="text-xl font-semibold mt-4">Dados do usuário</p>

        <FormContainer custom-class="mt-4">
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="userRef.firstName"
                    id="firstName"
                    name="firstName"
                    label="Nome"
                    placeholder="Digite seu nome"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="userRef.lastName"
                    id="lastName"
                    name="lastName"
                    label="Sobrenome"
                    placeholder="Digite seu sobrenome"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12">
                <DefaultInputText
                    required
                    v-model="userRef.email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="teste@gmail.com"
                    :v$="v$"
                />
            </div>
        </FormContainer>
        <div class="w-64 m-auto pt-4">
            <DefaultButton text="Atualizar dados" />
        </div>
    </form>

    <FormPassword />
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'

// components
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import type { IUserPayload } from '@/modules/register/types'
import { apiRegister } from '@/modules/register/service'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import FormPassword from '../components/FormPassword.vue'

const store = useStore()

const router = useRouter()

const toast = useToast()

const userRef = reactive({
    firstName: '',
    lastName: '',
    email: '',
})
const rules = computed(() => ({
    firstName: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    lastName: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    email: {
        required: helpers.withMessage('Campo obrigatório', required),
        email: helpers.withMessage('Email inválido', email),
    },
}))

const v$ = useVuelidate(rules, userRef)

const handleSubmit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        await handleRegister(userRef)
    } else {
        console.log('Formulário inválido')
    }
}

const user = computed(() => store.getters['user/user'])

onMounted(() => {
    if (user) {
        userRef.email = user.value.email
        userRef.firstName = user.value.firstName
        userRef.lastName = user.value.lastName
    } else {
        router.push('/login')
    }
})

const handleRegister = async (data: IUserPayload) => {
    try {
        await apiRegister(data)

        toast.success('Cadastro realizado com sucesso!')

        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>
