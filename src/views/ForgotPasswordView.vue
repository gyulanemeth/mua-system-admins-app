<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useCurrentUserStore } from '../stores/index.js'
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue'

const route = useRoute()
const store = useCurrentUserStore()

const formData = ref()

async function loadData () {
  if (route.name === 'forgot-password') {
    formData.value = { inputType: 'Email', inputText: 'Email', text: 'Password recovery' }
  }
}

async function handlePasswordRecoveryEvent (data, statusCallBack) {
  const res = await store.sendForgotPassword(data)
  statusCallBack(!res.message)
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <ForgotPasswordForm :formData="formData" @passwordRecoveryEventHandler="handlePasswordRecoveryEvent" />
</template>
