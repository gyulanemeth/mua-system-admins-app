<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

import CardList from '../components/CardsList.vue'
import alerts from '../alerts/alert.js'
import { useCurrentUserStore, useAdminsStore, useAccountStore } from '../stores/index.js'

const route = useRoute()
const alert = alerts()

const data = ref()
const btn = ref()

let store

async function loadData () {
  if (route.name === 'admins') {
    store = useAdminsStore()
    await store.load()
    data.value = store.items
    btn.value = {
      text: 'Delete',
      color: 'error',
      header: 'Invite Administrators',
      input: [{
        label: 'Email address',
        name: 'email',
        placeholder: 'your@email.com',
        type: 'email'
      }, {
        label: 'Confirm e-mail address',
        name: 'confirmEmail',
        placeholder: 'your@email.com',
        type: 'email'
      }]
    }
  } else if (route.name === 'accounts') {
    store = useAccountStore()
    await store.load()
    data.value = store.items
    btn.value = {
      text: 'Details',
      color: 'primary',
      header: 'Create a new account!',
      input: [{
        label: 'Account Name',
        name: 'name',
        placeholder: 'Your Account’s Name',
        type: 'text'
      }, {
        label: 'URL Friendly Name',
        name: 'urlFriendlyName',
        placeholder: '/youraccountname',
        type: 'text'
      }, {
        label: 'Logo',
        name: 'pic',
        placeholder: 'Upload',
        type: 'file'
      }]
    }
  }
}

async function handleDetailsEvent (params) {
  const getToken = localStorage.getItem('accessToken')
  window.location.href = `${window.config.accountsAppBaseUrl}?token=${getToken}&accountId=${params.id}`
}

async function handleDeleteEvent (params) {
  const res = await store.deleteOne(params)
  if (!res.message) {
    alert.message('Deleted successfully')
  }
}

async function handleInviteEvent (params, statusCallBack) {
  store = useCurrentUserStore()
  const res = await store.sendInvitation(params.email)
  statusCallBack(!res.message)
  loadData()
}

async function handleCreateEvent (params, statusCallBack) {
  const res = await store.createOne(params)
  if (!res.message) {
    statusCallBack()
    await alert.message('Account Created successfully')
    loadData()
  }
}

async function searchBarHandler (filter) {
  if (filter === '') {
    store.filter = {}
  } else {
    store.filter = {
      $text: {
        $search: `"${filter}"`
      }
    }
  }
  await store.load()
  data.value = store.items
}

watchEffect(async () => {
  loadData()
})

</script>

<template>

  <CardList v-if="data" :items="data" :btn="btn" @detailsEventHandler="handleDetailsEvent" @deleteEventHandler="handleDeleteEvent" @inviteEventHandler="handleInviteEvent" @createEventHandler="handleCreateEvent" @searchEvent="searchBarHandler" />

</template>
