<script setup >
import { ref } from 'vue'
import stores from '../stores/index.js'
import { useRouter } from 'vue-router';
const router = useRouter()

const userStore = stores().currentUserStore()

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordAgain = ref('')
async function submit(){
 const res = await userStore.patchPassword(oldPassword.value, newPassword.value, newPasswordAgain.value)
 if(res === 'success'){
   router.push('/')
 }
}

</script>


<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>Update Password</h1>
          </v-col>
          <v-col>
            <v-text-field
              name="oldPassword"
              label="Old Password"
              id="oldPassword"
              type="password"
              v-model="oldPassword"
              required></v-text-field>

              <v-text-field
                name="newPassword"
                label="New Password"
                id="newPassword"
                type="password"
                v-model="newPassword"
                required></v-text-field>

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
