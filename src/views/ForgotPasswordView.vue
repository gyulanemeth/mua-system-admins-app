<script setup>
import { useCurrentUserStore } from '../stores/index.js'
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue'

const store = useCurrentUserStore()

async function handlePasswordRecoveryEvent (data, statusCallBack) {
  const res = await store.sendForgotPassword(data)
  statusCallBack(!res.message)
}

</script>

<template>

  <ForgotPasswordForm  @passwordRecoveryEventHandler="handlePasswordRecoveryEvent" />

</template>
