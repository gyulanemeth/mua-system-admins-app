<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import MeDetails from '../components/MeDetails.vue'

import alerts from '../alerts/alert.js'
import { useCurrentUserStore, useAdminsStore } from '../stores/index.js'

let store = useCurrentUserStore()
const route = useRoute()
const router = useRouter()

const alert = alerts()

const data = ref()

if (route.name === 'verify-email') {
  const res = await store.patchEmailConfirm(route.query.token)
  if (!res.message) {
    router.push({
      path: '/me',
      query: {
        tab: 'changeEmail'
      }
    })
    await new Promise(resolve => setTimeout(resolve, 5000))
    router.push({
      path: '/me',
      query: {},
      replace: true
    })
  }
} else if (!store.user || !store.user.name) {
  await store.readOne()
}
data.value = store.user

async function handleUpdateNameHandler (params) {
  const res = await store.patchName(params)
  if (res) {
    await alert.message('Name updated successfully')
  }
}

async function handleUpdatePasswordHandler (params) {
  const res = await store.patchPassword(params.oldPassword, params.newPassword, params.confirmNewPassword)
  if (!res.message) {
    await alert.message('Password updated successfully')
  }
}
async function handleUpdateEmailHandler (params, statusCallBack) {
  const res = await store.patchEmail(params.newEmail, params.confirmNewEmail)
  statusCallBack(!res.message)
}
async function handleDeleteMyAccountHandler (params) {
  store = useAdminsStore()
  const res = await store.deleteMyAccount(params)
  if (!res.message) {
    alert.message('Account Deleted successfully')
    store = useCurrentUserStore()
    await store.logout()
  }
}

</script>

<template>

<MeDetails v-if='data' :data="data" @updateNameHandler='handleUpdateNameHandler' @updatePasswordHandler='handleUpdatePasswordHandler' @updateEmailHandler='handleUpdateEmailHandler' @deleteMyAccountHandler='handleDeleteMyAccountHandler' />

</template>
