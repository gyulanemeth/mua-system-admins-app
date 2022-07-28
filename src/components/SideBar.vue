<script setup>

</script>

<template>
        <v-navigation-drawer
        permanent
      >
        <v-list >
          <v-list-item prepend-icon="mdi-file-document" title="Me" to="/me"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Admins List" to="/admins" ></v-list-item>
          <v-list-item prepend-icon="mdi-file-document" title="Accounts List" to="/accounts"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>
