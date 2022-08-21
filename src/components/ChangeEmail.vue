<script setup >
import { ref } from 'vue'

const props = defineProps({
  email: String
})

const data = ref({ email: props.email })
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
      <v-btn color="info mt-3" @click="$emit('submit',{data, operation: 'UpdateEmail'})"> Change my E-mail</v-btn>
    </v-col >
</v-layout>
</template>
