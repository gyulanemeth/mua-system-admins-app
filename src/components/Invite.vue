<script setup >
import { ref } from 'vue'
import stores from '../stores/index.js'

const userStore = stores().currentUserStore()

const email = ref('')

async function submit(){
console.log(userStore.user);
 const res = await userStore.sendInvitation(email.value)
console.log(res);
}

</script>






<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="8">
        <form>
          <v-col>
            <h1>Invite Admin</h1>
          </v-col>
            <v-col>
              <v-row class="text-center">
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
              <v-btn  class="mx-10 my-1 py-6" color="primary" @click="submit">Send invitation</v-btn>
            </v-row >
            </v-col>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
