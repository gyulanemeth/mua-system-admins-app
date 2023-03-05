<script setup >
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import jwtDecode from 'jwt-decode'

const props = defineProps({
  formData: Object
})

const route = useRoute()
const operation = computed(() => route.name === 'accept-invitation' ? 'setPassword' : 'resetPassword')

const email = ref()
const data = ref({})
const cb = ref()

const title = window.config.title
const appIcon = window.config.appIcon

email.value = jwtDecode(route.query.token).user.email

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
            <h4 class="text-h4"> {{title}} </h4>
        </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
        <v-card-text align="center" v-if="!cb">
            <h6 class="text-h6">{{props.formData.text}}</h6>

            <v-text-field v-if="operation === 'setPassword' " hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="email" type="text" :value="email" :placeholder="email" disabled required />

            <v-text-field v-if="operation === 'setPassword' " data-test-id="setAndRestPassword-nameField" hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain"
            name="name" :label="$t('setAndReSetPassword.nameLabel')" type="text"
            :placeholder="data.name ||$t('setAndReSetPassword.namePlaceHolder')"
            :value="data.name"
            @update:modelValue="res => data.name = res.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')"
            required />

            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain"
            name="newPassword" data-test-id="setAndRestPassword-newPasswordField" :label="$t('setAndReSetPassword.newPasswordLabel')" type="password"
            :placeholder="data.newPassword ||$t('setAndReSetPassword.newPasswordPlaceholder')"
            :value="data.newPassword"
            @update:modelValue="res => data.newPassword = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            required />

            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain"
            name="newPasswordAgain" data-test-id="setAndRestPassword-newPasswordAgainField" :label="$t('setAndReSetPassword.confirmNewPasswordLabel')" type="password"
            :placeholder="data.newPasswordAgain ||$t('setAndReSetPassword.confirmNewPasswordPlaceholder')"
            :value="data.newPasswordAgain"
            @update:modelValue="res => data.newPasswordAgain = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            required/>

            <v-checkbox :label="$t('setAndReSetPassword.checkboxLabel')" color="info" value="I am human" hide-details></v-checkbox>

            <v-col v-if="operation === 'resetPassword'">
                <v-btn color="info" data-test-id="setAndRestPassword-submitBtn"  @click="$emit('resetPasswordEventHandler',{token:route.query.token,...data},(res)=>{cb = res})">{{props.formData.text}}</v-btn>
                <button hidden @click.enter.prevent="$emit('resetPasswordEventHandler',{token:route.query.token,...data},(res)=>{cb = res})" />
            </v-col>
            <v-col v-if="operation === 'setPassword'">
                <v-btn color="info" data-test-id="setAndRestPassword-submitBtn" @click="$emit('setPasswordEventHandler',{token:route.query.token,...data})">{{props.formData.text}}</v-btn>
                <button hidden @click.enter.prevent="$emit('setPasswordEventHandler',{token:route.query.token,...data})" />
            </v-col>
        </v-card-text>
        <v-card-text align="center" v-if="cb">

            <h2 class="mt-4">{{$t('setAndReSetPassword.cb.header')}}</h2>
            <p class="mt-4">{{$t('setAndReSetPassword.cb.message')}}
                <router-link tag="span" data-test-id="setAndRestPassword-continueBtn" style="text-decoration: none; color: inherit;" to="/me" class="font-weight-bold">{{$t('setAndReSetPassword.cb.cbBtn')}}</router-link> {{$t('setAndReSetPassword.cb.subMessage')}}</p>

        </v-card-text>

    </v-card>
</v-form>

</template>
