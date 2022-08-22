<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import EmailAndNameForm from '../components/EmailAndNameForm.vue'
import stores from '../stores/index.js'

const route = useRoute()
const store = stores().currentUserStore()

const formData = ref()

async function loadData () {
  if (route.name === 'forgot-password') {
    formData.value = { inputType: 'Email', inputText: 'Email', text: 'Password recovery' }
  }
}

async function eventHandler (data, statusCallBack) {
  if (formData.value.text === 'Password recovery') {
    const res = await store.sendForgotPassword(data)
    statusCallBack(!res.message)
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <EmailAndNameForm :formData="formData" @buttonEvent="eventHandler" />
</template>
