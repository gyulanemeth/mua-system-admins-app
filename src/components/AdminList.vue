<script setup>
import useAdmins from '../stores/admins.js'
import useSystemMessages from '../stores/systemMessages.js'

const admins = useAdmins()
const systemMessages = useSystemMessages()
admins.load()
</script>

<template>

<v-container>
    <v-layout class="d-flex flex-wrap">
      <v-card class="mx-2 my-5 pa-2 " min-width="275"  v-for="admin in admins.items" :key="admin._id" >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150px"
          cover
        ></v-img>
        <v-card-title>
        {{admin.data.name}}
        <v-card-subtitle>
          - {{admin.status}}
        </v-card-subtitle >
      </v-card-title>
        <v-card-actions>
          <v-btn
            color="red-lighten-2"
            variant="text"
            @click="admins.deleteOne(admin._id)"
          >
            Delete
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
