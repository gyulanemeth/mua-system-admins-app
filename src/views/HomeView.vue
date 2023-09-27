<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import CardList from '../components/TableList.vue'
import useSystemMessagesStore from '../stores/systemMessages.js'
import { useCurrentUserStore, useAdminsStore, useAccountStore } from '../stores/index.js'

import { useI18n } from 'vue-i18n'
const { tm } = useI18n()

const route = useRoute()

const data = ref()
const numOfPages = ref()

const btn = ref()

let store

async function loadData () {
  if (route.name === 'admins') {
    store = useAdminsStore()
    store.filter = {}

    await store.loadPage(1)
    numOfPages.value = store.numOfPages
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
    store.filter = {}
    await store.loadPage(1)
    numOfPages.value = store.numOfPages
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
  window.location.href = `${window.config.accountsAppBaseUrl}${params.urlFriendlyName}?token=${getToken}&accountId=${params.id}`
}

async function handleDeleteEvent (params, statusCallBack) {
  const res = await store.deleteOne(params)
  statusCallBack(!res.message)
  if (!res.message) {
    loadData()
    useSystemMessagesStore().addSuccess({ message: tm('createDialog.successfullyDeletedAlert') })
  }
}

async function handleInviteEvent (params, statusCallBack) {
  store = useCurrentUserStore()
  const res = await store.sendInvitation(params.email)
  statusCallBack(!res.message)
  loadData()
}

async function handleReInviteEvent (params) {
  store = useCurrentUserStore()
  const res = await store.reSendInvitation(params.email)
  if (!res.message) {
    useSystemMessagesStore().addSuccess({ message: tm('createDialog.invitationAlert') })
  }
}

async function handleCreateEvent (params, statusCallBack) {
  const res = await store.createOne(params)
  statusCallBack(!res.message)
  if (!res.message) {
    useSystemMessagesStore().addSuccess({ message: tm('createDialog.createAlert') })
    loadData()
  }
}

async function loadPage (page, rows) {
  store.itemsPerPage = rows
  await store.loadPage(page)
  numOfPages.value = store.numOfPages
  data.value = store.items
}

async function searchBarHandler (filter, statusCallBack) {
  const filterParam = route.name === 'admins' ? 'email' : 'urlFriendlyName'
  if (filter === '') {
    store.filter = {}
  } else {
    store.filter = {
      $or: [{
        name: {
          $regex: filter,
          $options: 'i'
        }
      },
      {
        [filterParam]: {
          $regex: filter,
          $options: 'i'
        }
      }]
    }
  }
  await store.loadPage(1)
  data.value = store.items
  statusCallBack()
}

watch(route, () => {
  loadData()
})

loadData()

</script>

<template>
  <CardList v-if="data" :items="data" :btn="btn" :numOfPages="numOfPages" @loadPage="loadPage"
    @reSendInvitationEventHandler="handleReInviteEvent" @detailsEventHandler="handleDetailsEvent" @deleteEventHandler="handleDeleteEvent"
    @inviteEventHandler="handleInviteEvent" @createEventHandler="handleCreateEvent" @searchEvent="searchBarHandler" />
</template>
