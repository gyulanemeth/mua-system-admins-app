<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useCurrentUserStore } from '../stores/index.js'

const route = useRoute()
const store = useCurrentUserStore()
const appName = window.config.appName
const appIcon = window.config.appIcon

onMounted(async () => {
  if (!store.user.name) {
    await store.readOne()
  }
})

</script>

<template>

<v-app-bar height="100" class="elevation-0 pl-0 pr-5 ml-0">
    <v-avatar size="60" >
      <v-img :src="appIcon" cover></v-img>
    </v-avatar>

   <v-col cols="2">
    <span class="text-h4 mx-1 pt-0 "> {{appName}} </span>
  </v-col>
    <span class="text-h4 ma-0 pt-0 "> {{ route.meta.header ? $t(`navBar.title.${route.meta.header}`) : '' }}
    </span>

    <v-spacer></v-spacer>

    <v-menu location="bottom " origin="end top">
        <template v-slot:activator="{ props }">
          <v-badge  color="error" bordered location="bottom end"
          icon="mdi-shield-account-variant-outline">
            <v-avatar size="large" color="grey-darken-3">
                <v-img style="cursor: pointer;" v-if="store.user && store.user.profilePicture" :src="store.user.profilePicture+ '?' +Date.now()" v-bind="props" class="align-self-stretch" cover />
                <v-btn v-else data-test-id="navbarMenu" v-bind="props">
                    {{$t('navBar.picLabel')}}
                </v-btn>
            </v-avatar>
            </v-badge>
        </template>
        <v-list>
            <v-list-item data-test-id="navbarMenu-logout" @click="store.logout()">
                <template v-slot:prepend>
                  <v-icon icon=" mdi-logout"></v-icon>
                </template>
                <v-list-item-title> {{$t('navBar.logoutBtn')}} </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

</v-app-bar>

</template>
