<template>
    <TitlePage title="Perfil" icon="person" />

    <FormProfile />
    <FormPassword />
</template>

<script lang="ts" setup>
// components

import TitlePage from '@/components/Navigation/TitlePage.vue'
import FormPassword from '../components/FormPassword.vue'
import FormProfile from '../components/FormProfile.vue'
</script>
