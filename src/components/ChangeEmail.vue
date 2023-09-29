<script setup >
import { ref } from 'vue'
import useSystemMessagesStore from '../stores/systemMessages.js'

const props = defineProps({
  email: String
})

const processing = ref(false)
const data = ref({
  email: props.email
})

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

            <v-text-field hide-details density="compact" class="my-5 rounded" variant="solo" name="currentEmail" v-model="data.email" disabled>
            </v-text-field>
        </v-row>

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changeEmail.newEmailLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" data-test-id="meDetails-changeEmailTab-newEmail" class="my-5 rounded" color="info" variant="solo" name="newEmail"
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
            <v-text-field hide-details density="compact" data-test-id="meDetails-changeEmailTab-newEmailAgain" class="my-5 rounded" color="info" variant="solo" name="confirmNewEmail"
            :placeholder="data.confirmNewEmail || $t('changeEmail.confirmEmailPlaceHolder')"
            :value="data.confirmNewEmail"
            @update:modelValue="res => data.confirmNewEmail = res.replace(/[^a-z0-9+@ \.,_-]/gim, '')"
            >
            </v-text-field>

        </v-row>
        <v-btn color="info mt-3" data-test-id="meDetails-changeEmailTab-submitBtn" @click="processing = true; $emit('updateEmailHandler',data, (res) => {res &&  useSystemMessagesStore().addSuccess({name: $t('changeEmail.cb.message'), message: $t('changeEmail.cb.header') }); resetForm(); processing= false})">
             {{!processing? $t('changeEmail.submitBtn'):''}}

                   <v-progress-circular v-if="processing" :size="20" class="pa-3 ma-3"
       indeterminate
     ></v-progress-circular>{{processing? $t('processing'):''}}

            </v-btn>
    </v-col>
</v-layout>

</template>
