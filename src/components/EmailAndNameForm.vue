<script setup>
import { ref } from 'vue'

const props = defineProps({
  formData: Object
})

const data = ref('')
</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="8">
        <form>
          <v-col>
            <h1>{{props.formData.text}}</h1>
          </v-col>
            <v-col>
              <v-row class="text-center">
              <v-text-field
                :name="props.formData.inputText"
                :label="props.formData.inputText"
                :type="props.formData.inputType"
                v-model="data"
                required></v-text-field>
              <v-btn  class="mx-10 my-1 py-6" color="primary" @click="$emit('buttonEvent',data)">{{props.formData.text}}</v-btn>
                <button hidden @click.enter.prevent="$emit('buttonEvent',data)" />
            </v-row >
            </v-col>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
