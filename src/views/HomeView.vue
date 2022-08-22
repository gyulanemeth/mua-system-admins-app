<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import CardList from '../components/CardsList.vue'
import stores from '../stores/index.js'
import alerts from '../alerts/alert.js'

const route = useRoute()
const alert = alerts()

const data = ref()
const btn = ref()

let store

async function loadData () {
  if (route.name === 'admins') {
    store = stores().adminsStore()
    await store.load()
    data.value = store.items
    btn.value = {
      text: 'Delete',
      color: 'red-lighten-2',
      header: 'Invite Administrators',
      input: [
        { label: 'Email address', name: 'email', placeholder: 'your@email.com', type: 'email' },
        { label: 'Confirm e-mail address', name: 'confirmEmail', placeholder: 'your@email.com', type: 'email' }
      ]
    }
  } else if (route.name === 'accounts') {
    store = stores().accountStore()
    await store.load()
    data.value = store.items
    btn.value = {
      text: 'Details',
      color: 'primary',
      header: 'Create a new account!',
      input: [
        { label: 'Account Name', name: 'name', placeholder: 'Your Account’s Name', type: 'text' },
        { label: 'URL Friendly Name', name: 'urlFriendlyName', placeholder: '/youraccountname', type: 'text' },
        { label: 'Logo', name: 'pic', placeholder: 'Upload', type: 'file' }
      ]
    }
  }
}

async function eventHandler (params, statusCallBack) {
  let res
  if (params.operation === 'Details') {
    const getToken = localStorage.getItem('accessToken')
    window.location.href = `${window.config.accountsAppBaseUrl}?token=${getToken}&accountId=${params.id}`
  }
  if (params.operation === 'Delete') {
    res = await store.deleteOne(params.data.id)
    if (!res.message) {
      await alert.message('Deleted successfully')
    }
  }
  if (params.operation === 'Invite') {
    store = stores().currentUserStore()
    res = await store.sendInvitation(params.data.email)
    statusCallBack(!res.message)
  }
  if (params.operation === 'Create') {
    res = await store.createOne(params.data)
    if (!res.message) {
      alert.message('Account Created successfully')
    }
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
  <CardList v-if="data" :items="data" :btn="btn" @buttonEvent="eventHandler" @searchEvent="searchBarHandler" />
</template>
