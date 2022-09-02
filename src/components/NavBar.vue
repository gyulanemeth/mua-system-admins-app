<script setup>
import { useRoute } from 'vue-router'

import { useCurrentUserStore } from '../stores/index.js'

const route = useRoute()
const store = useCurrentUserStore()
const appName = window.config.appName
const appIcon = window.config.appIcon
</script>

<template>

<v-app-bar height="100" class="elevation-0 pl-0 ml-0">
    <v-avatar size="60" >
      <v-img :src="appIcon" cover></v-img>
    </v-avatar>

   <v-col cols="2">
    <span class="text-h4 mx-1 pt-0 "> {{appName}} </span>
  </v-col>
    <span class="text-h4 ma-0 pt-0 "> {{ route.name === "me"? "My Profile": route.name === "admins"? "Manage Admins": route.name === "accounts" ? "Manage Accounts" : null }}
    </span>

    <v-spacer></v-spacer>

    <v-menu location="bottom " origin="end top">
        <template v-slot:activator="{ props }">
            <v-avatar size="large" color="grey-darken-3">
                <v-btn v-bind="props">
                    Pic
                </v-btn>
            </v-avatar>
        </template>
        <v-list>
            <v-list-item @click="store.logout()">
                <v-list-item-icon>
                    mdi-logout
                </v-list-item-icon>
                <v-list-item-title> Logout </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

</v-app-bar>

</template>
