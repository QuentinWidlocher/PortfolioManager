<template>
    <div id="Project">
        <v-container v-if="readyToDisplay" grid-list-lg>
            <v-layout wrap>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="project.name"
                        label="Project name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="project.description"
                        label="Description"
                    ></v-text-field>
                </v-flex>
                <v-flex justify-end row>
                    <v-btn
                        class="mr-2"
                        outlined
                        :color="'error'"
                        @click="cancel"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        :color="'success'"
                        @click="save"
                    >
                        <v-icon left>mdi-content-save</v-icon>
                        Save
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar
            v-model="snackbar.visible"
            :color="snackbar.color"
        >
        {{ snackbar.text }}
        <v-btn
            dark
            text
            @click="snackbar.visible = false"
        >
            Close
        </v-btn>
        </v-snackbar>
    </div>
</template>
<script lang="ts" src="./Project.ts"></script>
<style lang="scss" scoped src="./Project.scss"></style>
