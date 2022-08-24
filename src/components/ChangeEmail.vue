<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  email: String
})

const route = useRoute()

const data = ref({ email: props.email })
const cb = ref()

const resetForm = () => {
  data.value = { email: props.email, newEmail: null, confirmNewEmail: null }
}

</script>

<template>

  <v-layout class="d-flex flex-wrap">
    <v-col class="pt-3">
    <h3 class="font-weight-bold">Change E-mail Address</h3>
    <v-divider />

    <v-row align="center" class="mt-3">
        <v-col>
            <p class="font-weight-bold">Current E-mail Address</p>
        </v-col>

        <v-text-field
        hide-details
        density="compact"
        class=" my-5 pt-2 pl-3 rounded"
        variant="plain"
        name="currentEmail"
        v-model="data.email"
         disabled
         >
       </v-text-field>
    </v-row>

      <v-row align="center" class="mt-3">
          <v-col>
              <p class="font-weight-bold">New E-mail Address</p>
          </v-col>
          <v-text-field
          hide-details
          density="compact"
          v-model="data['newEmail']"
          class=" elevation-2 my-5 pt-2 pl-3 rounded"
          color="info"
          variant="plain"
         name="newEmail"
         placeholder="email@email.com"
           >
         </v-text-field>
      </v-row>
      <v-row align="center" class="mt-3">
          <v-col>
              <p class="font-weight-bold">Confirm New E-mail Address</p>
          </v-col>
          <v-text-field
          hide-details
          v-model="data['confirmNewEmail']"
          density="compact"
          class=" elevation-2 my-5 pt-2 pl-3 rounded"
          color="info"
          variant="plain"
         name="confirmNewEmail"
         placeholder="email@email.com"
           >
         </v-text-field>

      </v-row>
      <v-btn color="info mt-3" @click="$emit('updateEmailHandler',data, (res) => {cb = res; resetForm()})"> Change my E-mail</v-btn>
      <div v-if="cb">
        <h2 class="mt-4">Request sent.</h2>
        <p class="mt-4">Please check your inbox and click the link we sent you to verify your e-mail address.</p>
    </div>
    <div v-else-if="route.query.tab === 'changeEmail'">
      <p class="mt-4">You have successfully verified your new e-mail address.</p>
  </div>
    </v-col >
</v-layout>
</template>
