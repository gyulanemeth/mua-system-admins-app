<script setup >
import { ref } from 'vue'

const show = ref({ oldPassword: false, newPassword: false , confirmNewPassword: false })
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
        <h3 class="font-weight-bold">Change Password</h3>
        <v-divider />

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">Old Password</p>
            </v-col>
            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" v-model="data['oldPassword']" :type="show['oldPassword'] ? 'text' : 'password'" name="oldPassword" placeholder="********">
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show['oldPassword'] ? 'mdi-eye' : 'mdi-eye-off'" @click="show['oldPassword'] = !show['oldPassword']" />
        </v-row>

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">New Password</p>
            </v-col>
            <v-text-field hide-details density="compact" v-model="data['newPassword']" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" :type="show['newPassword'] ? 'text' : 'password'" name="newPassword" placeholder="********">
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show['newPassword'] ? 'mdi-eye' : 'mdi-eye-off'" @click="show['newPassword'] = !show['newPassword']" />
        </v-row>
        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">Confirm New Password</p>
            </v-col>
            <v-text-field hide-details v-model="data['confirmNewPassword']" density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" :type="show['confirmNewPassword'] ? 'text' : 'password'" name="confirmNewPassword" placeholder="********">
            </v-text-field>
            <v-btn color="info" variant="text" :icon="show['confirmNewPassword'] ? 'mdi-eye' : 'mdi-eye-off'" @click="show['confirmNewPassword'] = !show['confirmNewPassword']" />

        </v-row>
        <v-btn color="info mt-3" @click="$emit('updatePasswordHandler',data); resetForm()"> Change my Password</v-btn>
    </v-col>
</v-layout>

</template>
