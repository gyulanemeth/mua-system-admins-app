<template>
  <v-card class="elevation-4">

      <v-navigation-drawer color="#EFEFEF" rail permanent >

        <v-list bg-color="#EFEFEF"  density="compact" nav>
          <v-list-item active-class="text-white" prepend-icon="mdi-shield-account-variant-outline" value="dashboard2" />

          <v-list-item  active-class="text-white" prepend-icon="mdi-account-group-outline" value="dashboard" />

          <v-list-item  active-class="text-white" prepend-icon="mdi-forum" value="messages" />
        </v-list>

      </v-navigation-drawer>

      <v-navigation-drawer class="elevation-2" permanent>
        <v-list>
          <v-list-item title="Me" to="/me" />
          <v-list-item title="Admins List" to="/admins" />
          <v-list-item title="Accounts List" to="/accounts" />
        </v-list>
      </v-navigation-drawer>

  </v-card>
</template>
