<script setup>
import stores from '../stores/index.js'
const store = stores().currentUserStore()
</script>

<template>
  <v-app-bar class="elevation-0">
    <v-app-bar-nav-icon size="60" color="info" icon="mdi-weather-hurricane" />
    <v-app-bar-title class=" text-h4" >MUA admin's UI</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-avatar  size="large" color="grey-darken-3">
      Pic
    </v-avatar>
    <v-btn icon @click="store.logout()">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
