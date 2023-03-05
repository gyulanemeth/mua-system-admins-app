<script setup>
import { ref } from 'vue'

const cb = ref()
const data = ref('')
const title = window.config.title
const appIcon = window.config.appIcon

</script>

<template>

<v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
        <v-card-text align="center">
          <v-avatar size="80" >
            <v-img :src="appIcon" cover></v-img>
          </v-avatar>
        </v-card-text>
        <v-card-title class="justify-center py-0">
            <h4 class="text-h4">  {{title}} </h4>
        </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
        <v-card-text align="center">
            <h6 class="text-h6">{{$t('forgotPasswordForm.header')}}</h6>

            <v-text-field hide-details data-test-id="forgotPassword-emailField" density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="email" :label="$t('forgotPasswordForm.emailLabel')" type="email" :disabled="cb"
            :placeholder="data ||$t('forgotPasswordForm.emailPlaceHolder')"
            :value="data"
            @update:modelValue="res => data = res.replace(/[^a-z0-9@ \.,_-]/gim, '')"
             required />
            <v-checkbox v-if="!cb" :label="$t('forgotPasswordForm.checkboxLabel')" color="info" value="I am human" hide-details></v-checkbox>
            <div v-if="!cb">
                <v-btn data-test-id="forgotPassword-submitBtn" color="info" @click="$emit('passwordRecoveryEventHandler',data, (res)=>{cb=res})">{{$t('forgotPasswordForm.submitBtn')}}</v-btn>
                <button hidden @click.enter.prevent="$emit('passwordRecoveryEventHandler',data, (res)=>{cb=res})" />
            </div>
            <div v-if="cb">

                <p class="mt-4">{{$t('forgotPasswordForm.cb.header')}}</p>
                <v-btn color="white" data-test-id="forgotPassword-continueBtn" class="mt-4" to="/">{{$t('forgotPasswordForm.cb.cbBtn')}}</v-btn>
            </div>
        </v-card-text>

    </v-card>
</v-form>

</template>
