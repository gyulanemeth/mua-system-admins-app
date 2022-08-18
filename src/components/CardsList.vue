<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Dialog from '../components/CreateDialog.vue'

const props = defineProps({
  items: Array,
  btn: Object
})
const emit = defineEmits(['buttonEvent'])

const route = useRoute()

const filter = ref('')

function submitForm (data) {
  emit('buttonEvent', data)
}

</script>

<template>

<v-container class="elevation-4 rounded">
  <v-layout class="d-flex flex-wrap">
    <v-col cols="2" class="pt-3">
      <p class="text-h6">{{route.name === 'admins'? 'Administrators' : 'Accounts'}} </p>
    </v-col >
    <v-spacer />
<v-col cols="5">
    <v-text-field
    density="compact"
    label="Search"
    variant="underlined"
    append-inner-icon="mdi-magnify"
    v-model.lazy="filter"
    color="primary"
    @change="$emit('searchEvent',filter)"

    ></v-text-field>
  </v-col >

<v-col cols="2" class="pt-3">
  <Dialog :header="props.btn.header" :btnTitle="route.name === 'admins'? 'Invite Admin' : 'Create Account'" @submit="submitForm" :inputs="props.btn.input" />
</v-col >
</v-layout>

    <v-layout class="d-flex flex-wrap">
      <v-table fixed-header class="w-100">
  <thead>
    <tr>
      <th class="text-left">
        Name
      </th>
      <th v-if="route.name === 'admins'" class="text-left">
        E-mail address
      </th>
      <th v-else class="text-left">
        URL Friendly name
      </th>
      <th class="text-left">
        Last Edited
      </th>
      <th class="text-left">
        Creation Date
      </th>
      <th >
      </th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="item in props.items"
      :key="item._id"
    >
      <td>{{ item.data.name }}</td>
      <td v-if="route.name === 'admins'">{{ item.data.email }}</td>
      <td v-else>{{ item.data.urlFriendlyName }}</td>
      <td>{{ new Date(item.data.createdAt).toLocaleDateString() }}</td>
      <td>{{ new Date(item.data.updatedAt).toLocaleDateString() }}</td>
      <td v-if="route.name === 'admins'" class="text-right"> <v-btn color="grey" variant="text" class="ma-2"  icon="mdi-delete" size="small" @click="$emit('buttonEvent',{id: item._id, operation:'Delete'})" /></td>
      <td v-else class="text-right"> <v-btn color="grey" variant="text" class="ma-2"  icon="mdi-arrow-right" size="small" @click="$emit('buttonEvent',{id: item._id, operation: 'Details'})" /></td>

    </tr>
  </tbody>
</v-table>
</v-layout>
</v-container>
</template>
