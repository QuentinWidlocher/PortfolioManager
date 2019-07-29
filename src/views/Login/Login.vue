<template>
    <div id="Login">
        <form>
            <h1>Please login to continue</h1>

            <v-text-field
                v-model="username"
                label="Username"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                autocomplete="current-password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
                rounded
                color="primary"
            >
                <v-icon left>mdi-account-arrow-right</v-icon> Login
            </v-btn>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped src="./Login.scss"></style>