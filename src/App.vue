
<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import Message from './components/Message.vue'


</script>
<template>
  <v-app>
    <NavBar/>
    <SideBar/>
    <v-main >
      <Message/>
      <router-view/>
    </v-main>
  </v-app>
</template>
