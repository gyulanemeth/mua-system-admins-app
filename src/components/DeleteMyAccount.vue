<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  data: Object
})

const route = useRoute()

const password = ref()
const dialog = ref()
const cdnBaseUrl = window.config.cdnBaseUrl

const resetForm = () => {
  password.value = null
  dialog.value = false
}

const profilePicture = ref(props.data.profilePicture ? cdnBaseUrl + props.data.profilePicture : import.meta.env.BASE_URL + 'placeholder.jpg')

</script>

<template>

<v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
        <v-btn v-if="route.name === 'me'" data-test-id="open-deleteAccount-dialog" color="error" class="text-white" v-bind="props">{{$t('deleteMyAccount.openBtn')}}</v-btn>
        <v-btn v-else color="grey" variant="text" data-test-id="open-deleteAccount-dialog" class="ma-2" icon="mdi-delete" size="small" v-bind="props" />

    </template>
    <v-card class="d-flex flex-column justify-center">

        <v-card-text align="start">
            <v-col align="center" class="pb-10">
                <v-toolbar-title class="font-weight-bold text-error">{{$t('deleteMyAccount.header')}} “{{props.data.name}}”?</v-toolbar-title>
                <v-toolbar-title class="text-error">{{$t('deleteMyAccount.subheader')}}</v-toolbar-title>
            </v-col>

            <v-row align="center" class="pb-10">
                <h3 class="font-weight-bold">{{$t('deleteMyAccount.overviewTitle')}}</h3>
                <v-divider />
            </v-row>

            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">{{$t('deleteMyAccount.nameLabel')}}</p>
                </v-col>
                <v-text-field hide-details density="compact" color="info" disabled class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain" :placeholder="props.data.name" name="name" :value="props.data.name" type="text" required />
            </v-row>

            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">{{$t('deleteMyAccount.emailLabel')}}</p>
                </v-col>
                <v-text-field hide-details density="compact" color="info" disabled class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain" :placeholder="props.data.email" name="email" :value="props.data.email" type="text" required />
            </v-row>
            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">{{$t('deleteMyAccount.picLabel')}}</p>
                </v-col>
                <v-col align="center">
                    <v-avatar class="elevation-3 " size="180">
                        <v-img :src="profilePicture" class="align-self-stretch" cover/>
                    </v-avatar>
                </v-col>
            </v-row>
            <v-col>
                <v-row align="center" class="py-10">
                    <h3 class="font-weight-bold">{{$t('deleteMyAccount.passwordConfirmationHeader')}}</h3>
                    <v-divider />
                </v-row>

                <v-row align="center">
                    <v-col>
                        <p class="font-weight-bold">{{$t('deleteMyAccount.passwordLabel')}}</p>
                    </v-col>
                    <v-text-field hide-details data-test-id="deleteAccount-passwordField" density="compact" color="info" class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain"
                    name="password" type="password"
                    :placeholder="password || $t('deleteMyAccount.passwordPlaceholder')"
                    :value="password"
                    @update:modelValue="res => password = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
                    required />
                </v-row>
            </v-col>

        </v-card-text>
        <v-card-actions>
            <v-btn color="error" data-test-id="deleteAccount-submitBtn" @click="$emit('deleteEventHandler',{id:props.data._id, password});resetForm()">{{$t('deleteMyAccount.submitBtn')}}</v-btn>
            <v-spacer />
            <v-btn color="info" data-test-id="deleteAccount-cancelBtn" @click="resetForm">{{$t('deleteMyAccount.closeBtn')}}</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</template>
