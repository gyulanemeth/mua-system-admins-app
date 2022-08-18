<script setup >
import DeleteMyAccount from './DeleteMyAccount.vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['buttonEvent'])

function submitForm (data) {
  emit('submit', data)
}

</script>

<template >
  <v-layout class="d-flex flex-wrap">
    <v-col class="pt-3">
    <h3 class="font-weight-bold">Account Settings</h3>
    <v-divider />

      <v-row align="center" class="mt-3">
          <v-col>
              <p class="font-weight-bold">New Profile Picture</p>
          </v-col>

          <v-card class="mx-2 my-5 pa-2 align-center w-50" >
            <v-img
            src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg"
            height="150px"
            cover
            ></v-img>
            <v-card-title class="justify-center py-0">
              <v-btn
              variant="text"
              icon="mdi-image-plus"
              color="grey-lighten-1"
              type="file"
              ></v-btn>
            </v-card-title>
            <v-row class="justify-center py-3 ">
            <p>Upload</p>
          </v-row>
        </v-card>
      </v-row>
      <v-row align="center" class="mt-3">
          <v-col>
              <p class="font-weight-bold">Real user settings will be here</p>
          </v-col>
          <v-text-field
          hide-details
          density="compact"
          class="inputShadow my-5 pt-2 pl-3 rounded"
          color="info"
          variant="plain"
         name="example"
         placeholder="Real user settings will be here"
           >
         </v-text-field>
      </v-row>

      <v-btn color="info mt-3">Update Settings</v-btn>

      <v-col class="pt-15">
      <h3 class="font-weight-bold text-red-accent-4" >Delete Account</h3>
      <v-divider class="redColor" />

        <DeleteMyAccount @submit="submitForm" :data="props.data" />
      </v-col >
    </v-col >

</v-layout>
</template>

<style scoped>

.inputShadow {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
}

.redColor{
  background-color:#D50000;
}

</style>
