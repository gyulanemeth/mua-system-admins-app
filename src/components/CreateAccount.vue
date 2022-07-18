<script setup>
import { ref } from 'vue'

const data = ref({})

</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="8">
        <form>
            <v-col>
              <v-container>
                <h1>Create Account</h1>
              </v-container>
              <h4 >
                <v-divider />Account Data:<v-divider class=" mb-6"/>
              </h4 >
                <v-container>
                <v-row lass=" my-3">
                  <v-text-field
                    name="Account Name"
                    label="Account Name"
                    type="text"
                    v-model="data.name"
                    required/>
                    <v-text-field class="ml-4"
                      name="urlFriendlyName"
                      label="url Friendly Name"
                      type="text"
                      v-model="data.urlFriendlyName"
                      required/>
                    </v-row>
                </v-container>
            <v-btn class="mx-10 my-1 py-6" color="primary" @click="$emit('buttonEvent',data)">Create Account</v-btn>
            </v-col>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
