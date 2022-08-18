<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import SetAndReSetPassword from '../components/SetAndReSetPassword.vue'
import stores from '../stores/index.js'

const store = stores().currentUserStore()
const route = useRoute()

const formData = ref()

async function loadData () {
  if (route.name === 'accept-invitation') {
    formData.value = { text: 'Set Password' }
  }
}

async function eventHandler (data) {
  if (formData.value.text === 'Set Password') {
    await store.acceptInvitation(data.token, data.newPassword, data.newPasswordAgain, data.name)
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <SetAndReSetPassword :formData="formData" @buttonEvent="eventHandler" />
</template>
