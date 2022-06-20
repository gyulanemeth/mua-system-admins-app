<script setup>
import useAdmins from '../stores/admins.js'
import useSystemMessages from '../stores/systemMessages.js'

const admins = useAdmins()
const systemMessages = useSystemMessages()
admins.load()
</script>

<template>
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
  </v-container>
</template>
