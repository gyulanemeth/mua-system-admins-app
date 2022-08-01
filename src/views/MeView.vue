<script setup>
import { watchEffect, ref } from 'vue'

import MeDetails from '../components/MeDetails.vue'

import stores from '../stores/index.js'

const store = stores().currentUserStore()

const data = ref()

async function loadData () {
  if (!store.user.name) {
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
