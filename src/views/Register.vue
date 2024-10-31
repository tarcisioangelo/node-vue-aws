<template>
    <form @submit.prevent="handleSubmit" autocomplete="off">
        <p class="text-center text-xl font-semibold">Sistema de gerenciamento de tarefas</p>
        <p class="text-center text-md font-light pb-4">Crie sua conta e use todas as funcionalidades sem custo.</p>
        <FormContainer>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.name"
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Digite seu nome"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.lastName"
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
                    v-model="newUser.email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="teste@gmail.com"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.password"
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite uma senha"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.passwordConfirm"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    label="Confirmação de Senha"
                    placeholder="Confirme a senha"
                    :v$="v$"
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
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import { helpers, required, email, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default defineComponent({
    components: {
        DefaultButton,
        FormContainer,
        DefaultInputText,
    },
    setup() {
        const router = useRouter()

        const newUser = reactive({
            name: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        })
        const rules = computed(() => ({
            name: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
            lastName: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
            email: {
                required: helpers.withMessage('Campo obrigatório', required),
                email: helpers.withMessage('Email inválido', email),
            },
            password: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
            passwordConfirm: {
                required: helpers.withMessage('Campo obrigatório', required),
                sameAsPassword: helpers.withMessage(
                    'As senhas devem ser iguais',
                    sameAs(computed(() => newUser.password))
                ),
            },
        }))

        const v$ = useVuelidate(rules, newUser)

        const handleSubmit = async () => {
            const isValid = await v$.value.$validate()
            if (isValid) {
                router.push('/login')
            } else {
                console.log('Formulário inválido')
            }
        }

        return { newUser, router, v$, handleSubmit }
    },
})
</script>
