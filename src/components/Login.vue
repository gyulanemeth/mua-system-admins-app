<script setup >
import { ref } from 'vue'
import stores from '../stores/index.js'
import { useRouter } from 'vue-router';

const userStore = stores().currentUserStore()

const router = useRouter()
const email = ref('')
const password = ref('')
async function submit(){

 const res = await userStore.login(email.value, password.value)
 if(res.email === email.value){
   router.push("/")
 }
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
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
