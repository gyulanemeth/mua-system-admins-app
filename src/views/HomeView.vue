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

async function eventHandler (data) {
  if (data.operation === 'Details') { // to accounts app
    const getToken = localStorage.getItem('accessToken')
    window.location.href = `${window.config.accountsAppBaseUrl}?token=${getToken}&accountId=${data.id}`
  }
  if (data.operation === 'Delete') {
    const confirm = await alert.confirmAlert('do you want to Delete the record?')
    if (confirm.isConfirmed) {
      store.deleteOne(data.id)
    }
  }
  if (data.operation === 'Invite') {
    store = stores().currentUserStore()
    await store.sendInvitation(data.data.email)
  }
  if (data.operation === 'Create') {
    await store.createOne(data.data)
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
