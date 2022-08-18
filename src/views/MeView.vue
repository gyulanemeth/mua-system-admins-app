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
    if (res.success) {
      await alert.message('Email changed successfully')
    }
  } else if (!store.user.name) {
    await store.readOne()
  }
  data.value = store.user
}

async function eventHandler (params) {
  if (params.operation === 'updateName') {
    await store.patchName(params.data)
  }
  if (params.operation === 'Delete') {
    const confirm = await alert.confirmAlert('do you want to Delete the record?')
    if (confirm.isConfirmed) {
      store.deleteOne(params.id)
    }
  }
  if (params.operation === 'UpdatePassword') {
    await store.patchPassword(params.data.oldPassword, params.data.newPassword, params.data.confirmNewPassword)
  }
  if (params.operation === 'UpdateEmail') {
    await store.patchEmail(params.data.newEmail)
  }
  if (params.operation === 'DeleteMyAccount') {
    store = stores().adminsStore()
    await store.deleteOne(params.data.id)
    store = stores().currentUserStore()
    await store.logout()
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <MeDetails v-if='data' :data="data" @buttonEvent="eventHandler" />
</template>
