<script setup >
import { ref } from 'vue'

import stores from '../stores/index.js'

const userStore = stores().currentUserStore()

const email = ref('')
const password = ref('')

async function submit () {
  await userStore.login(email.value, password.value)
}

</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>Sign In</h1>
          </v-col>
            <v-col>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-col>
            <v-row>
            <v-col>
                <v-list-item class="d-flex flex-row mb-1 ml-4" title=" Forget password? Reset Password" to="/forgot-password"></v-list-item>
              <v-btn color="primary" @click="submit" >Sign In</v-btn>
              <button hidden @click.enter.prevent="submit" />
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
