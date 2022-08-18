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
  if (route.name === 'forgot-password') {
    formData.value = { inputType: 'Email', inputText: 'Email', text: 'Password recovery' }
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Password recovery') {
    res = await store.sendForgotPassword(data)
    if (res.success) {
      await alert.message('Message sent to your email')
    }
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <EmailAndNameForm :formData="formData" @buttonEvent="eventHandler" />
</template>
