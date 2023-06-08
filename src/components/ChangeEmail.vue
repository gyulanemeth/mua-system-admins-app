<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  email: String
})

const route = useRoute()

const data = ref({
  email: props.email
})
const cb = ref()

const resetForm = () => {
  data.value = {
    email: props.email,
    newEmail: null,
    confirmNewEmail: null
  }
}

</script>

<template>

<v-layout class="d-flex flex-wrap w-75">
    <v-col class="pt-3">
        <h3 class="font-weight-bold"> {{$t('changeEmail.header')}}</h3>
        <v-divider />

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold"> {{$t('changeEmail.currentEmailLabel')}}</p>
            </v-col>

            <v-text-field hide-details density="compact" class=" my-5 pt-2 pl-3 rounded" variant="plain" name="currentEmail" v-model="data.email" disabled>
            </v-text-field>
        </v-row>

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changeEmail.newEmailLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" data-test-id="meDetails-changeEmailTab-newEmail" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="newEmail"
            :placeholder="data.newEmail || $t('changeEmail.newEmailPlaceHolder')"
            :value="data.newEmail"
            @update:modelValue="res => data.newEmail = res.replace(/[^a-z0-9+@ \.,_-]/gim, '')"
            >
            </v-text-field>
        </v-row>
        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changeEmail.confirmEmailLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" data-test-id="meDetails-changeEmailTab-newEmailAgain" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="confirmNewEmail"
            :placeholder="data.confirmNewEmail || $t('changeEmail.confirmEmailPlaceHolder')"
            :value="data.confirmNewEmail"
            @update:modelValue="res => data.confirmNewEmail = res.replace(/[^a-z0-9+@ \.,_-]/gim, '')"
            >
            </v-text-field>

        </v-row>
        <v-btn color="info mt-3" data-test-id="meDetails-changeEmailTab-submitBtn" @click="$emit('updateEmailHandler',data, (res) => {cb = res; resetForm()})"> {{$t('changeEmail.submitBtn')}}</v-btn>
        <div v-if="cb">
            <h2 data-test-id="meDetails-changeEmailTab-emailSentHeader" class="mt-4">{{$t('changeEmail.cb.header')}}</h2>
            <p class="mt-4">{{$t('changeEmail.cb.message')}}</p>
        </div>
        <div v-else-if="route.query.tab === 'changeEmail'">
            <p class="mt-4" data-test-id="meDetails-changeEmailTab-emailChanged" >{{$t('changeEmail.verifyMessage')}}</p>
        </div>
    </v-col>
</v-layout>

</template>
