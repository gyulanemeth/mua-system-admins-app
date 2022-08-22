<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import MeDetails from '../components/MeDetails.vue'

import stores from '../stores/index.js'
import alerts from '../alerts/alert.js'

let store = stores().currentUserStore()
const route = useRoute()
const alert = alerts()

const data = ref()

async function loadData () {
  if (route.name === 'verify-email') {
    const res = await store.patchEmailConfirm(route.query.token)
    if (res) {
      await alert.message('Email changed successfully')
    }
  } else if (!store.user.name) {
    await store.readOne()
  }
  data.value = store.user
}

async function eventHandler (params, statusCallBack) {
  let res
  if (params.operation === 'updateName') {
    res = await store.patchName(params.data)
    if (res) {
      await alert.message('Name updated successfully')
    }
  }
  if (params.operation === 'UpdatePassword') {
    res = await store.patchPassword(params.data.oldPassword, params.data.newPassword, params.data.confirmNewPassword)
    if (!res.message) {
      await alert.message('Password updated successfully')
    }
  }
  if (params.operation === 'UpdateEmail') {
    res = await store.patchEmail(params.data.newEmail)
    statusCallBack(!res.message)
  }
  if (params.operation === 'DeleteMyAccount') {
    store = stores().adminsStore()
    res = await store.deleteOne(params.data.id)
    if (!res.message) {
      alert.message('Account Deleted successfully')
      store = stores().currentUserStore()
      await store.logout()
    }
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <MeDetails v-if='data' :data="data" @buttonEvent="eventHandler" />
</template>
