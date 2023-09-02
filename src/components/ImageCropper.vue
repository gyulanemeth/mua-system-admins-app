<script setup >
import { ref, watch } from 'vue'
import ImageCropUpload from 'vue-image-crop-upload'

const emit = defineEmits(['uploadProfilePictureHandler', 'closeCropperHandler'])

const show = ref(true)
function base64ToFile (base64String, fileName) {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileName, { type: mime })
}

const cropImage = (imgDataUrl) => {
  const profilePicture = base64ToFile(imgDataUrl)
  emit('uploadProfilePictureHandler', profilePicture)
}

watch(show, () => {
  emit('closeCropperHandler')
})

</script>

<template>
    <ImageCropUpload v-model="show" @crop-success="cropImage" :noSquare="true" :width="300" :height="300" :resize="true"
        langType="en" :auto-crop="true" :crop-options="{ aspectRatio: 1 }" />
</template>
