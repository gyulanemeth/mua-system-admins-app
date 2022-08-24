<template>
  <v-card class="elevation-4">

      <v-navigation-drawer color="grey-lighten-2" rail permanent >
        <v-list bg-color="grey-lighten-2" density="compact" nav>
          <v-list-item active-class="text-white" active prepend-icon="mdi-shield-account-variant-outline" value="dashboard2" />

          <v-list-item  active-class="text-white" prepend-icon="mdi-account-group-outline" />

          <v-list-item  active-class="text-white" prepend-icon="mdi-email-variant"  />
        </v-list>

      </v-navigation-drawer>

      <v-navigation-drawer class="elevation-2" permanent>
        <v-list>
          <v-list-item title="My Profile" to="/me" />
          <v-list-item title="Manage Admins" to="/admins" />
          <v-list-item title="Manage Accounts" to="/accounts" />
        </v-list>
      </v-navigation-drawer>

  </v-card>
</template>
