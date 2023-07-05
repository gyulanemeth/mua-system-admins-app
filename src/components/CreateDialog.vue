<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ImgCropper from './ImageCropper.vue'

const { tm } = useI18n()

const props = defineProps({
  name: String,
  header: String,
  inputs: Array,
  btnTitle: String
})

const route = useRoute()
const operation = computed(() => route.name === 'admins' ? tm('createDialog.operation.admins') : tm('createDialog.operation.accounts'))

const dialog = ref(false)
const processing = ref(false)
const data = ref({})
const cb = ref()
const logo = ref(import.meta.env.BASE_URL + 'placeholder.jpg')
const previewUrl = ref(null)
const showCropperDialog = ref(false)
const imageFile = ref(false)

const resetForm = () => {
  Object.keys(data.value).forEach(key => {
    data.value[key] = null
  })
  previewUrl.value = null
}

const handleFileChange = (event) => {
  const reader = new FileReader()
  reader.onload = () => {
    imageFile.value = reader.result
    showCropperDialog.value = true
  }
  reader.readAsDataURL(event.target.files[0])
}

const openFileInput = () => {
  const fileInput = document.querySelector('input[type=file]')
  fileInput.click()
}

const previewImage = (file) => {
  const formData = new FormData()
  formData.append('logo', file)
  data.value.logo = formData
  showCropperDialog.value = false
  const reader = new FileReader()
  reader.onload = () => {
    previewUrl.value = reader.result
  }
  reader.readAsDataURL(file)
}

</script>

<template>
    <v-dialog v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" data-test-id="open-formDialog" color="info" v-bind="props">
                {{ btnTitle }}
            </v-btn>
        </template>
        <v-card min-width="800" class="d-flex flex-column justify-center">
            <v-toolbar color="white" align="center">
                <v-toolbar-title class="font-weight-bold">{{ props.header }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text align="start">
                <v-row align="center" v-for="(input, i) in props.inputs" :key="i">
                    <v-col cols="4">
                        <p class="font-weight-bold">{{ input.label }}</p>
                    </v-col>
                    <v-col cols="8" align='center'>
                        <v-card v-if="input.type === 'file'" class="mx-2 my-5 pa-2" min-width="275">
                            <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" accept=".png, .jpeg, .jpg, .gif">

                            <v-img :src="previewUrl || logo" height="150px" cover></v-img>
                            <v-card-title class="justify-center py-0">
                                <v-btn @click="openFileInput" variant="text" icon="mdi-image-plus"
                                    :data-test-id="`formDialog-field-${i}`" color="grey-lighten-1" type="file"></v-btn>
                            </v-card-title>
                            <p>{{ input.placeholder }}</p>
                        </v-card>
                        <v-text-field v-else hide-details density="compact" :data-test-id="`formDialog-field-${i}`"
                            class=" elevation-2 my-5 pl-3 rounded" color="info" variant="plain"
                            :placeholder="input.placeholder" :name="input.name" v-model="data[input.name]"
                            :type="input.type" required />
                    </v-col>
                </v-row>
                <v-row v-if="cb" data-test-id="formDialog-cb" class="justify-center">
                    <p class="font-weight-bold">{{ $t('createDialog.cb.message') }}</p>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="info" v-if="operation === $t('createDialog.operation.accounts')"
                    data-test-id="formDialog-submitBtn"
                    @click="processing = true; $emit('createEventHandler', data, () => { processing = false; dialog = false }); resetForm()">

                    {{ !processing ? operation : '' }}

                    <v-progress-circular v-if="processing" :size="20" class="pa-3 ma-3"
                        indeterminate></v-progress-circular>{{ processing ? $t('processing') : '' }}

                </v-btn>
                <v-btn color="info" v-else-if="cb" data-test-id="formDialog-resetBtn" @click="cb = null">{{
                    $t('createDialog.cb.resetbtn') }}</v-btn>
                <v-btn color="info" v-else data-test-id="formDialog-inviteAnotherBtn"
                    @click="processing = true; $emit('inviteEventHandler', data, (res) => { if(res){ cb = res} processing = false; resetForm() })">
                    {{ !processing ? operation : '' }}
                    <v-progress-circular v-if="processing" :size="20" class="pa-3 ma-3"
                        indeterminate></v-progress-circular>{{ processing ? $t('processing') : '' }}

                </v-btn>
                <v-btn color="info" data-test-id="formDialog-cancelBtn"
                    @click="dialog = false; cb = undefined; resetForm()">{{ $t('createDialog.cb.closeBtn') }}</v-btn>
            </v-card-actions>
        </v-card>
        <ImgCropper v-if="imageFile" :profilePicture="imageFile" :showCropperDialog="showCropperDialog" @uploadProfilePictureHandler="previewImage" @closeCropperHandler="showCropperDialog = false" />

    </v-dialog>
</template>
