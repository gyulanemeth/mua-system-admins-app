<script setup>
import { useCurrentUserStore } from '../stores/index.js'

const store = useCurrentUserStore()
const appName = window.config.appName
const appIcon = window.config.appIcon

</script>


<template>

<v-app-bar class="elevation-0">
    <v-app-bar-nav-icon size="60" color="info" :icon="appIcon" />
    <v-app-bar-title class=" text-h4">{{appName}}</v-app-bar-title>
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
