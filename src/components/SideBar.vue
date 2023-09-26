<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>

<v-card class="elevation-4">

    <v-navigation-drawer color="grey-lighten-2" class="rounded-te-lg" rail rail-width="65" permanent>
        <v-list bg-color="grey-lighten-2" class="h-100 d-flex flex-column rounded-te-lg align-center" density="compact" nav>
            <v-list-item class="justify-center align-center" width="36" height="36" active active-class=" elevation-4 active-item text-white bg-white">
                <v-icon class="text-black" size="20">
                    mdi-shield-account-variant-outline
                </v-icon>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer class="elevation-2" permanent>
        <v-list>
            <v-list-item active-class="text-info" :active="route.meta.header === 'myProfile'" data-test-id="sideBar-meTab" class="pb-3" :title="$t('sideBar.me')" to="/me" />
            <v-list-item active-class="text-info" data-test-id="sideBar-adminsTab" class="pb-3" :title="$t('sideBar.admins')" to="/admins" />
            <v-list-item active-class="text-info" data-test-id="sideBar-accountsTab" class="pb-3" :title="$t('sideBar.accounts')" to="/accounts" />
        </v-list>
    </v-navigation-drawer>

</v-card>

</template>
<style>
.active-item {
  filter: drop-shadow(0px 2px 2px #999898)
}
</style>
