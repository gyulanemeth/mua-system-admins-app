<script setup >
import { ref } from 'vue'

import { useCurrentUserStore } from '../stores/index.js'

const userStore = useCurrentUserStore()

const email = ref('')
const password = ref('')

async function submit () {
  await userStore.login(email.value, password.value)
}

</script>

<template>
  <v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
      <v-card-text align="center" >
          <v-icon size="77" color="info" icon="mdi-weather-hurricane" />
      </v-card-text>
      <v-card-title class="justify-center py-0">
        <h3>  Administration Panel </h3>
      </v-card-title>
    </v-card>
  <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
    <v-card-text align="center">
      <h4 class="m-4 " >Sign in to your account</h4>
              <v-text-field  hide-details
                density="compact"
              class=" elevation-2 my-5 pt-2 pl-3 rounded"
                color="info"
                variant="plain"
                placeholder="your@email.com"
                name="email"
                label="Email"
                v-model="email"
                id="email"
                type="email"
                required />
              <v-text-field  hide-details
                density="compact"
                class="elevation-2 my-5 pt-2 pl-3 rounded"
                color="info"
                placeholder="********"
                variant="plain"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                active
                required />
                <v-btn color="info" @click="submit" >Sign In</v-btn>
                <p class="mt-4 pa-4">Forget your password? <router-link style="text-decoration: none; color: inherit;" class="font-weight-bold" to="/forgot-password">Reset it here.</router-link></p>
              <button hidden @click.enter.prevent="submit" />
            </v-card-text>

            </v-card>
        </v-form>
</template>
