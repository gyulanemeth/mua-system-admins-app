<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import MeDetails from '../components/MeDetails.vue'

import stores from '../stores/index.js'
import alerts from '../alerts/alert.js'

const store = stores().currentUserStore()
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

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <MeDetails v-if='data' :data="data" />
</template>
