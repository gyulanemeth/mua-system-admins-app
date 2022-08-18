<script setup>

</script>

<template>
  <v-card class="elevation-4">

      <v-navigation-drawer color="#EFEFEF" rail permanent >

        <v-list density="compact" nav >
          <v-list-item prepend-icon="mdi-shield-account-variant-outline" value="dashboard" />

          <v-list-item prepend-icon="mdi-account-group-outline" value="dashboard" />

          <v-list-item prepend-icon="mdi-forum" value="messages" />
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer class="elevation-4" permanent>
        <v-list>
          <v-list-item title="Me" to="/me" />
          <v-list-item title="Admins List" to="/admins" />
          <v-list-item title="Accounts List" to="/accounts" />
        </v-list>
      </v-navigation-drawer>

  </v-card>
</template>

<style scoped>
.shadow {
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.2);
}
</style>
