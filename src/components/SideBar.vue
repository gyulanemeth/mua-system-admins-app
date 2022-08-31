
<template>

<v-card class="elevation-4">

    <v-navigation-drawer color="grey-lighten-2" rail rail-width="60" permanent>
        <v-list bg-color="grey-lighten-2" density="compact" nav>
            <v-list-item class="justify-center align-center" active active-class=" elevation-4 text-white bg-white">
                <v-list-item-icon class="text-black">
                    mdi-shield-account-variant-outline
                </v-list-item-icon>
            </v-list-item>

            <v-list-item class="justify-center align-center" active-class=" elevation-4 text-white bg-white">
                <v-list-item-icon class="text-black">
                    mdi-account-group-outline
                </v-list-item-icon>
            </v-list-item>

            <v-list-item class="justify-center align-center" active-class=" elevation-4 text-white bg-white">
                <v-list-item-icon class="text-black">
                    mdi-email-variant
                </v-list-item-icon>
            </v-list-item>

        </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer class="elevation-2" permanent>
        <v-list>
            <v-list-item active-class="text-info" class="pb-3" title="My Profile" to="/me" />
            <v-list-item active-class="text-info" class="pb-3" title="Manage Admins" to="/admins" />
            <v-list-item active-class="text-info" class="pb-3" title="Manage Accounts" to="/accounts" />
        </v-list>
    </v-navigation-drawer>

</v-card>

</template>
