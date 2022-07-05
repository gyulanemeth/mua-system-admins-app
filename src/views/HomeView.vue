<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import CardList from '../components/CardsList.vue'
import stores from '../stores/index.js'

const route = useRoute()

const data = ref()
const btn = ref()

let store

async function loadData () {
  if (route.name === 'admins') {
    store = stores().adminsStore()
    await store.load()
    data.value = store.items
    btn.value = { text: 'Delete', color: 'red-lighten-2' }
  } else if (route.name === 'accounts') {
    store = stores().accountStore()
    await store.load()
    data.value = store.items
    btn.value = { text: 'Details', color: 'primary' }
  }
}

async function eventHandler (id) {
  if (btn.value.text === 'Delete') {
    store.deleteOne(id)
  } else if (btn.value.text === 'Details') {
    console.log(id)
  }
}

async function searchBarHandler (filter) {
  if (filter === '') {
    store.filter = {}
  } else {
    store.filter = { $text: { $search: `"${filter}"` } }
  }
  await store.load()
  data.value = store.items
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <CardList :items="data" :btn="btn" @buttonEvent="eventHandler" @searchEvent="searchBarHandler" />
</template>
