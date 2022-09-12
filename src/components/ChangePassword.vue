<script setup >
import { ref } from 'vue'

const show = ref({ oldPassword: false, newPassword: false, confirmNewPassword: false })
const data = ref({})
const resetForm = () => {
  data.value = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null
  }
}

</script>

<template>

<v-layout class="d-flex flex-wrap">
    <v-col class="pt-3">
        <h3 class="font-weight-bold">{{$t('changePassword.header')}}</h3>
        <v-divider />

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changePassword.oldPasswordLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain"
            :type="show.oldPassword ? 'text' : 'password'" name="oldPassword"
            :placeholder="data.oldPassword || $t('changePassword.oldPasswordPlaceholder')"
            :value="data.oldPassword"
            @update:modelValue="res => data.oldPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            >
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show.oldPassword ? 'mdi-eye' : 'mdi-eye-off'" @click="show.oldPassword = !show.oldPassword" />
        </v-row>

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changePassword.newPasswordLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" :type="show.newPassword ? 'text' : 'password'" name="newPassword"
            :placeholder="data.newPassword ||$t('changePassword.newPasswordPlaceholder')"
            :value="data.newPassword"
            @update:modelValue="res => data.newPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            >
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show.newPassword ? 'mdi-eye' : 'mdi-eye-off'" @click="show.newPassword = !show.newPassword" />
        </v-row>
        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('changePassword.confirmNewPasswordLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" :type="show.confirmNewPassword ? 'text' : 'password'" name="confirmNewPassword"
            :placeholder="data.confirmNewPassword ||$t('changePassword.confirmNewPasswordPlaceholder')"
            :value="data.confirmNewPassword"
            @update:modelValue="res => data.confirmNewPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            >
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show.confirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'" @click="show.confirmNewPassword = !show.confirmNewPassword" />

        </v-row>
        <v-btn color="info mt-3" @click="$emit('updatePasswordHandler',data); resetForm()"> {{$t('changePassword.submitBtn')}}</v-btn>
    </v-col>
</v-layout>

</template>
