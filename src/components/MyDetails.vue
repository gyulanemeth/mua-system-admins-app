<script setup >
import { ref } from 'vue'

const componentProps = defineProps({
  name: String,
  email: String,
  avatar: String
})

const name = ref(componentProps.name)
const email = ref(componentProps.email)
const avatar = ref(componentProps.avatar || 'https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg')
const processing = ref(false)

const emit = defineEmits(['uploadAvatarHandler', 'deleteAvatarHandler'])

const editMode = ref()

const handleDeleteAvatar = () => {
  processing.value = true
  emit('deleteAvatarHandler', (res) => {
    if (res) {
      avatar.value = 'https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg'
    }
    processing.value = false
  })
}

const handleFileChange = (event) => {
  processing.value = true
  const formData = new FormData()
  formData.append('avatar', event.target.files[0])
  emit('uploadAvatarHandler', formData, (url) => {
    if (url) {
      avatar.value = url
    }
    processing.value = false
  })
}

const openFileInput = () => {
  const fileInput = document.querySelector('input[type=file]')
  fileInput.click()
}

</script>

<template>
    <v-layout class="d-flex flex-wrap w-75">
        <v-col cols="8" class="pt-3">
            <h3 class="font-weight-bold">{{ $t('myDetails.header') }}</h3>
            <v-divider />

            <v-row align="center" class="mt-3">
                <v-col>
                    <p class="font-weight-bold">{{ $t('myDetails.nameLabel') }}</p>
                </v-col>

                <v-text-field hide-details density="compact" :disabled='!editMode' data-test-id="meDetails-meTab-nameField"
                    color="info" variant="underlined" name="name" :placeholder="name || $t('myDetails.namePlaceHolder')"
                    :value="name" @keydown.enter="$emit('updateNameHandler', name); editMode = false"
                    @keydown.esc="editMode = false; name = componentProps.name"
                    @update:modelValue="res => name = res.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')" type="text" required />
                <template v-if='editMode'>
                    <v-btn color="info" variant="text" icon="mdi-check" size="small"
                        data-test-id="meDetails-meTab-confirmNameEditBtn"
                        @click.stop="$emit('updateNameHandler', name); editMode = false" />
                    <v-btn class="ml-2" color="error" variant="text" icon="mdi-window-close" size="small"
                        data-test-id="meDetails-meTab-cancelNameEditBtn"
                        @click='editMode = false; name = componentProps.name' />
                </template>
                <template v-else>
                    <v-btn color="info" variant="text" class="ma-2" icon="mdi-pencil-outline" size="small"
                        data-test-id="meDetails-meTab-editNameBtn" @click='editMode = true' />
                </template>

            </v-row>
            <v-row align="center" class="mt-3">
                <v-col>
                    <p class="font-weight-bold">{{ $t('myDetails.emailLabel') }}</p>
                </v-col>
                <v-text-field hide-details density="compact" disabled color="info" variant="underlined"
                    :placeholder="$t('myDetails.emailPlaceHolder')" name="E-mail" v-model="email" type="text" required />
                <v-btn color="info" variant="text" icon="mdi-arrow-right" class="ma-2" size="small"
                    @click.stop="$emit('changeTab', 'changeEmail')" />

            </v-row>

        </v-col>

        <v-col cols="4" class="pt-3">
            <h3 class="font-weight-bold">{{ $t('myDetails.picLabel') }}</h3>
            <v-divider />
            <v-col align="center" class="mt-3">
                <v-hover v-slot="{ isHovering, props }">
                    <v-progress-circular v-if="processing" :size="180" class="pa-3 ma-3" indeterminate>{{ $t('processing')
                    }}</v-progress-circular>
                    <v-avatar v-else v-bind="props" class="elevation-3 " size="180">
                        <v-img :src="avatar" class="align-self-stretch" cover />

                        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">

                        <v-expand-transition>
                            <v-container v-if="isHovering"
                                class="d-flex justify-center align-end w-100 h-100 v-card--reveal">
                                <v-btn v-if="componentProps.avatar" @click="handleDeleteAvatar" color="white"
                                    class="align-center" variant="text" icon="mdi-delete-forever-outline" size="small" />
                                <v-btn v-else color="white" @click="openFileInput" variant="text" class="align-center"
                                    icon="mdi-camera-plus-outline" size="small" />
                            </v-container>

                        </v-expand-transition>

                    </v-avatar>
                </v-hover>
            </v-col>
        </v-col>
    </v-layout>
</template>

<style scoped>
.v-card--reveal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    transition: ease;
    opacity: .9;
}
</style>
