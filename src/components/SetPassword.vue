<script setup >
import { ref } from 'vue'
import stores from '../stores/index.js'

const userStore = stores().currentUserStore()

const newPassword = ref('')
const newPasswordAgain = ref('')
const acceptInvitationToken = ref('')
async function submit(){

 const res = await userStore.acceptInvitation(acceptInvitationToken.value, newPassword.value, newPasswordAgain.value)
console.log(res);
}

</script>


<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>Set New Password</h1>
          </v-col>
          <v-col>
            <v-text-field
              name="acceptInvitationToken"
              label="accept Invitation Token"
              id="acceptInvitationToken"
              v-model="acceptInvitationToken"
              required></v-text-field>
          </v-col>
            <v-col>
              <v-text-field
                name="newPassword"
                label="New Password"
                id="newPassword"
                type="password"
                v-model="newPassword"
                required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                name="newPasswordAgain"
                label="New Password Again"
                id="newPasswordAgain"
                type="password"
                v-model="newPasswordAgain"
                required></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="submit">Set Password</v-btn>
            </v-col>

        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
