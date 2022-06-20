<script setup>

const menuItems = [
       { title: 'Sign In', path: '/login' },
       { title: 'Invite Admin', path: '/invitation'},
       { title: 'Set Password', path: '/invitation/accept' },
       { title: 'Forget Password', path: '/forgot-password' },
       { title: 'Update Password', path: '/updatePassword' },
        { title: 'Update Name', path: '/UpdateName' },
        { title: 'Reset Password', path: '/forgot-password/reset' }
  ]
const model = false

</script>

<template>
  <v-app-bar>
    <v-app-bar-title >MUA admin's UI</v-app-bar-title>
    <v-avatar
     color="secondary"
   >
     Pic
   </v-avatar>
      <v-menu

       location="bottom " origin="end top" >
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
              />
            </template>
            <v-list>
              <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path"
              :value="item.title"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>



  </v-app-bar>
</template>














<!--
<v-list color="transparent">
  <v-list-item prepend-icon="mdi-account-group" title="Admins List" ></v-list-item>
  <v-list-item prepend-icon="mdi-file-document" title="Accounts List"></v-list-item>
</v-list>
-->
