<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import Settings from './AdminSettings.vue'
import ChangeEmail from './ChangeEmail.vue'
import ChangePassword from './ChangePassword.vue'
import MyDetails from './MyDetails.vue'

const emit = defineEmits(['updateNameHandler', 'updateEmailHandler', 'updatePasswordHandler', 'deleteMyAccountHandler'])
const props = defineProps({
  data: Object
})

const changeTab = (tabId) => {
  tab.value = tabId
}

async function redirectUpdateNameHandler (data) {
  emit('updateNameHandler', data)
}
async function redirectUpdateEmailHandler (data, cb) {
  emit('updateEmailHandler', data, cb)
}
async function redirectUpdatePasswordHandler (data) {
  emit('updatePasswordHandler', data)
}
async function redirectDeleteHandler (data) {
  emit('deleteMyAccountHandler', data)
}

const route = useRoute()
const tab = ref(route.query.tab)

</script>

<template>

<v-container class="elevation-0 mx-6 pa-0  rounded">
    <v-layout class="d-flex flex-wrap align-end justify-end">

        <p class="text-h4 ">{{props.data.name}}
          <span class="text-subtitle-1 font-weight-bold ">Administrator</span>
        </p>

        <v-spacer />
    </v-layout>

    <v-layout class="d-flex flex-wrap">
        <v-card class="w-100">
            <v-tabs v-model="tab">
                <v-tab value="me" color="info" prepend-icon="mdi-account">MY details</v-tab>
                <v-tab value="changePassword" color="info" prepend-icon="mdi-lock">Change password</v-tab>
                <v-tab value="changeEmail" color="info" prepend-icon="mdi-at">Change e-mail</v-tab>
                <v-tab value="settings" color="info" prepend-icon="mdi-cog">Settings</v-tab>

            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">

                    <v-window-item value="me">
                        <MyDetails @updateNameHandler="redirectUpdateNameHandler" @changeTab="changeTab" :email="props.data.email" :name="props.data.name" />
                    </v-window-item>

                    <v-window-item value="changePassword">
                        <ChangePassword @updatePasswordHandler="redirectUpdatePasswordHandler" />
                    </v-window-item>

                    <v-window-item value="changeEmail">
                        <ChangeEmail @updateEmailHandler="redirectUpdateEmailHandler" :email="props.data.email" />
                    </v-window-item>

                    <v-window-item value="settings">
                        <Settings @deleteEventHandler="redirectDeleteHandler" :data="props.data" />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>

    </v-layout>
</v-container>

</template>
