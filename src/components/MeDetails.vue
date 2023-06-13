<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import Settings from './AdminSettings.vue'
import ChangeEmail from './ChangeEmail.vue'
import ChangePassword from './ChangePassword.vue'
import MyDetails from './MyDetails.vue'
import { useCurrentUserStore } from '../stores/index.js'

const emit = defineEmits(['updateNameHandler', 'deleteAvatarHandler', 'uploadAvatarHandler', 'updateEmailHandler', 'updatePasswordHandler', 'deleteEventHandler'])
const props = defineProps({
  data: Object
})

const store = useCurrentUserStore()
const changeTab = (tabId) => {
  tab.value = tabId
}

async function redirectDeleteAvatarHandler (cb) {
  emit('deleteAvatarHandler', cb)
}
async function redirectUploadAvatarHandler (data, cb) {
  emit('uploadAvatarHandler', data, cb)
}
async function redirectUpdateNameHandler (data) {
  emit('updateNameHandler', data)
}
async function redirectUpdateEmailHandler (data, cb) {
  emit('updateEmailHandler', data, cb)
}
async function redirectUpdatePasswordHandler (data, cb) {
  emit('updatePasswordHandler', data, cb)
}
async function redirectDeleteHandler (data) {
  emit('deleteEventHandler', data)
}

const route = useRoute()
const tab = ref('me')

if (route.query.logout) {
  store.logout()
}

</script>

<template>

<v-container class="elevation-0 mx-10 pa-0  rounded">
    <v-layout class="d-flex flex-wrap align-end justify-end">

        <p class="text-h4" data-test-id="meDetails-userName">{{props.data.name}}
          <span class="text-subtitle-1 font-weight-bold ">Administrator</span>
        </p>

        <v-spacer />
    </v-layout>

    <v-layout class="d-flex flex-wrap">
        <v-card class="w-100">
            <v-tabs v-model="tab">
                <v-tab value="me" color="info" data-test-id="meDetails-meTab" prepend-icon="mdi-account">{{$t('meDetails.tabs.meLabel')}}</v-tab>
                <v-tab value="changePassword" data-test-id="meDetails-changePasswordTab" color="info" prepend-icon="mdi-lock">{{$t('meDetails.tabs.changePasswordLabel')}}</v-tab>
                <v-tab value="changeEmail" data-test-id="meDetails-changeEmailTab" color="info" prepend-icon="mdi-at">{{$t('meDetails.tabs.changeEmailLabel')}}</v-tab>
                <v-tab value="settings" data-test-id="meDetails-settingsTab" color="info" prepend-icon="mdi-cog">{{$t('meDetails.tabs.settingsLabel')}}</v-tab>

            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">

                    <v-window-item value="me">
                        <MyDetails @updateNameHandler="redirectUpdateNameHandler" @deleteAvatarHandler="redirectDeleteAvatarHandler" @uploadAvatarHandler="redirectUploadAvatarHandler" @changeTab="changeTab" :email="props.data.email" :name="props.data.name" :avatar="props.data.avatar" />
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
