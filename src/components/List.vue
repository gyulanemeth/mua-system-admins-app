<script setup>
import {ref} from 'vue'
const props = defineProps({
  items: Array,
  btn: Object
})
const filter = ref("")
</script>

<template>

<v-container>
  <v-layout class="d-flex flex-wrap">

  <v-text-field class="my-2 ml-4"
  variant="outlined"
  label="Prepend inner"
   prepend-icon="mdi-magnify"
  v-model.lazy="filter"
    color="primary"
  @change="$emit('searchEvent',filter)"

  ></v-text-field>
  <v-btn class="py-7 my-2 ml-4"
  variant="outlined"
  color="primary"
  to="/invitation"
  >
  Invite Admin
</v-btn>
</v-layout>
    <v-layout class="d-flex flex-wrap">
      <v-card class="mx-2 my-5 pa-2 " min-width="275"  v-for="item in props.items" :key="item._id" >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150px"
          cover
        ></v-img>
        <v-card-title>
        {{item.data.name}}
        <v-card-subtitle>
          - {{item.status}}
        </v-card-subtitle >
      </v-card-title>
        <v-card-actions>
          <v-btn
            :color="props.btn.color"
            variant="text"
            @click="$emit('buttonEvent',item._id)"
          >
            {{props.btn.text}}
          </v-btn>
        </v-card-actions>
      </v-card>
</v-layout>
</v-container>
</template>
