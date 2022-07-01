
<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'

</script>
<template>
  <v-app>
    <NavBar/>
    <SideBar/>
    <v-main >
      <ErrorMessage/>
      <router-view/>
    </v-main>
  </v-app>
</template>
