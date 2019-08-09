<template>
    <div id="Project">
        <v-container v-if="readyToDisplay" grid-list-lg>
            <v-layout wrap class="mt-2">

                <v-flex row xs12 class="mb-2">
                    <v-layout xs12 sm6 lg4 justify-center>
                        <div class="picture" 
                        :style="`
                        background: #${project.gradientStart};
                        background: -moz-linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                        background: -webkit-linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                        background: linear-gradient(${project.gradientAngle}deg, #${project.gradientStart} 0%, #${project.gradientEnd} 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#${project.gradientStart}', endColorstr='#${project.gradientEnd}', GradientType=1);`">
                            
                            <img :src="project.picture" width="200">
                        </div>
                    </v-layout>

                    <v-flex xs12 md6 lg8>
                        <v-file-input 
                            class="file-input"
                            accept="image/*"
                            :loading="fileUploading"
                            :success="fileUploaded"
                            prepend-icon="mdi-image"
                            label="Change picture"
                            @change="onFileChange"></v-file-input>
                    </v-flex>
                </v-flex>

                <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="project.name"
                        label="Project name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="project.description"
                        label="Description"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field
                        v-model="project.link"
                        label="URL link"
                    ></v-text-field>
                </v-flex>

                <v-flex justify-end row>
                    <v-btn
                        class="mr-2"
                        outlined
                        rounded
                        :color="'error'"
                        @click="cancel"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        :color="'success'"
                        rounded
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
