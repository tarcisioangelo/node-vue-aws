<template>
    <form @submit.prevent="handleSubmitPassword" autocomplete="off">
        <p class="text-xl font-semibold my-4">Segurança</p>
        <FormContainer>
            <div class="col-span-12 md:col-span-4">
                <DefaultInputText
                    required
                    v-model="refPassword.password"
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-4">
                <DefaultInputText
                    required
                    v-model="refPassword.newPassword"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    label="Nova Senha"
                    placeholder="Digite a nova senha"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-4">
                <DefaultInputText
                    required
                    v-model="refPassword.newPasswordConfirm"
                    id="newPasswordConfirm"
                    name="newPasswordConfirm"
                    type="password"
                    label="Confirmar nova senha"
                    placeholder="Confirme a nova senha"
                    :v$="v$"
                />
            </div>
        </FormContainer>
        <div class="w-64 m-auto pt-4">
            <DefaultButton text="Atualizar senha" />
        </div>
    </form>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, required, sameAs } from '@vuelidate/validators'

// components
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import type { IPassword } from '../types'
import { apiUpdatePassword } from '../service'
import { useToast } from 'vue-toastification'

const toast = useToast()

const refPassword = reactive({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
})
const rules = computed(() => ({
    password: {
        required: helpers.withMessage('Campo obrigatório', required),
    },

    newPassword: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    newPasswordConfirm: {
        required: helpers.withMessage('Campo obrigatório', required),
        sameAsPassword: helpers.withMessage(
            'As senhas devem ser iguais',
            sameAs(computed(() => refPassword.newPassword))
        ),
    },
}))

const v$ = useVuelidate(rules, refPassword)

const handleSubmitPassword = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        await handleUpdatePassword(refPassword)
    } else {
        console.log('Formulário inválido')
    }
}

const handleUpdatePassword = async (data: IPassword) => {
    try {
        await apiUpdatePassword(data)

        toast.success('Senha alterada com sucesso!')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>
