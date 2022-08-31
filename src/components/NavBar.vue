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
    <v-app-bar-nav-icon size="60" color="info" :icon="appIcon" />
    <v-app-bar-title > <h4 class=" text-h4">
    <span class="mx-1 pt-0 "> {{appName}} </span>
    <span class="mx-7 pt-0 "> {{ route.name === "me"? "My Profile": route.name === "admins"? "Manage Admins": route.name === "accounts" ? "Manage Accounts" : null }}
    </span>
    </h4>
    </v-app-bar-title>

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
