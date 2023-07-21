<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounceFn  } from '@vueuse/core'
import Dialog from '../components/CreateDialog.vue'
import DeleteMyAccount from './DeleteMyAccount.vue'

const emit = defineEmits(['deleteEventHandler', 'inviteEventHandler', 'createEventHandler', 'loadPage'])
const props = defineProps({
  items: Array,
  btn: Object,
  numOfPages: Number
})

const route = useRoute()
const numOfPages = ref(props.numOfPages)

const filter = ref('')
const rows = ref(10)
const page = ref(1)

const debouncedFn = useDebounceFn (() => {
  emit('searchEvent',filter.value)
}, 300)

function redirectDeleteEventHandler (data) {
  emit('deleteEventHandler', data)
}

function redirectInviteEventHandler (data, cb) {
  emit('inviteEventHandler', data, cb)
}

function redirectCreateEventHandler (data, cb) {
  emit('createEventHandler', data, cb)
}

function loadPage () {
  emit('loadPage', page.value, rows.value)
}

watch(rows, async (newValue) => {
  loadPage()
})

watchEffect(async () => {
  numOfPages.value = props.numOfPages
})

</script>

<template>

<v-container class="elevation-2 mx-10 pt-0 rounded">
    <v-layout class="d-flex flex-wrap">
        <v-col cols="2" class="pt-3">
            <p class="text-h6">{{route.name === 'admins'?  $t('cardsList.header.admin') : $t('cardsList.header.account')}} </p>
        </v-col>
        <v-spacer />
        <v-col cols="5">
            <v-text-field density="compact" label="Search" data-test-id="tableList-searchBar" variant="underlined" append-inner-icon="mdi-magnify" v-model.lazy="filter" color="primary"  @input="debouncedFn"></v-text-field>
        </v-col>

        <v-col cols="2" class="pt-3">
            <Dialog :header="props.btn.header" :btnTitle="route.name === 'admins'? 'Invite Admin' : 'Create Account'" @createEventHandler='redirectCreateEventHandler' @inviteEventHandler='redirectInviteEventHandler' :inputs="props.btn.input" />
        </v-col>
    </v-layout>

    <v-layout class="d-flex flex-wrap">
        <v-table fixed-header class="w-100">
            <thead>
                <tr>
                    <th class="text-left">
                        {{$t('cardsList.tableHeader.nameLabel')}}
                    </th>
                    <th v-if="route.name === 'admins'" class="text-left">
                        {{$t('cardsList.tableHeader.emailLabel')}}
                    </th>
                    <th v-else class="text-left">
                        {{$t('cardsList.tableHeader.urlFriendlyName')}}
                    </th>
                    <th class="text-left">
                        {{$t('cardsList.tableHeader.lastEditedLabel')}}
                    </th>
                    <th class="text-left">
                        {{$t('cardsList.tableHeader.creationDateLabel')}}
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="(item, i) in props.items" :key="item._id">
                    <td :data-test-id="`tableList-${i}-name`" >{{ item.data.name }}</td>
                    <td v-if="route.name === 'admins'">{{ item.data.email }}</td>
                    <td v-else>{{ item.data.urlFriendlyName }}</td>
                    <td>{{ new Date(item.data.createdAt).toLocaleDateString() }}</td>
                    <td>{{ new Date(item.data.updatedAt).toLocaleDateString() }}</td>
                    <td v-if="route.name === 'admins'" :data-test-id="`tableList-${i}-deleteBtn`" class="text-right">
                        <DeleteMyAccount @deleteEventHandler='redirectDeleteEventHandler' :data="item.data" />
                    </td>
                    <td v-else class="text-right">
                        <v-btn color="grey" variant="text" class="ma-2" icon="mdi-arrow-right" size="small" @click="$emit('detailsEventHandler',{id: item._id, urlFriendlyName: item.data.urlFriendlyName})" />
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-layout>
    <v-divider />
    <v-layout class="d-flex flex-wrap justify-center align-center">
        <v-spacer />
        <p class="ma-2">
          {{$t('cardsList.tableFooter.label')}}
        </p>
        <p class="ma-2">
            <v-select hide-details density="compact" variant="underlined" v-model="rows" :items="[5,10,15]" />
        </p>
        <p class="ma-2">{{page}} of {{numOfPages}} </p>
        <v-col cols="3">
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-chevron-left" :disabled="page === 1 " size="small" @click="page = page - 1; loadPage()" />
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-chevron-right" :disabled="page  === numOfPages " size="small" @click="page = page + 1; loadPage()" />
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-page-first" size="small" @click="page =  1; loadPage()" />
            <v-btn color="grey" variant="text" class="ma-2" icon="mdi-page-last" size="small" @click="page = numOfPages; loadPage()" />
        </v-col>
    </v-layout>
</v-container>

</template>
