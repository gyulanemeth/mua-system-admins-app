<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import { useCurrentUserStore } from './stores/index.js'

const store = useCurrentUserStore()
const route = useRoute()

onMounted(() => {
  document.title = window.config.appTitle
})

</script>
<template>
  <v-app>
    <NavBar v-if="store.loggedIn && route.meta.requiresAuth"/>
    <SideBar v-if="store.loggedIn && route.meta.requiresAuth"/>
    <v-main >
      <ErrorMessage/>
      <Suspense>
      <router-view/>
    </Suspense>
    </v-main>
  </v-app>
</template>
