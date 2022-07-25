<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import EmailAndNameForm from '../components/EmailAndNameForm.vue'
import stores from '../stores/index.js'
import alerts from '../alerts/alert.js'

const route = useRoute()
const store = stores().currentUserStore()
const alert = alerts()

const formData = ref()

async function loadData () {
  if (route.name === 'invite') {
    formData.value = { inputType: 'Email', inputText: 'Email', text: 'Invite' }
  } else if (route.name === 'forgot-password') {
    formData.value = { inputType: 'Email', inputText: 'Email', text: 'Reset Password' }
  } else if (route.name === 'updateName') {
    formData.value = { inputType: 'text', inputText: 'New Name', text: 'Update Name' }
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Invite') {
    res = await store.sendInvitation(data)
    if (res.success) {
      await alert.message('message Send to your email')
    }
  } else if (formData.value.text === 'Reset Password') {
    res = await store.sendForgotPassword(data)
    if (res.success) {
      await alert.message('message Send to your email')
    }
  } else if (formData.value.text === 'Update Name') {
    await store.patchName(data)
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <EmailAndNameForm :formData="formData" @buttonEvent="eventHandler" />
</template>
