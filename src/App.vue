<script setup>
import { useRoute } from 'vue-router'

import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import { useCurrentUserStore } from './stores/index.js'

const store = useCurrentUserStore()
const route = useRoute()

</script>
<template>
  <v-app>
    <NavBar v-if="store.loggedIn && route.name !== 'forgot-password-reset'"/>
    <SideBar v-if="store.loggedIn && route.name !== 'forgot-password-reset'"/>
    <v-main >
      <ErrorMessage/>
      <router-view/>
    </v-main>
  </v-app>
</template>
