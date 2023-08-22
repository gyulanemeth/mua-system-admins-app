<script setup >
import { ref, computed } from 'vue'
import Cropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

const componentProps = defineProps(['profilePicture', 'showCropperDialog'])

const cropperRef = ref(null)

const emit = defineEmits(['uploadProfilePictureHandler', 'closeCropperHandler'])

const showCropperDialog = computed(() => {
  return componentProps.showCropperDialog
})

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

const cropImage = () => {
  const cropper = cropperRef.value.cropper
  const croppedImage = cropper.getCroppedCanvas().toDataURL()
  const profilePicture = base64ToFile(croppedImage)
  emit('uploadProfilePictureHandler', profilePicture)
}

const cancelCrop = () => {
  emit('closeCropperHandler')
}

</script>

<template>
        <v-dialog persistent v-model="showCropperDialog" max-width="800">
          <v-card>
            <v-card-title class="ma-auto">{{$t('imageCropper.header')}}</v-card-title>
            <v-card-text>
              <Cropper ref="cropperRef" :src="componentProps.profilePicture" :autoCrop="true" :viewMode="1" :aspectRatio="1" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="cropImage">{{$t('imageCropper.cropBtn')}}</v-btn>
              <v-btn @click="cancelCrop">{{$t('imageCropper.cancelBtn')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>
<style>
.cropper-crop-box {
  border-radius: 50%;
  overflow: hidden;
}
</style>