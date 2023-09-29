<script setup >
import { ref } from 'vue'
import useSystemMessagesStore from '../stores/systemMessages.js'

const show = ref({ oldPassword: false, newPassword: false, confirmNewPassword: false })
const data = ref({})
const processing = ref(false)

const resetForm = () => {
  data.value = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null
  }
}

</script>

<template>
    <v-layout class="d-flex flex-wrap w-75">
        <v-col class="pt-3">
            <h3 class="font-weight-bold">{{ $t('changePassword.header') }}</h3>
            <v-divider />

            <v-row align="center" class="mt-3">
                <v-col>
                    <p class="font-weight-bold">{{ $t('changePassword.oldPasswordLabel') }}</p>
                </v-col>
                <v-text-field hide-details density="compact" data-test-id="meDetails-changePasswordTab-oldPassword"
                    class="my-5 rounded" color="info" variant="solo"
                    :type="show.oldPassword ? 'text' : 'password'" name="oldPassword"
                    :placeholder="data.oldPassword || $t('changePassword.oldPasswordPlaceholder')" :value="data.oldPassword"
                    @update:modelValue="res => data.oldPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')">
                </v-text-field>
                <v-btn color="info" variant="text" :icon="show.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click="show.oldPassword = !show.oldPassword" />
            </v-row>

            <v-row align="center" class="mt-3">
                <v-col>
                    <p class="font-weight-bold">{{ $t('changePassword.newPasswordLabel') }}</p>
                </v-col>
                <v-text-field hide-details density="compact" data-test-id="meDetails-changePasswordTab-newPassword"
                    class="my-5 rounded" color="info" variant="solo"
                    :type="show.newPassword ? 'text' : 'password'" name="newPassword"
                    :placeholder="data.newPassword || $t('changePassword.newPasswordPlaceholder')" :value="data.newPassword"
                    @update:modelValue="res => data.newPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')">
                </v-text-field>
                <v-btn color="info" variant="text" :icon="show.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click="show.newPassword = !show.newPassword" />
            </v-row>
            <v-row align="center" class="mt-3">
                <v-col>
                    <p class="font-weight-bold">{{ $t('changePassword.confirmNewPasswordLabel') }}</p>
                </v-col>
                <v-text-field hide-details density="compact" data-test-id="meDetails-changePasswordTab-newPasswordAgain"
                    class=" my-5 rounded" color="info" variant="solo"
                    :type="show.confirmNewPassword ? 'text' : 'password'" name="confirmNewPassword"
                    :placeholder="data.confirmNewPassword || $t('changePassword.confirmNewPasswordPlaceholder')"
                    :value="data.confirmNewPassword"
                    @update:modelValue="res => data.confirmNewPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')">
                </v-text-field>
                <v-btn color="info" variant="text" :icon="show.confirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click="show.confirmNewPassword = !show.confirmNewPassword" />

            </v-row>
            <v-btn color="info mt-3" data-test-id="meDetails-changePasswordTab-submitBtn"
                @click="processing = true; $emit('updatePasswordHandler', data, (res) => { res && useSystemMessagesStore().addSuccess({message: $t('changePassword.successAlert')}); resetForm(); processing = false })">

                {{ !processing ? $t('changePassword.submitBtn') : '' }}

                <v-progress-circular v-if="processing" :size="20" indeterminate></v-progress-circular>{{
                    processing ? $t('processing') : '' }}

            </v-btn>
        </v-col>
    </v-layout>
</template>
