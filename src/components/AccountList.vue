<script setup>
import useSystemMessages from '../stores/systemMessages.js'
import stores from '../stores/index.js'
const accountStore = stores().accountStore()
const systemMessages = useSystemMessages()
accountStore.load()
</script>

<template>

<v-container>

    <v-layout class="d-flex flex-wrap">
      <v-card class="mx-2 my-5 pa-2 " min-width="275"  v-for="account in accountStore.items" :key="account._id" >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150px"
          cover
        ></v-img>
        <v-card-title>
        {{account.data.name}}
        <v-card-subtitle>
          - {{account.status}}
        </v-card-subtitle >
      </v-card-title>
        <v-card-actions>
          <v-btn
            color="primary"
            variant="text"
          >
            Details
          </v-btn>
        </v-card-actions>
      </v-card>
</v-layout>
</v-container>
</template>



<!---

<v-container>
  Admins list test. nr items: {{admins.items.length}} System messages: {{JSON.stringify(systemMessages.items)}}
  <v-row class="text-center">
    <v-col>
      <div v-for="admin in admins.items" :key="admin._id">
        <div>{{admin.data.name}} - {{admin.status}}</div>
        <button @click="admins.deleteOne(admin._id)">remove</button>
      </div>
    </v-col>
  </v-row>
</v-container> -->
