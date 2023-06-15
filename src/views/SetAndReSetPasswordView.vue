<script setup>

import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import SetAndReSetPassword from '../components/SetAndReSetPassword.vue'
import alerts from '../alerts/alert.js'
import { useCurrentUserStore } from '../stores/index.js'

const store = useCurrentUserStore()
const route = useRoute()
const router = useRouter()
const { tm } = useI18n()

const alert = alerts()

const formData = ref()

async function loadData () {
  if (route.name === 'accept-invitation') {
    formData.value = {
      text: tm('setAndReSetPassword.acceptHeader')
    }
  }
  if (route.name === 'forgot-password-reset') {
    formData.value = {
      text: tm('setAndReSetPassword.forgotHeader')
    }
  }
}

async function handleSetPasswordEvent (params) {
  const res = await store.acceptInvitation(params.token, params.newPassword, params.newPasswordAgain, params.name)
  if (!res.message) {
    await alert.message('Admin registered successfully')
  }
}

async function handleResetPassword (params, statusCallBack) {
  const res = await store.resetForgotPassword(params.token, params.newPassword, params.newPasswordAgain)
  statusCallBack(!res.message && res)
  if (!res.message) {
    await new Promise(resolve => setTimeout(resolve, 5000))
    router.push('/me')
  }
}

watchEffect(async () => {
  loadData()
})

</script>

<template>

  <SetAndReSetPassword :formData="formData" @setPasswordEventHandler="handleSetPasswordEvent" @resetPasswordEventHandler="handleResetPassword" />

</template>
