<script setup >
import { ref } from 'vue'

const props = defineProps({
  name: String,
  email: String
})

const name = ref(props.name)
const email = ref(props.email)

const editMode = ref()

</script>

<template>

<v-layout class="d-flex flex-wrap">
    <v-col cols="8" class="pt-3">
        <h3 class="font-weight-bold">{{$t('myDetails.header')}}</h3>
        <v-divider />

        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('myDetails.nameLabel')}}</p>
            </v-col>

            <v-text-field
            hide-details density="compact" :disabled='!editMode' data-test-id="meDetails-meTab-nameField" color="info" variant="underlined" name="name"
            :placeholder="name || $t('myDetails.namePlaceHolder')"
            :value="name"
            @update:modelValue="res => name = res.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')"
            type="text" required />
            <template v-if='editMode'>
                <v-btn color="info" variant="text" icon="mdi-check" size="small" data-test-id="meDetails-meTab-confirmNameEditBtn" @click.stop="$emit('updateNameHandler', name);editMode = false" />
                <v-btn class="ml-2" color="error" variant="text" icon="mdi-window-close" size="small" data-test-id="meDetails-meTab-cancelNameEditBtn" @click='editMode = false' />
            </template>
            <template v-else>
                <v-btn color="info" variant="text" class="ma-2" icon="mdi-pencil-outline" size="small" data-test-id="meDetails-meTab-editNameBtn" @click='editMode = true' />
            </template>

        </v-row>
        <v-row align="center" class="mt-3">
            <v-col>
                <p class="font-weight-bold">{{$t('myDetails.emailLabel')}}</p>
            </v-col>
            <v-text-field hide-details density="compact" disabled color="info" variant="underlined" :placeholder="$t('myDetails.emailPlaceHolder')" name="E-mail" v-model="email" type="text" required />
            <v-btn color="info" variant="text" icon="mdi-arrow-right" class="ma-2" size="small" @click.stop="$emit('changeTab', 'changeEmail')" />

        </v-row>

    </v-col>

    <v-col cols="4" class="pt-3">
        <h3 class="font-weight-bold">{{$t('myDetails.picLabel')}}</h3>
        <v-divider/>
        <v-col align="center" class="mt-3">
            <v-hover v-slot="{ isHovering, props }">
                <v-avatar v-bind="props" class="elevation-3 " size="180">
                    <v-img src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg" class="align-self-stretch" cover />

                    <v-expand-transition>

                        <v-container v-if="isHovering" class="d-flex justify-center align-end w-100 h-100 v-card--reveal">
                            <v-btn v-if="false" color="white" class="align-center" variant="text" icon="mdi-delete-forever-outline" size="small" />
                            <v-btn v-else color="white" variant="text" class="align-center" icon="mdi-camera-plus-outline" size="small" />
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
