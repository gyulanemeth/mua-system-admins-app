<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import CardList from '../components/TableList.vue'
import alerts from '../alerts/alert.js'
import { useCurrentUserStore, useAdminsStore, useAccountStore } from '../stores/index.js'

import { useI18n } from 'vue-i18n'
const { tm } = useI18n()

const route = useRoute()
const alert = alerts()

const data = ref()
const btn = ref()

let store

async function loadData () {
  if (route.name === 'admins') {
    store = useAdminsStore()
    await store.loadPage(1)
    data.value = store.items
    btn.value = {
      header: tm('createDialog.inviteHeader'),
      input: [{
        label: tm('createDialog.emailLabel'),
        name: 'email',
        placeholder: tm('createDialog.emailPlaceHolder'),
        type: 'email'
      }, {
        label: tm('createDialog.confirmEmailLabel'),
        name: 'confirmEmail',
        placeholder: tm('createDialog.confirmEmailPlaceHolder'),
        type: 'email'
      }]
    }
  } else if (route.name === 'accounts') {
    store = useAccountStore()
    await store.loadPage(1)
    data.value = store.items
    btn.value = {
      header: tm('createDialog.detailsHeader'),
      input: [{
        label: tm('createDialog.nameLabel'),
        name: 'name',
        placeholder: tm('createDialog.namePlaceHolder'),
        type: 'text'
      }, {
        label: tm('createDialog.urlFriendlyNameLabel'),
        name: 'urlFriendlyName',
        placeholder: tm('createDialog.urlFriendlyNamePlaceHolder'),
        type: 'text'
      }, {
        label: tm('createDialog.logoLabel'),
        name: 'pic',
        placeholder: tm('createDialog.logoPlaceHolder'),
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
    loadData()
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

async function loadPage (page, rows) {
  store.itemsPerPage = rows
  await store.loadPage(page)
  data.value = store.items
}

async function searchBarHandler (filter) {
  if (filter === '') {
    store.filter = {}
  } else {
    store.filter = {
      $regex: filter,
      $options: 'i'
    }
  }
  await store.loadPage(1)
  data.value = store.items
}

watch(route, () => {
  loadData()
})

loadData()

</script>

<template>
  <CardList v-if="data" :items="data" :btn="btn" :numOfPages="store.numOfPages" @loadPage="loadPage" @detailsEventHandler="handleDetailsEvent" @deleteEventHandler="handleDeleteEvent" @inviteEventHandler="handleInviteEvent" @createEventHandler="handleCreateEvent" @searchEvent="searchBarHandler" />

</template>
