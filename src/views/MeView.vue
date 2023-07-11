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
    await store.readOne()
    router.push('/me')
  }
} else if (!store.user || !store.user.name) {
  await store.readOne()
}
data.value = store.user

async function handleUpdateNameEvent (params) {
  const res = await store.patchName(params)
  if (!res.message) {
    await alert.message('Name updated successfully')
  }
}

async function handleUpdatePasswordEvent (params, statusCallBack) {
  const res = await store.patchPassword(params.oldPassword, params.newPassword, params.confirmNewPassword)
  statusCallBack(!res.message)
}
async function handleUpdateEmailEvent (params, statusCallBack) {
  const res = await store.patchEmail(params.newEmail, params.confirmNewEmail)
  statusCallBack(!res.message)
}
async function handleDeleteEvent (params) {
  store = useAdminsStore()
  const res = await store.deleteOne(params)
  if (!res.message) {
    alert.message('Account Deleted successfully')
    store = useCurrentUserStore()
    await store.logout()
  }
}

async function uploadProfilePicture (params, statusCallBack) {
  const res = await store.uploadProfilePicture(params)
  data.value = store.user
  statusCallBack(res.profilePicture)
}

async function deleteProfilePicture (statusCallBack) {
  const res = await store.deleteProfilePicture()
  data.value = store.user
  statusCallBack(res)
}

</script>

<template>

<MeDetails v-if='data' :data="data" @deleteProfilePictureHandler="deleteProfilePicture" @uploadProfilePictureHandler="uploadProfilePicture" @updateNameHandler='handleUpdateNameEvent' @updatePasswordHandler='handleUpdatePasswordEvent' @updateEmailHandler='handleUpdateEmailEvent' @deleteEventHandler='handleDeleteEvent' />

</template>
