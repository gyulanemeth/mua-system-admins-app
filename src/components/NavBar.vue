<script setup>

const menuItems = [
       { title: 'Sign In', path: '/login' },
       { title: 'Admin List', path: '/list' },
       { title: 'Invite Admin', path: '/invitation'},
       { title: 'Set Password', path: '/invitation/accept' },
       { title: 'Forget Password', path: '/forgot-password' },
       { title: 'Update Password', path: '/updatePassword' },
        { title: 'Update Name', path: '/UpdateName' },
        { title: 'Reset Password', path: '/forgot-password/reset' }
  ]


</script>

<template>
  <v-app-bar>
    <v-app-bar-title >MUA admin's UI</v-app-bar-title>
    <v-btn
         flat
         v-for="item in menuItems"
         :key="item.title"
         :to="item.path">
         {{ item.title }}
       </v-btn>
  </v-app-bar>
</template>
