<script setup >
import DeleteMyAccount from './DeleteMyAccount.vue'

const emit = defineEmits(['deleteEventHandler'])

const props = defineProps({
  data: Object
})

function redirectDeleteHandler (data) {
  emit('deleteEventHandler', data)
}

</script>

<template >

<v-layout class="d-flex flex-wrap">
    <v-col class="pt-3">
        <h3 class="font-weight-bold"> {{ $t('adminSettings.header') }}</h3>
        <v-divider />

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold"> {{ $t('adminSettings.picLabel') }} </p>
            </v-col>

            <v-card class="mx-2 my-5 pa-2 align-center w-50">
                <v-img src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg" height="150px" cover></v-img>
                <v-card-title class="justify-center py-0">
                    <v-btn variant="text" icon="mdi-image-plus" color="grey-lighten-1" type="file"></v-btn>
                </v-card-title>
                <v-row class="justify-center py-3 ">
                    <p>{{ $t('adminSettings.picBtn') }} </p>
                </v-row>
            </v-card>
        </v-row>
        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{ $t('adminSettings.inputLabel') }}</p>
            </v-col>
            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="example" :placeholder="$t('adminSettings.inputPlaceholder')">
            </v-text-field>
        </v-row>

        <v-btn color="info mt-3">{{ $t('adminSettings.btnLabel') }}</v-btn>

        <v-col class="pt-15">
            <h3 class="font-weight-bold text-error">{{ $t('adminSettings.deleteLabel') }}</h3>
            <v-divider color="error" />

            <DeleteMyAccount @deleteEventHandler="redirectDeleteHandler" :data="props.data" />
        </v-col>
    </v-col>

</v-layout>

</template>
