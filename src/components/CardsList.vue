<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import Dialog from '../components/CreateDialog.vue'
import DeleteMyAccount from './DeleteMyAccount.vue'

const emit = defineEmits(['deleteEventHandler', 'inviteEventHandler', 'createEventHandler'])
const props = defineProps({
  items: Array,
  btn: Object
})

const route = useRoute()
const numOfPages = computed(() => Math.ceil(props.items.length / rows.value))

const filter = ref('')
const rows = ref(5)
const page = ref(1)

function redirectDeleteEventHandler (data) {
  emit('deleteEventHandler', data)
}
function redirectInviteEventHandler (data, cb) {
  emit('inviteEventHandler', data, cb)
}
function redirectCreateEventHandler (data) {
  emit('createEventHandler', data)
}

</script>
<template>

<v-container class="elevation-2 mx-6 pt-0 rounded">
    <v-layout class="d-flex flex-wrap">
        <v-col cols="2" class="pt-3">
            <p class="text-h6">{{route.name === 'admins'? 'Administrators' : 'Accounts'}} </p>
        </v-col>
        <v-spacer />
        <v-col cols="5">
            <v-text-field density="compact" label="Search" variant="underlined" append-inner-icon="mdi-magnify" v-model.lazy="filter" color="primary" @change="$emit('searchEvent',filter)"></v-text-field>
        </v-col>

        <v-col cols="2" class="pt-3">
            <Dialog :header="props.btn.header" :btnTitle="route.name === 'admins'? 'Invite Admin' : 'Create Account'"  @createEventHandler='redirectCreateEventHandler' @inviteEventHandler='redirectInviteEventHandler'  :inputs="props.btn.input" />
        </v-col>
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
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="item in props.items.slice((Math.ceil(page) - 1) * rows, Math.ceil(page) * rows)" :key="item._id">
                    <td>{{ item.data.name }}</td>
                    <td v-if="route.name === 'admins'">{{ item.data.email }}</td>
                    <td v-else>{{ item.data.urlFriendlyName }}</td>
                    <td>{{ new Date(item.data.createdAt).toLocaleDateString() }}</td>
                    <td>{{ new Date(item.data.updatedAt).toLocaleDateString() }}</td>
                    <td v-if="route.name === 'admins'" class="text-right">
                        <DeleteMyAccount @deleteEventHandler='redirectDeleteEventHandler' :data="item.data" />
                    </td>
                    <td v-else class="text-right">
                        <v-btn color="grey" variant="text" class="ma-2" icon="mdi-arrow-right" size="small" @click="$emit('detailsEventHandler',{id: item._id})" />
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-layout>
    <v-divider />
    <v-layout class="d-flex flex-wrap justify-center align-center">
        <v-spacer />
        <p class="ma-2">Rows per page</p>
        <p class="ma-2"><v-select hide-details density="compact" variant="underlined"  v-model="rows" :items="[5,10,15]" /></p>
        <p class="ma-2">{{page}} of {{numOfPages}} </p>
        <v-col cols="3">
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-chevron-left" :disabled="page === 1 "  size="small" @click="page = page - 1"  />
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-chevron-right" :disabled="page  === numOfPages " size="small"  @click="page = page + 1" />
            <v-btn color="grey" variant="text"  class="ma-2" icon="mdi-page-first" size="small" @click="page =  1" />
            <v-btn color="grey" variant="text"  class="ma-2" icon="mdi-page-last" size="small" @click="page = numOfPages"/>
        </v-col>
    </v-layout>
</v-container>

</template>
